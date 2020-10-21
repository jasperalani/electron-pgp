const openpgp = require('openpgp')
const { handleError } = require('../controllers/utils')
const { validPage } = require('../controllers/utils')
const { getKeyList, renderKeyList } = require('../controllers/key')

window.addEventListener('DOMContentLoaded', () => {

  if (!validPage('decrypt')) {
    return
  }

  const decryptButton = document.querySelector('#decrypt')
  const resultTextarea = document.querySelector('#result')

  renderKeyList(getKeyList()).
    then(keys => {

      decryptButton.addEventListener('click', event => {

        const keyId = keys.value
        // console.log("keyId: " + keyId)

        fetch('../keys/' + keyId + '.json').
          then(key => key.json()).
          then(key => {


            const message = document.querySelector('#message')
            const decrypted = document.querySelector('#decrypted')

            decrypt(key.private, message.value).
              then(signatures => {
                if(signatures.data){
                  decrypted.value = signatures.data;
                }
              })
            // console.log(decrypted)
          })

        // alert('hi')

      })
    }).
    catch(err => handleError(err))

})

const decrypt = async (privateKeyArmored, message) => {

  const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored)
  const the_message = await openpgp.message.readArmored(message)

  return await openpgp.decrypt({
    message: the_message,
    // publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for verification (optional)
    privateKeys: [privateKey],
  })
}

const getKey = async function (security) {
  let key
  await fetch('key/' + security + '.txt').
    then(response => response.text()).
    then(text => key = text)
  return key
}