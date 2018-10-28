const controller = require('./src/controller');

// Let's do something cool with observable changefeeds!
// Use your imagination
const table = 'test';

controller.getR().then(async (r) => {
  const queryObject = r.table(table);
  const feed = await controller.getFeed(queryObject);

  await controller.subscribe(feed, ([value, oldValue, type]) => {
    console.log(type);
    switch (type) {
      case 'add':
        console.log('Inserted entry:', value);
        break;
      case 'change':
        console.log('Updated entry:', oldValue, 'with new value:', value);
        break;
      case 'remove':
        console.log('Deleted entry:', oldValue);
        break;
      default:
        console.log('Unrecognized type', type);
    }
  });
    setInterval(() => {
      controller.insertDbObject(r, table, {value: 'foo'});
    }, 2000);

    setInterval(async () => {
      const initialValue = {value: 'updateme'};
      const expectedValue = {value: 'ok'};
  
      await controller.insertDbObject(r, table, initialValue);
      controller.updateDbObject(r, table, initialValue, 1, expectedValue);
    }, 2000);
  });
