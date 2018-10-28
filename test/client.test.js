const { assert } = require('chai');
const controller = require('../src/controller');

describe('#client', () => {

  let r;
  const table = 'testTable';

  let options = {
    host: '127.0.0.1',
    timeoutError: 10000,
    port: 28015,
    pool: true,
    cursor: true,
    silent: true,
  };

  before(async () => {
    r = await controller.getR(options);

    await r.tableDrop(table);
    await r.tableCreate(table);
  });

  // Test case for client exists
  it('should have client', (done) => {
    assert.notEqual(r, null);
    done();
  });

  // Test case for insert data
  it('should be able to insert data', (done) => {
    r.table(table).insert({valule: 'bob'}).then((val) => {
      assert.equal(val.inserted, 1);
      done();
    });
  });

  after(async () => {
    await r.getPoolMaster().drain();
  });
});
