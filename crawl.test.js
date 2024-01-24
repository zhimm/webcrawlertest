const { normalizeURL, getUrlFromHTML } = require('./crawl')
const { test, expect } = require('@jest/globals')

test('normalizeURL', function() {
    expect(normalizeURL('https://google.com/')).toEqual('google.com')
})

test('normalizeURL remove slash at the end', function() {
    expect(normalizeURL('https://google.com/')).toEqual('google.com')
})
    
test('normalizeURL check capital letters', function() {
    expect(normalizeURL('https://Google.com/')).toEqual('google.com')
})

test('normalizeURL strip https', function() {
    expect(normalizeURL('https://google.com/')).toEqual('google.com')
})

test('getUrlfromHTML', function () {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://google.com">
                Google.com
            </a>
        </body>
    </html>
`
    const inputBaseURL = "https://google.com"

    const actual = getUrlFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://google.com/"]
    expect(actual).toEqual(expected)
})

test('getUrlfromHTML invalid', function () {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Invalid URL
            </a>
        </body>
    </html>
`
    const inputBaseURL = "https://google.com"

    const actual = getUrlFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})