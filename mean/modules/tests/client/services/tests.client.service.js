// Tests service used to communicate Tests REST endpoints
(function () {
  'use strict';

  angular
    .module('tests')
    .factory('TestsService', TestsService);

  TestsService.$inject = ['$resource','Authentication'];

  function TestsService($resource, Authentication) {
  
    return $resource('api/tests/:testId', {
      testId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
