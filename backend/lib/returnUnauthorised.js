function returnUnauthorised(res) {
  res.status(401).json({ message: 'unauthorised' })
}

module.exports = returnUnauthorised