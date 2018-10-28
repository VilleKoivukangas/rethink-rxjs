const { expect, assert } = require('chai');
const controller = require('../src/controller');

describe('#client', () => {

  let r;
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
  });

  // Test case for client exists
  it('should have client', (done) => {
    assert.notEqual(r, null);
    done();
  });

  // Test case for insert data
  it('should be able to insert data', (done) => {
    r.table('test').insert({valule: 'bob'}).then((val) => {
      assert.equal(val.inserted, 1);
      done();
    });
  });

  after(async (done) => {
    r.getPoolMaster().drain();
    done();
  });
});
