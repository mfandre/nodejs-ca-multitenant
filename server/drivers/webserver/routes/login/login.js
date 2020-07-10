let usersDb = require('../../../../data-access/users-db')
const jwt = require('jsonwebtoken');
const config = require('../../../../config')

let login = module.exports = {}

login.login = (req, res, next) => {
  const { email, password } = req.body;
  const slug = req.headers.slug;

  usersDb.findUsersBy(slug, 'email', email).then(data => {
    if (data.length != 1 || password !== data[0].password){
      res.status(401).send();
      return;
    }
    data[0].password = undefined;
    const token = jwt.sign(data[0], config.JWT_PW);
    res.status(200).send({ userData: data[0], token });
  }).catch(error => {
    console.error(error);
    res.status(500).send();
  });
}

login.register = (req, res, next) => {
  ///const { email, password, name } = req.body;
  const slug = req.headers.slug;
  console.log("req.body",req.body)
  usersDb.addUser(slug, req.body).then(data => {
    res.status(200).send(data);
  }).catch(error => {
    console.error(error);
    res.status(500).send();
  })
}

login.auth = (req, res, next) => {
  let token = req.header("Authorization");
  //console.log("token", token)
  if(token == undefined){
    res.status(401).send();
    return;
  }
    
	token = token.split(" ")[1];
	const ok = jwt.verify(token, config.JWT_PW);
	res.status(200).send(ok);
}

login.checkToken = (req, res, next) => {
  let token = req.header("Authorization");
  //sconsole.log("token", token)
  if(token == undefined){
    return res.status(401).send();
  }

  token = token.split(" ")[1];
  jwt.verify(token, config.JWT_PW, (err, decoded) => {
    if (err) {
      return res.status(401).send();
    } else {
      req.decoded = decoded;
      next();
    }
  });
}