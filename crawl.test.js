const { normalizeURL, sum } = require('./crawl')
const { test, expect } = require('@jest/globals')

test('normalizeURL', function() {
    expect(normalizeURL('https://google.com/')).toEqual('google.com')
})

test('normalizeURL remove slash at the end', function() {
    //const input = ''
    //const actual = normalizeURL(input)
    //const expected = ''
    //expect(actual).toEqual(expected)
    expect(normalizeURL('https://google.com/')).toEqual('google.com')
})
    
test('normalizeURL check capital letters', function() {
    expect(normalizeURL('https://Google.com/')).toEqual('google.com')
})

test('normalizeURL strip https', function() {
    expect(normalizeURL('https://google.com/')).toEqual('google.com')
})


