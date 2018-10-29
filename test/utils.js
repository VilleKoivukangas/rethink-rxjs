
// Utils for testing

const insertDbObject = async (r, table, values) => {
  try {
    return await r.table(table).insert(values).then(() => {
      // Something funny
    }).error((error) => {
      throw error;
    });
  } catch (e) {
    
  }
  
};

const updateDbObject = async (r, table, filter, limit, values) => {
  return await r.table(table).filter(filter).limit(limit).update(values, {returnChanges: true}).then((r, k) => {
    // Something funny
  }).error((error) => {
    throw error;
  });
};

const deleteDbObject = async (r, table, filter, limit) => {
  return await r.table(table).filter(filter).limit(limit).delete().then(() => {
    // Something funny
  }).error((error) => {
    throw error;
  });
};

const deleteAllFromDb = async (r, table) => {
  return await r.table(table).delete().then(() => {
    // Something funny
  }).error((error) => {
    throw error;
  });
};

module.exports = { insertDbObject, updateDbObject, deleteDbObject, deleteAllFromDb };