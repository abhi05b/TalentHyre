(function() {
  'use strict';

  angular
    .module('hrs')
    .controller('HRDashboardController', DashboardController);

  DashboardController.$inject = ['$scope', 'jobs', 'NgTableParams','questionCount','candidateCount'];

  function DashboardController($scope, jobs, NgTableParams,questionCount,candidateCount) {
    var vm = this;
    vm.jobs = jobs;
    vm.questionCount = questionCount;
    vm.candidateCount = candidateCount;
    vm.jobTableParams = new NgTableParams({}, {counts: [], dataset: jobs});

    vm.getSkills = function(skills){
      return skills.map(function(skill){
        return skill.name;
      }).join(',');
    };
  }
})();
