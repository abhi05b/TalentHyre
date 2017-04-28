(function () {
  'use strict';

  describe('Hrs Route Tests', function () {
    // Initialize global variables
    var $scope,
      HrsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _HrsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      HrsService = _HrsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('hrs');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/hrs');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          HrsController,
          mockHr;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('hrs.view');
          $templateCache.put('modules/hrs/client/views/view-hr.client.view.html', '');

          // create mock Hr
          mockHr = new HrsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Hr Name'
          });

          // Initialize Controller
          HrsController = $controller('HrsController as vm', {
            $scope: $scope,
            hrResolve: mockHr
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:hrId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.hrResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            hrId: 1
          })).toEqual('/hrs/1');
        }));

        it('should attach an Hr to the controller scope', function () {
          expect($scope.vm.hr._id).toBe(mockHr._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/hrs/client/views/view-hr.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          HrsController,
          mockHr;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('hrs.create');
          $templateCache.put('modules/hrs/client/views/form-hr.client.view.html', '');

          // create mock Hr
          mockHr = new HrsService();

          // Initialize Controller
          HrsController = $controller('HrsController as vm', {
            $scope: $scope,
            hrResolve: mockHr
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.hrResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/hrs/create');
        }));

        it('should attach an Hr to the controller scope', function () {
          expect($scope.vm.hr._id).toBe(mockHr._id);
          expect($scope.vm.hr._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/hrs/client/views/form-hr.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          HrsController,
          mockHr;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('hrs.edit');
          $templateCache.put('modules/hrs/client/views/form-hr.client.view.html', '');

          // create mock Hr
          mockHr = new HrsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Hr Name'
          });

          // Initialize Controller
          HrsController = $controller('HrsController as vm', {
            $scope: $scope,
            hrResolve: mockHr
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:hrId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.hrResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            hrId: 1
          })).toEqual('/hrs/1/edit');
        }));

        it('should attach an Hr to the controller scope', function () {
          expect($scope.vm.hr._id).toBe(mockHr._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/hrs/client/views/form-hr.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
