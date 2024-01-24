const { JSDOM } = require('jsdom')


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


module.exports= {
    normalizeURL,
    getUrlFromHTML,
}
