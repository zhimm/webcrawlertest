const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalizeCurrentUrl = normalizeURL(currentURL)
    if (pages[normalizeCurrentUrl] > 0) {
        pages[normalizeCurrentUrl]++
        return pages
    }

    pages[normalizeCurrentUrl] = 1
    console.log(`crawling ${currentURL}`)

    try {
        const response = await fetch(currentURL)

        if (response.status > 399) {
            console.log(`error in fetch with status code ${response.status}`)
            return pages
        }

        const contentType = response.headers.get('content-type')
        if (!contentType.includes("text/html")) {
            console.log(`non content type ${contentType}`)
            return pages
        }

        const htmlBody = await response.text()
        const nextUrls = getUrlFromHTML(htmlBody, baseURL)

        for (const nextUrl of nextUrls) {
            pages = await crawlPage(baseURL, nextUrl, pages)
        }

    } catch (error) {
        console.log(`error in fetching ${error.message}`)
    }
    return pages
}

function getUrlFromHTML(htmlBody, baseUrl) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (let link of linkElements) {
        if (link.href.slice(0, 1) === '/') {
            try {
                const urlObj = new URL(`${baseUrl}${link.href}`)
                urls.push(urlObj.href)

            } catch (error) {
                console.log(error.message)
            }
        } else {
            try {
                const urlObj = new URL(link.href)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(error.message)
            }
        }
    }
    return urls
}

function normalizeURL(url) {
    const sadge = new URL(url)
    const hostPath = `${sadge.hostname}${sadge.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}


module.exports = {
    normalizeURL,
    getUrlFromHTML,
    crawlPage,
}
