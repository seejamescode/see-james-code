const prod = require('./configureStore.prod');
const dev = require('./configureStore.dev');

if (process.env.NODE_ENV === 'production') {
  module.exports = prod;
} else {
  module.exports = dev;
}
