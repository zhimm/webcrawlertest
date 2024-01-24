const { crawlPage } = require('./crawl.js')

async function main() {
    if (process.argv.length < 3) {
        console.log('no url provided')
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log('no url provided')
        process.exit(1)
    }
    const baseUrl = process.argv[2]
    const pages = await crawlPage(baseUrl,baseUrl, {})
    for(const page of Object.entries(pages)) {
        console.log(page)
    }
}
main()