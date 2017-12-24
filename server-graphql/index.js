const fs = require('fs')
const path = require('path')
const jsonfile = require('jsonfile')

const { GraphQLServer } = require('graphql-yoga')
const httpSrv = require('./http')
const httpSrvc = require('./httpc')
const proto = require('./proto')

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8')
const json = jsonfile.readFileSync(path.join(__dirname, '..' ,'mock', 'mock.json'))

const resolvers = {
  Query: {
    http: httpSrv,
    httpc: httpSrvc,
    grpc: proto,
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000'))