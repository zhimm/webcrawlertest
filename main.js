const { crawlPage } = require('./crawl.js')

function main() {
    if (process.argv.length < 3) {
        console.log('no url provided')
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log('no url provided')
        process.exit(1)
    }
    const baseUrl = process.argv[2]
    crawlPage(baseUrl)
}
main()