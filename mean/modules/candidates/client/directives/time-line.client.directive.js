(function () {
  'use strict';

  angular
    .module('candidates')
    .directive('timeLine', timeLine);

  timeLine.$inject = [/*Example: '$state', '$window' */];

  function timeLine(/*Example: $state, $window */) {
    return {
      template: '<div></div>',
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function postLink(scope, element, attrs) {

      }
    };
  }
})();
