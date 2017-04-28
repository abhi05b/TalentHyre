(function() {
  'use strict';

  angular
    .module('hrs')
    .controller('HRJobDetailController', HRJobDetailController);

  HRJobDetailController.$inject = ['$scope', 'job', 'jobCandidateScores', 'NgTableParams', '$uibModal'];

  function HRJobDetailController($scope, job, jobCandidateScores, NgTableParams, $uibModal) {
    var vm = this;
    vm.job = job;
    vm.jobCandidateScores = jobCandidateScores;
    //vm.candidateTableParams = new NgTableParams({}, { dataset: candidates});
    vm.openEmailModal = function(candidate){
       var modalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: 'EmailModalInstanceCtrl',
        controllerAs: '$ctrl',
        resolve: {
          job: function () {
            return job;
          },
          candidate: function(){
            return candidate
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $ctrl.selected = selectedItem;
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
      }
  }
})();
