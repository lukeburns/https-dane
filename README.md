# DANE Agent

## Usage

`npm i https-dane`

```js
const https = require('https')
const { DANEAgent, setServers, lookup } = require('https-dane')

setServers([
  '127.0.0.1:5350'
])

const agent = new DANEAgent()
const url = `https://iamfernando/.well-known/wallets/HNS`

https.get(url, { agent, lookup }, res => res.pipe(process.stdout))
```
