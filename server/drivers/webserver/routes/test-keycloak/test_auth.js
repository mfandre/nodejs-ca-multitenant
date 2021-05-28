const config = require('../../../../config');

let test_keycloak = module.exports = {}

test_keycloak.test_auth = (req, res, next) => {
  res.status(200).send('Worked!')
}

