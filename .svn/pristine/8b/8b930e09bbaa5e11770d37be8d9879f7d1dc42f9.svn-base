'use strict';

describe('Candidates E2E Tests:', function () {
  describe('Test Candidates page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/candidates');
      expect(element.all(by.repeater('candidate in candidates')).count()).toEqual(0);
    });
  });
});
