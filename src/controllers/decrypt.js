const openpgp = require('openpgp');

window.addEventListener('DOMContentLoaded', () => {
  // const decryptButton = document.querySelector('#decrypt');
  // const resultTextarea = document.querySelector('#result');
  // decryptButton.addEventListener('click', event => {
  //   // decrypt().then(message => {
  //   //   resultTextarea.value = message;
  //   //   resultTextarea.style.display = 'block';
  //   // })
  // });
});

const decrypt = async () => {
  const message_ = document.querySelector('#message');

  await openpgp.initWorker({ path: 'openpgp.worker.js' }); // set the relative web worker path

  // put keys in backtick (``) to avoid errors caused by spaces or tabs
  // const publicKeyArmored = await getKey('public');
  const privateKeyArmored = await getKey('private'); // encrypted private key
  const passphrase = document.querySelector('#passphrase').value; // what the private key is encrypted with

  const privateKey = await openpgp.key.readArmored(privateKeyArmored);
  // const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyArmored);
  await privateKey.decrypt(passphrase);

  alert('hi')


  const { data: decrypted } = await openpgp.decrypt({
    message: await openpgp.message.readArmored(message_.value),              // parse armored message
    // publicKeys: (await openpgp.key.readArmored(publicKeyArmored)).keys, // for verification (optional)
    privateKeys: [privateKey]                                           // for decryption
  });

  alert(decrypted);
  return decrypted;
}

const getKey = async function (security) {
  let key;
  await fetch('key/' + security + '.txt')
  .then(response => response.text())
  .then(text => key = text)
  return key;
}