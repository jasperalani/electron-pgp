// Constants
const { ENV } = require('../../env')
const TMP = '../templates/'

// file index
const FILE_PATH = {
  index: 'index.html',
  key: 'key.html',
  create: 'create-key.html',
  encrypt: 'encrypt.html',
  decrypt: 'decrypt.html',
}

// Functions
// element search
const element = module.exports.element = (sel) => document.querySelector(sel)
const elements = module.exports.elements = (sel) => document.querySelectorAll(
  sel)

// error handling
module.exports.handleError = (err, verbose) => {
  if ('production' !== ENV) {
    if (verbose) alert(err)
    console.trace(`Error Occurred: ` + err)
  } else {
    // TODO: report error
  }
}

// Don't run js on the wrong pages
module.exports.validPage = (page) => window.location.pathname.split('/').pop().includes(page)

// DOM Effects
window.addEventListener('DOMContentLoaded', () => {

  // links
  const links = elements('.link')
  for (const link of links) {
    link.addEventListener('click', async (event) =>
      window.location = TMP +
        FILE_PATH[await event.target.getAttribute('data-fp')],
    )
  }

})

// Encryption and decryption of messages
module.exports.process = async (action, armouredPublicKey = '', armouredPrivateKey = '', message, passphrase = '') => {

  const configuration = {
    message: 'decrypt' === action
      ? await openpgp.message.readArmored(message)
      : await openpgp.message.fromText(message),
    publicKeys: '' === armouredPublicKey ? '' : (await openpgp.key.readArmored(armouredPublicKey)).keys,
    privateKeys: '' === armouredPrivateKey || 'encrypt' === action ? '' : (await openpgp.key.readArmored(armouredPrivateKey)).keys,
  }

  // TODO: Signing on encryption using a private key does not work

  if ('' === configuration.publicKeys && '' === configuration.privateKeys) {
    new Error('At least a public or a private key must be supplied: process()')
    return false
  }

  let data = {
    success: false,
    encrypted: '',
    decrypted: '',
  }

  switch (action) {
    case 'encrypt':
      data.success = !!(data.encrypted = await openpgp.encrypt(configuration))
      break
    case 'decrypt':
      data.success = !!(data.decrypted = await openpgp.decrypt(configuration))
      break
    default:
      new Error('Action must be one of; encrypt, decrypt: process()')
      return false
  }

  if (false === data.success) {
    return false
  }

  return data
}