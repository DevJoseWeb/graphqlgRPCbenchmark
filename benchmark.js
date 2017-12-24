const Benchmark = require('benchmark')
const axios = require('axios')
const suite = new Benchmark.Suite
 
// add tests 
suite.add('grpc',{
  defer: true,
  fn: (df) => {
    axios.post('http://localhost:4000', {
      query: "{\n  grpc(size: 10, parts: 20) {\n    name\n    phone\n    id\n    profilePic\n    birthday\n    balance\n  }\n}"
    }).then(() => {
      df.resolve()
    })
  }
})
.add('http',{
  defer: true,
  fn: (df) => {
    axios.post('http://localhost:4000', {
      query: "{\n  http(size: 10, parts: 20) {\n    name\n    phone\n    id\n    profilePic\n    birthday\n    balance\n  }\n}"
    }).then(() => {
      df.resolve()
    })
  }
})
.add('httpc', {
  defer: true,
  fn: (df) => {
    axios.post('http://localhost:4000', {
      query: "{\n  httpc(size: 10, parts: 20) {\n    name\n    phone\n    id\n    profilePic\n    birthday\n    balance\n  }\n}"
    }).then(() => {
      df.resolve()
    })
  }
})
// add listeners 
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async 
.run({ 'async': true })
 