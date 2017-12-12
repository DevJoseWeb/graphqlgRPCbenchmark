const micro = require('micro')
const srv = micro(require('./index'))

srv.listen(3000, () => console.log('Listening on port 3000'))