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