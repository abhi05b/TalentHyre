(function () {
  'use strict';

  // Hrs controller
  angular
    .module('hrs')
    .controller('HrsController', HrsController);

  HrsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'hrResolve'];

  function HrsController ($scope, $state, $window, Authentication, hr) {
    var vm = this;

    vm.authentication = Authentication;
    vm.hr = hr;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Hr
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.hr.$remove($state.go('hrs.list'));
      }
    }

    // Save Hr
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.hrForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.hr._id) {
        vm.hr.$update(successCallback, errorCallback);
      } else {
        vm.hr.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('hrs.view', {
          hrId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
