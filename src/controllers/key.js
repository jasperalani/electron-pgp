// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const fs = require('fs');
const {handleError} = require('../controllers/utils.js');

window.addEventListener('DOMContentLoaded', () => {

  let keys = [];

  const keyIds = fs.readdirSync(__dirname + '/../keys/');
  for(let id of keyIds){
    id = parseInt(id.slice(0, -5));
    keys.push(id)
  }

  if(keys.length <= 0){
    return;
  }

  keys.sort(function(a, b){return a-b})

  const keyList = document.createElement("select");
  keyList.id = "key-list";
  document.querySelector('.navbar').appendChild(keyList);

  for (const key of keys) {
    const option = document.createElement("option");
    option.value = key;
    option.text = key;
    keyList.appendChild(option);
  }

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

  loadKey(fields, keyToLoad).catch(err => handleError(err))

  console.log(keys)

  document.querySelector('#key-list').addEventListener('change',
          (event) => {
    loadKey(fields, keys[event.target.value]).catch(err => handleError(err))
  })

  // const saveButton = element('#save');
  //
  // saveButton.addEventListener('click', event => {
  //   saveText('public', publicTextarea.value).catch(err => handleError(err));
  //   saveText('private', privateTextarea.value).catch(err => handleError(err));
  // });
  //
  // const createKeyButtonForForm = element('#create-key');
  //
  // createKeyButtonForForm.addEventListener('click', () => {
  //   // window.open('create-key.html');
  //
  //   const BrowserWindow = require('electron').remote.BrowserWindow;
  //   const win = new BrowserWindow({
  //     height: 1600,
  //     width: 800
  //   });
  //
  //   win.loadFile(FILE_PATH.create).catch(err => handleError(err));
  //
  // });

})

const loadKey = async function (fields, keyToLoad) {
  /** @var key.revocation_certificate **/
  await fetch('../keys/' + keyToLoad + '.json')
  .then(key => key.json())
  .then(key => {
    fields.name.value = key.name
    fields.email.value = key.email
    fields.pass.value = key.pass
    fields.curve.value = key.curve
    fields.public.value = key.public
    fields.private.value = key.private
    fields.cert.value = key.revocation_certificate
  })
}

// const saveText = async function (security, text) {
//   fs.writeFile('key/' + security + '.txt', text, function (err) {
//     if (err) return console.log(err);
//   });
// }