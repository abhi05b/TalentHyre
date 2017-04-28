(function () {
  'use strict';

  angular
    .module('hrs')
    .controller('HrsListController', HrsListController);

  HrsListController.$inject = ['HrsService'];

  function HrsListController(HrsService) {
    var vm = this;

    vm.hrs = HrsService.query();
  }
}());
