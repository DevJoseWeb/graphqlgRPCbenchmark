const micro = require('micro')
const compress = require('micro-compress')
const srv = micro(compress(require('./main')))

srv.listen(3001, () => console.log('Listening on port 3001'))
