const axios = require('axios')
const times = require('lodash.times')
const flatten = require('lodash.flatten')

module.exports = async (_, { size, parts }) => {
  const res = await Promise.all(times(parts, () => axios.post(`http://${process.env.SERVERURL}:3001`, {
    count: size
  }).then(({data}) => data)))
  
  return flatten(res)
}