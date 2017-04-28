(function() {
  'use strict';

  angular
    .module('candidates')
    .controller('JobDetailController', JobDetailController);

  JobDetailController.$inject = ['$scope', 'job', '$http','$state','JobCandidateStatusService','Authentication'];

  function JobDetailController($scope, job, $http, $state, JobCandidateStatusService, Authentication) {
    var vm = this;
    vm.job = job;
    vm.createTest = createTest;
    console.log(Authentication.candidate);
    
    function createTest(job){
      $http.get('/api/create/test/'+job._id)
      .then(function(response){
        
        JobCandidateStatusService.post({
          candidateId: Authentication.candidate._id,
          jobId: job._id
        }, {status : 'Test Started'});
        
        var test = response.data;
        $state.go('tests.view',{'testId': test._id});
      })
    }

    $http.get('/api/getCandidateStatus/' + Authentication.candidate._id + '/' + job._id)
    .then(function(response){
        vm.status = response.data ? response.data.status : null;
    });
  }
})();
