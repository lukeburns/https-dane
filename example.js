import https from 'https'
import DANEAgent, { setServers, lookup } from './dane-agent.js'

setServers([
  '103.196.38.38',
  '103.196.38.39',
  '103.196.38.40'
])

const agent = new DANEAgent()
const url = `https://iamfernando/.well-known/wallets/HNS`

https.get(url, { agent, lookup }, res => res.pipe(process.stdout))
