(function() {
  'use strict';

  angular
    .module('hrs')
    .controller('ApplicantsController', ApplicantsController);

  ApplicantsController.$inject = ['$scope','$http','applicants'];

  function ApplicantsController($scope, $http, applicants) {
    var vm = this;
    vm.applicants = applicants;
    console.log(applicants);
    vm.getSkills = function(skills){
      if(!skills)
        return null;
      return skills.map(function(skill){
        return skill.name;
      }).join(',');
    };
    
  }
})();
