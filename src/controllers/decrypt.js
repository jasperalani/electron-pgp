const openpgp = require('openpgp')

const { getKeyList, renderKeyList } = require('../controllers/key')
const { handleError, process, validPage } = require('../controllers/utils')

window.addEventListener('DOMContentLoaded', () => {

  if (!validPage('decrypt')) {
    return
  }

  renderKeyList(getKeyList()).
    then(keys => {

      const decryptButton = document.querySelector('#decrypt')
      decryptButton.addEventListener('click', () => {

        const keyId = keys.value

        fetch('../keys/' + keyId + '.json').
          then(key => key.json()).
          then(key => {

            const message = document.querySelector('#message')
            const decrypted = document.querySelector('#decrypted')

            const notice = {
              success: document.querySelector('.result .green'),
              failure: document.querySelector('.result .red'),
            }

            process('decrypt', key.key.publicKeyArmored, key.key.privateKeyArmored, message.value, key.passphrase).
              then(result => {
                if (result.success) {
                  decrypted.value = result.decrypted.data
                  notice.success.classList.remove('d-none')
                  notice.failure.classList.add('d-none')
                }
              }).catch(err => {
              decrypted.value = ''
              notice.failure.classList.remove('d-none')
              notice.success.classList.add('d-none')
              handleError(err)
            })
          })

      })
    }).catch(err => handleError(err))

})