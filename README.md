#### PGP Utilities
- Create key `curve: curve25519, ed25519, p256, p384, p521, secp256k1, brainpoolP256r1, brainpoolP384r1, brainpoolP512r1)`
- Store (JSON saved in a file)
- Encrypt and decrypt messages using the keychain

Built with [nodejs](https://nodejs.org/), [openpgpjs](https://github.com/openpgpjs/openpgpjs) and [electron](https://www.electronjs.org/).

###### version a1.0.2

&nbsp;
#### Setup
1. Run `npm install` in the project directory.
2. Create folder `keys` in src folder.
3. Run `npm run start-dev` or `npm run start-prod` to build and then run a development or production environment.
4. Use `npm start` to run the program in the future. You can use `npm run start-dev` or `npm run start-prod` to set the environment again later.

&nbsp;
#### Todo
- ~~Key storage~~
- ~~Key creation~~
- ~~Message encryption~~
- ~~Message decryption~~
- ~~Automate creation of keys dir~~
- Save new key
- Delete key
- Easy retrieval (copy input field to clipboard)
- Security
- Create build pipeline