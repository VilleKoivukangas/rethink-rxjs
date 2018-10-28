// Controller file

const { client, feed } = require('./');

const getR = async (options, callback) => {
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

const insertDbObject = async (r, table, values) => {
  return await r.table(table).insert(values).then(() => {
    // Something funny
  }).error((error) => {
    throw error;
  });
};

const updateDbObject = async (r, table, filter, limit, values) => {
  return r.table(table).filter(filter).limit(limit).update(values, {returnChanges: true}).then((r, k) => {
    // Something funny
  }).error((error) => {
    throw error;
  });
};

const deleteDbObject = async (r, table, filter, limit) => {
  return r.table(table).filter(filter).limit(limit).delete().then(() => {
    // Something funny
  }).error((error) => {
    throwError(error);
  });
};

const deleteAllFromDb = async (r, table) => {
  return r.table(table).delete().then(() => {
    // Something funny
  }).error((error) => {
    throw error;
  });
};


module.exports = { getR, getFeed, insertDbObject, updateDbObject, deleteDbObject, deleteAllFromDb, subscribe };
