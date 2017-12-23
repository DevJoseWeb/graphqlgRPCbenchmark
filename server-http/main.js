const path = require('path')
const jsonfile = require('jsonfile')
const { json } = require('micro')

const file = jsonfile.readFileSync(path.join(__dirname, '..', 'mock', 'mock.json'))

module.exports = async (req, res) => {
  const { count  } = await json(req)
  return file.slice(0, count)
}
