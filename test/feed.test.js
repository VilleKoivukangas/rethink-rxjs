const { expect, assert } = require('chai');
const controller = require('../src/controller');

describe('#feed', () => {

  const table = 'test';
  let r;

  before(async () => {
    const options = {
      host: '127.0.0.1',
      timeoutError: 10000,
      port: 28015,
      pool: true,
      cursor: true,
      silent: true,
    };

    r = await controller.getR(options);
  });

  // Test case for insert
  it('should return type "add", value "foo" and oldValue null', (done) => {
    const expectedValue = 'insert-test';
    const queryObject = r.table(table).filter({value: expectedValue});
      controller.getFeed(queryObject).then(async (feed) => {
        await controller.subscribe(feed, ([value, oldValue, type]) => {
          expect(type).to.equal('add');
          expect(value.value).to.equal(expectedValue);
          expect(oldValue).to.equal(null);
          done();
        });

        // TODO: For some reason we are not waiting subscribe to resolve
        setTimeout(() => {
          controller.insertDbObject(r, table, {value: expectedValue}); 
        }, 200);
    });
  });

  // Test case for update
  it('should update object from database', (done) => {
    const initialValue = {value: 'updatetest'};
    const expectedValue = {value: 'updated'};
    const queryObject = r.table(table).filter(expectedValue);

    controller.getFeed(queryObject).then(async (feed) => {
      await controller.subscribe(feed, ([value, oldValue, type]) => {
        // TODO: If using filters in query objects
        // Depening on situation it returns type remove or add instead of updated 
        // (can't assert old value and it would be stupid to assert type to removed here)
        // Figure out something better here
        expect(value.value).to.equal(expectedValue.value);
        done();
      });

      // TODO: For some reason we are not waiting subscribe to resolve
      setTimeout(async () => {
        await controller.insertDbObject(r, table, initialValue);
        controller.updateDbObject(r, table, initialValue, 1, expectedValue);
      }, 200);
    });
  });

  // Test case for delete
  it('should delete object from database', (done) => {
    const initialValue = {value: 'deletetest'};
    const expectedValue = null;
    const queryObject = r.table(table).filter(initialValue);

    controller.getFeed(queryObject).then(async (feed) => {
      await controller.subscribe(feed, ([value, oldValue, type]) => {
        if (type === 'add') {
          return;
        }
        expect(type).to.equal('remove');
        expect(value).to.equal(expectedValue);
        done();
      });

      // TODO: For some reason we are not waiting subscribe to resolve
      setTimeout(async () => {
        await controller.insertDbObject(r, table, initialValue);
        controller.deleteDbObject(r, table, initialValue, 1);
      }, 200);
    });
  });

  after((done) => {
    r.getPoolMaster().drain();
    done();
  });
});