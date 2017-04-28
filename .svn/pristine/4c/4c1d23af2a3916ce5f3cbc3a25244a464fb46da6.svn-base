(function () {
  'use strict';

  angular
    .module('candidates')
    .controller('CandidatesListController', CandidatesListController);

  CandidatesListController.$inject = ['CandidatesService'];

  function CandidatesListController(CandidatesService) {
    var vm = this;

    vm.candidates = CandidatesService.query();
  }
}());
