const port = 8000
const dbURIPrefix = 'mongodb://localhost/'
const dbName = 'project3'
const dbURI = `${dbURIPrefix}${dbName}`

const secret = 'juicy'

module.exports = {
  port,
  dbURI,
  secret
}