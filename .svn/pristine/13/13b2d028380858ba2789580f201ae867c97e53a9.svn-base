(function() {
  'use strict';

  angular
    .module('candidates')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', 'jobCandidateScores', 'tests', 'CandidatesService', '$stateParams', 'NgTableParams','Authentication'];

  function DashboardController($scope, jobCandidateScores, tests, CandidatesService, $stateParams, NgTableParams, Authentication) {
    var vm = this;
    //vm.jobs = jobs;
    vm.tests = tests;
    vm.jobTableParams = new NgTableParams({}, { counts: [],dataset: jobCandidateScores});

    vm.getSkills = function(skills){
      if(!skills)
        return '';

      return skills.map(function(skill){
        return skill.name;
      }).join(',');
    };

    vm.hasSkills = Authentication.candidate.skills.length ? true : false;
    
  }
})();
