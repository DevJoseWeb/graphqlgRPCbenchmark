const path = require('path')
const util = require('util')
const grpc = require('grpc')
const flatten = require('lodash.flatten')
const times = require('lodash.times')

const PROTO_PATH = path.join(__dirname, '..', 'server-grpc', 'service.proto')

const { service } = grpc.load(PROTO_PATH)

const client = new service.Service('localhost:50051', grpc.credentials.createInsecure())

const getData = (count) => new Promise((resolve, reject) => {
  client.getData({ count }, function(err, response) {
    resolve(response)
  })
})

module.exports = async (_, { size, parts }) => {
  const res = await Promise.all(times(parts, () => getData(size).then(({ results }) => results)))
  console.log(res)
  return flatten(res)
}
