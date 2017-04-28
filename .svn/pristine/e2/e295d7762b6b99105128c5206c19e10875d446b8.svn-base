(function() {
  'use strict';

  angular
    .module('hrs')
    .controller('HRCandidateDetailController', HRCandidateDetailController);

  HRCandidateDetailController.$inject = ['$scope', 'candidate', 'candidateApplications', 'NgTableParams'];

  function HRCandidateDetailController($scope, candidate, candidateApplications, NgTableParams) {
    var vm = this;
    vm.isHR = true;
    vm.candidate = candidate;
    vm.applicationTableParams = new NgTableParams({}, { dataset: candidateApplications});

    vm.getSkills = function(skills){
      if(!skills)
        return null;
      return skills.map(function(skill){
        return skill.name;
      }).join(',');
    };
    
  }
})();
