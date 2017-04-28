(function () {
  'use strict';

  // Candidates controller
  angular
    .module('candidates')
    .controller('CandidatesController', CandidatesController);

  CandidatesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'candidateResolve'];

  function CandidatesController ($scope, $state, $window, Authentication, candidate) {
    var vm = this;

    vm.authentication = Authentication;
    vm.candidate = candidate;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Candidate
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.candidate.$remove($state.go('candidates.list'));
      }
    }

    // Save Candidate
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.candidateForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.candidate._id) {
        vm.candidate.$update(successCallback, errorCallback);
      } else {
        vm.candidate.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('candidates.view', {
          candidateId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
