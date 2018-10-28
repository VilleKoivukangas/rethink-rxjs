const Rx = require('rxjs');

// Export a function that wraps any database query changefeed into
// RX observable
module.exports = (queryObject) => {
  return Rx.Observable.create((observer) => {
    try {
      queryObject.changes({
        'includeTypes': true
      }).run().then((changes) => {
        changes.each((err, change) => {
          if (err) throw err;
          const result = [change.new_val, change.old_val, change.type];
          observer.next(result);
        });
      });
    } catch (e) {
      console.log(e);
    }
  });
};