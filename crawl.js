const { JSDOM } = require('jsdom')


function getUrlFromHTML(htmlBody, baseUrl) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (let link of linkElements) {
        if (link.href.slice(0, 1) === '/') {
            //relative
            urls.push(`${baseUrl}${link.href}`)
        } else {
            urls.push(link.href)
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
