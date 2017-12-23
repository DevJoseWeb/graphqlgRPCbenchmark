const path = require('path')
const grpc = require('grpc')

const PROTO_PATH = path.join(__dirname, 'service.proto')

const service = grpc.load(PROTO_PATH).service

const getData = (call, callback) => {
  console.log(call.request.content)
  callback(null ,[
    {
      name: 'roderik',
      longitude: 1.1,
      latitude: 1.2,
    }
  ])
}

const main = () => {
  const server = new grpc.Server()
  server.addService(service.Service.service, { getData })
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure())
  server.start()
}

main()