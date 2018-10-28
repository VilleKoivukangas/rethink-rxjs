const r = require('rethinkdbdash');

// Export a function that returns a database client instance with
// connection pool

module.exports = async (options) => {
  return await r(options);
};