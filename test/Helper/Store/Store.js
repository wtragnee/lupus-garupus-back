require('should');
const Store = require('../../../src/Helper/Store/Store');

describe('Unit Test', () => {
  describe('Store', () => {
    describe('Store.constructor', () => {
      it('should set container', () => {
        const store = new Store({
          container: 'container'
        });
        store._container.should.eql('container');
      });
    });
  });
});
