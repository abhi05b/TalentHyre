(function () {
  'use strict';

  angular
    .module('candidates')
    .directive('skill', skill);

  skill.$inject = [/*Example: '$state', '$window' */];

  function skill(/*Example: $state, $window */) {
    return {
      templateUrl: '/modules/candidates/views/skill.template.html',
      restrict: 'E',
      controller: function(){
        this.skill = {
          expertise: 'beginner',
          experience: 5
        }
      },
      bindToController: true,
      controllerAs: 'skillController',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  }
})();
