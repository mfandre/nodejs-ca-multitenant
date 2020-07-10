import app from './app'

const config = require('../../config')

const PORT = config.PORT || 3000
const ENV = config.NODE_ENV
console.log("EVN", ENV)

app.listen(PORT)

console.log('healthmap_api_v4 is running on port ' + PORT)
