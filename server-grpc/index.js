const path = require('path')
const grpc = require('grpc')
const jsonfile = require('jsonfile')

const PROTO_PATH = path.join(__dirname, 'service.proto')

const service = grpc.load(PROTO_PATH).service

const file = jsonfile.readFileSync(path.join(__dirname, '..', 'mock', 'mock.json'))

const getData = (call, callback) => {
  callback(null, file.slice(0, call.request.count))
}

const main = () => {
  const server = new grpc.Server()
  server.addService(service.Service.service, { getData })
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
  server.start()
}

main()