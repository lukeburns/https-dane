const { test } = require('brittle')
const https = require('https')
const { DANEAgent, setServers, lookup } = require('./https-dane.js')

setServers([
  '127.0.0.1:5350'
])

test('dane', async assert => {
  const agent = new DANEAgent()
  const expected = `hs1qshuyulxra3pqpwr40303t8pn79232zztuk4qgz`
  const url = `https://iamfernando/.well-known/wallets/HNS`
  assert.plan(1)
  https.get(url, { agent, lookup }, res => {
    res.on('data', data => {
      assert.is(expected, data.toString().trim())
    })
  })
})

// todo: fail test
