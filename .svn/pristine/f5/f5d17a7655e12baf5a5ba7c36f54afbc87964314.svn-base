// Hrs service used to communicate Hrs REST endpoints
(function () {
  'use strict';

  angular
    .module('hrs')
    .factory('HrsService', HrsService);

    HrsService.$inject = ['$http'];
  function HrsService($http){
    return {
      getJobs: function(){
        return $http.get('api/hrs/jobs').then(function(response){
          return response.data;
        });
      },
      getQuestionCount: function(){
        return $http.get('api/hrs/questionCount').then(function(response){
          return response.data;
        });
      },
      getCandidateCount: function(){
        return $http.get('api/hrs/candidateCount').then(function(response){
          return response.data;
        });
      },
      getJobCandidateScoresForJob: function(jobId){
        return $http.get('api/hrs/candidates?jobId='+jobId).then(function(response){
          return response.data;
        });
      }
    }
  }
}());
