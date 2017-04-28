(function () {
  'use strict';

  angular
  .module('candidates')
  .factory('JobCandidateStatusService', JobCandidateStatusService);

  JobCandidateStatusService.$inject = ['$http'];

  function JobCandidateStatusService($http) {
    
    return {
      get: function (params) {
        var candidateId = params.candidateId;
          return $http.get('/api/retriveJobsForCandidate/'+candidateId)
               .then(function successCallback(response) {         
                      return response.data;  
                 }, function errorCallback(response) {
                      return response.data;    
              });        
      },
      post : function(params, data){
         var candidateId = params.candidateId,
         jobId = params.jobId;
          return $http.post('/api/updateCandidateStatus/' + candidateId + '/' + jobId, data)
               .then(function successCallback(response) {         
                      return response.data;  
                 }, function errorCallback(response) {
                      return response.data;    
            });  
      }    
    };

  }
})();
