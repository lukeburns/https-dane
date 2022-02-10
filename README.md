# DANE Agent

## Usage

`npm i https-dane`

```js
const https = require('https')
const { DANEAgent, setServers, lookup } = require('https-dane')

setServers([
  '103.196.38.38',
  '103.196.38.39',
  '103.196.38.40'
])

const agent = new DANEAgent()
const url = `https://iamfernando/.well-known/wallets/HNS`

https.get(url, { agent, lookup }, res => res.pipe(process.stdout))
```
