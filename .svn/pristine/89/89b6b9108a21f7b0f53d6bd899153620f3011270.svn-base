(function() {
  'use strict';

  angular
    .module('hrs')
    .controller('EmailModalInstanceCtrl', EmailModalInstanceCtrl);

  EmailModalInstanceCtrl.$inject = ['$uibModalInstance', 'job', 'candidate','notifications'];

  function EmailModalInstanceCtrl($uibModalInstance, job, candidate, notifications) {
    var vm = this;
    vm.job = job;
    vm.candidate = candidate;

    vm.sendEmail = function(candidate){
      notifications.showSuccess({message: 'Email sent successfully'});
      $uibModalInstance.close();
    };

    vm.cancel = function(){
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
