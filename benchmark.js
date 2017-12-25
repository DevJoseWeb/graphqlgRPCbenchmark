const Benchmark = require('benchmark')
const axios = require('axios')
const jsonfile = require('jsonfile')
const path = require('path')
const Promise = require('bluebird')
 
const test = (size, parts) => () => new Promise((resolve, reject) => { 
  const suite = new Benchmark.Suite
  const res = {}
  suite.add('grpc',{
    defer: true,
    minSamples: 20,
    fn: (df) => {
      axios.post('http://localhost:4000', {
        query: `{\n  grpc(size: ${size}, parts: ${parts}) {\n    name\n    phone\n    id\n    profilePic\n    birthday\n    balance\n  }\n}`
      }).then(() => {
        df.resolve()
      })
    }
  })
  .add('http',{
    defer: true,
    minSamples: 20,
    fn: (df) => {
      axios.post('http://localhost:4000', {
        query: `{\n  http(size: ${size}, parts: ${parts}) {\n    name\n    phone\n    id\n    profilePic\n    birthday\n    balance\n  }\n}`        
      }).then(() => {
        df.resolve()
      })
    }
  })
  .add('httpc', {
    defer: true,
    minSamples: 20,
    fn: (df) => {
      axios.post('http://localhost:4000', {
        query: `{\n  httpc(size: ${size}, parts: ${parts}) {\n    name\n    phone\n    id\n    profilePic\n    birthday\n    balance\n  }\n}`        
      }).then(() => {
        df.resolve()
      })
    }
  })
  // add listeners 
  .on('cycle', function(event) {
    res[event.target.name] = {
      sample: event.target.stats.sample.length,
      rme: event.target.stats.rme,
      hz: event.target.hz,
      scenario: {size, parts}
    }
  })

  .on('complete', function() {
    resolve({
      fast: this.filter('fastest').map('name').join(','),
      res
    })
  })
  // run async 
  .run({ 'async': true })
})

const funcs = Promise.resolve([
  [1, 1],
  [1, 10],
  [1, 100],
  [1, 1000],
  [1, 1],
  [10, 1],
  [100, 1],
  [1000, 1],
].map(([a, b]) => test(a, b)))

funcs
  .mapSeries((f) => f())  // logs: 500, 100, 400, 200
  .then((res) => {
    console.log(res)
    jsonfile.writeFileSync(path.join(__dirname, 'results.json'), res)
  })
