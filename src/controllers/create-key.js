const openpgp = require('openpgp');
const fs = require('fs');

document.querySelector('#create').addEventListener('click', () => {

  let fields = {
    name: document.querySelector('#name').value,
    email: document.querySelector('#email').value,
    pass: document.querySelector('#passphrase').value,
    curve: document.querySelector('#curve').value,
  };

  createKey(fields).then(keys => {
    // alert('Key created')
    // console.log(keys);

    fields.public = keys[0];
    fields.private = keys[1];
    fields.certificate = keys[2];

    const keyIds = fs.readdirSync(__dirname + '/../keys/')
    let nextId = 0

    if(keyIds.length > 0) {
      for (let id of keyIds) {
        nextId = parseInt(id.slice(0, -5))
      }
      nextId++
    }

    const writePath = __dirname + '/../keys/' + nextId + '.json'

    fs.writeFile(
        writePath,
        JSON.stringify(fields),
        function(err) {
          if (err) {
            alert('failed to save key:' + err);
          }else{
            const saved = document.querySelector('.saved').style
            saved.display = 'block';
            setTimeout(() => {
              saved.display = 'none'
            }, 2500)
          }
        });

  });

});

const createKey = async (fields) => {
  const {privateKeyArmored, publicKeyArmored, revocationCertificate} = await openpgp.generateKey(
      {
        userIds: [{name: fields.name, email: fields.email}],
        curve: fields.curve,
        passphrase: fields.pass,
      });

  return [publicKeyArmored, privateKeyArmored, revocationCertificate];
}
