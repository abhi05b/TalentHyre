(function () {
  'use strict';

  // Jobs controller
  angular
    .module('jobs')
    .controller('JobsController', JobsController);

  JobsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'jobResolve','$http','notifications'];

  function JobsController ($scope, $state, $window, Authentication, job, $http,notifications) {
    var vm = this;

    vm.authentication = Authentication;
    vm.job = job;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.createTest = createTest;
    vm.job.skills = vm.job.skills || [{expertise: null,name:null}];
    // Remove existing Job
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.job.$remove($state.go('jobs.list'));
      }
    }


    // Save Job
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.jobForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.job._id) {
        vm.job.$update(successCallback, errorCallback);
      } else {
        vm.job.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('hr.dashboard', {
          jobId: res._id
        });
        notifications.showSuccess({
          message: 'Job has been created.',
          hideDelay: 10000, //ms
          hide: true //bool
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
      function createTest(job){
        $http.get('/api/create/test/'+job._id)
        .then(function(response){
          var test = response.data;
          $state.go('tests.view',{'testId': test._id});
        })

      }
    }
}());
