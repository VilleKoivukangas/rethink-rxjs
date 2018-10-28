// Controller file

const client = require('./client');
const feed = require('./feed');

const getR = async (options) => {
  try {
    return await client(options);
  } catch (error) {
    throw error;
  }
};

const getFeed = async (queryObject) => {
  return await feed(queryObject);
};

const subscribe = async (activeFeed, callback) => {
  return await activeFeed.subscribe(([value, oldValue, type]) => {
    return callback([value, oldValue, type]);
  }, () => {
    console.log("Error");
  }, () => {
    console.log("Completed");
  });
};

module.exports = { getR, getFeed, subscribe };
