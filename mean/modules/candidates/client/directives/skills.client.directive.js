(function () {
  'use strict';

  angular
    .module('candidates')
    .directive('skills', skills);

  skills.$inject = [/*Example: '$state', '$window' */];

  function skills(/*Example: $state, $window */) {
    return {
      templateUrl: '/modules/candidates/views/skills.template.html',
      restrict: 'E',
      scope: {
        skills: "="
      },
      link: function postLink(scope, element, attrs) {
        
      },
      controller: function(){
        this.radius = 50;
        this.gutter = 0;
      },
      bindToController: true,
      controllerAs: 'skillsController',
    };
  }
})();
