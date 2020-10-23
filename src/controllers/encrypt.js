const openpgp = require('openpgp')

const { getKeyList, renderKeyList } = require('../controllers/key')
const { validPage, handleError, process } = require('../controllers/utils')

window.addEventListener('DOMContentLoaded', () => {

  if (!validPage('encrypt')) {
    return
  }

  renderKeyList(getKeyList()).
    then(keys => {

      const encryptButton = document.querySelector('#encrypt')
      encryptButton.addEventListener('click', () => {

        const keyId = keys.value

        fetch('../keys/' + keyId + '.json').
          then(key => key.json()).
          then(key => {

            const message = document.querySelector('#message')
            const encrypted = document.querySelector('#encrypted')

            const notice = {
              success: document.querySelector('.result .green'),
              failure: document.querySelector('.result .red'),
            }

            process('encrypt', key.key.publicKeyArmored, key.key.privateKeyArmored, message.value).
              then(result => {
                if (result.success) {
                  encrypted.value = result.encrypted.data
                  notice.success.classList.remove('d-none')
                }
              }).catch(err => {
              notice.failure.classList.remove('d-none')
              handleError(err)
            })
          })

      })
    }).catch(err => handleError(err))

})
