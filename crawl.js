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
}

console.log(normalizeURL('https://google.com/'))