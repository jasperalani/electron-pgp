#### PGP Utilities
- Create key `curve: curve25519, ed25519, p256, p384, p521, secp256k1, brainpoolP256r1, brainpoolP384r1, brainpoolP512r1)`
- Store (JSON saved in a file)
- Encrypt and decrypt messages using the keychain

Built with [nodejs](https://nodejs.org/), [openpgpjs](https://github.com/openpgpjs/openpgpjs) and [electron](https://www.electronjs.org/).

###### version a1.0.1

&nbsp;
#### Setup
1. Run `npm install` in the project directory.
2. Create folder `keys` in src folder.
3. Run `npm run start-dev` or `npm run start-prod` to run in a development or production environment.

&nbsp;
#### Todo
- ~~Storage~~
- ~~Creation~~
- ~~Message encryption~~
- ~~Message decryption~~
- Automate creation of keys dir
- Easy retrieval (copy json to clipboard)
- Security
- Create build pipeline