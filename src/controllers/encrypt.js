const { validPage } = require('../controllers/utils')
const { getKeyList, renderKeyList } = require('../controllers/key')

window.addEventListener('DOMContentLoaded', () => {

  if (!validPage('encrypt')) {
    return
  }

  renderKeyList(getKeyList()).then(keys => {



  })

})