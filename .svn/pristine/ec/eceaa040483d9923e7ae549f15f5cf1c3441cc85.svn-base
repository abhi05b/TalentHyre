'use strict';

describe('Hrs E2E Tests:', function () {
  describe('Test Hrs page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/hrs');
      expect(element.all(by.repeater('hr in hrs')).count()).toEqual(0);
    });
  });
});
