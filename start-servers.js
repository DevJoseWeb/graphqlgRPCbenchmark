const path = require('path')
const { spawn } = require('child_process')

const protoServer = path.join(__dirname, 'server-grpc', 'index.js')
const httpServer = path.join(__dirname, 'server-http', 'index.js')
const httpcServer = path.join(__dirname, 'server-http', 'compress.js')

const proto = spawn('node', [protoServer])
proto.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
})
proto.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
})
proto.on('close', (code) => {
  console.log(`proto child process exited with code ${code}`);
})
const httpS = spawn('node', [httpServer])
httpS.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
})
httpS.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
})
httpS.on('close', (code) => {
  console.log(`proto child process exited with code ${code}`);
})
const httpSC = spawn('node', [httpcServer])
httpSC.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
})
httpSC.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
})
httpSC.on('close', (code) => {
  console.log(`proto child process exited with code ${code}`);
})