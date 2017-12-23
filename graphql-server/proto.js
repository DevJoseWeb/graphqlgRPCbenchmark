const path = require('path')
const util = require('util')
const grpc = require('grpc')

const PROTO_PATH = path.join(__dirname, '..', 'server-grpc', 'service.proto')

const { service } = grpc.load(PROTO_PATH)

const main = async () => {
  const client = new service.Service('localhost:50051',
                                       grpc.credentials.createInsecure());
  const getData = util.promisify(client.getData)

  // const data = await getData({content: 'hi'})

  // console.log(data)

  client.getData({content: 'hi'}, function(err, response) {
    console.log(response)
  })

}

main()
