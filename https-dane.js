const https = require('https')
const dns = require('hdns')

const DANE = Symbol('dane')
const verify = cert => tlsa => {
  try {
    return dns.verifyTLSA(tlsa, cert.raw)
  } catch (err) {
    return false
  }
}

class DANEAgent extends https.Agent {
  constructor (options = {}) {
    super({ ...options, rejectUnauthorized: false })
    this.on('keylog', (line, socket) => {
      if (!socket[DANE]) {
        socket[DANE] = true

        socket.on('secureConnect', () => {
          const cert = socket.getPeerCertificate()

          return dns
            .resolveTLSA(socket.servername, 'tcp', 443)
            .then(entries => entries.some(verify(cert)) || Promise.reject())
            .catch(() => socket.destroy(new Error('Invalid TLSA')))
        })
      }
    })
  }
}

module.exports = {
  DANEAgent,
  lookup: dns.legacy,
  setServers: dns.setServers,
  dns
}
