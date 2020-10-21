// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const fs = require('fs')
const { handleError, validPage } = require('../controllers/utils.js')

window.addEventListener('DOMContentLoaded', () => {

  if( ! validPage('key')){
    return
  }

  const keys = module.exports.getKeyList()

  module.exports.renderKeyList(keys).catch(err => handleError(err))

  const keyToLoad = keys[0]

  const fields = {
    name: document.querySelector('#name'),
    email: document.querySelector('#email'),
    pass: document.querySelector('#passphrase'),
    curve: document.querySelector('#curve'),
    public: document.querySelector('#public'),
    private: document.querySelector('#private'),
    cert: document.querySelector('#certificate'),
  }

  module.exports.loadKey(fields, keyToLoad).catch(err => handleError(err))

  // console.log(keys)

  document.querySelector('#key-list').addEventListener('change',
    (event) => {
      module.exports.loadKey(fields, keys[event.target.value]).catch(err => handleError(err))
    })

})

module.exports.getKeyList = function () {
  let keys = []
  const keyIds = fs.readdirSync(__dirname + '/../keys/')
  for (let id of keyIds) {
    id = parseInt(id.slice(0, -5))
    keys.push(id)
  }
  if (keys.length <= 0) {
    return
  }
  keys.sort(function (a, b) {return a - b})

  return keys
}

module.exports.renderKeyList = async function (keys) {
  const keyList = document.createElement('select')
  keyList.id = 'key-list'
  document.querySelector('.navbar').appendChild(keyList)

  for (const key of keys) {
    const option = document.createElement('option')
    option.value = key
    option.text = key
    keyList.appendChild(option)
  }

  return keyList
}

module.exports.loadKey = async function (fields, keyToLoad) {
  /** @var key.revocation_certificate **/
  await fetch('../keys/' + keyToLoad + '.json').
    then(key => key.json()).
    then(key => {
      fields.name.value = key.name
      fields.email.value = key.email
      fields.pass.value = key.pass
      fields.curve.value = key.curve
      fields.public.value = key.public
      fields.private.value = key.private
      fields.cert.value = key.revocation_certificate
    }).catch(err => handleError(err))
}

// const saveText = async function (security, text) {
//   fs.writeFile('key/' + security + '.txt', text, function (err) {
//     if (err) return console.log(err);
//   });
// }