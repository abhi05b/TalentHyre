(function () {
  'use strict';

  describe('Candidates Route Tests', function () {
    // Initialize global variables
    var $scope,
      CandidatesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CandidatesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CandidatesService = _CandidatesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('candidates');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/candidates');
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
          CandidatesController,
          mockCandidate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('candidates.view');
          $templateCache.put('modules/candidates/client/views/view-candidate.client.view.html', '');

          // create mock Candidate
          mockCandidate = new CandidatesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Candidate Name'
          });

          // Initialize Controller
          CandidatesController = $controller('CandidatesController as vm', {
            $scope: $scope,
            candidateResolve: mockCandidate
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:candidateId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.candidateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            candidateId: 1
          })).toEqual('/candidates/1');
        }));

        it('should attach an Candidate to the controller scope', function () {
          expect($scope.vm.candidate._id).toBe(mockCandidate._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/candidates/client/views/view-candidate.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CandidatesController,
          mockCandidate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('candidates.create');
          $templateCache.put('modules/candidates/client/views/form-candidate.client.view.html', '');

          // create mock Candidate
          mockCandidate = new CandidatesService();

          // Initialize Controller
          CandidatesController = $controller('CandidatesController as vm', {
            $scope: $scope,
            candidateResolve: mockCandidate
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.candidateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/candidates/create');
        }));

        it('should attach an Candidate to the controller scope', function () {
          expect($scope.vm.candidate._id).toBe(mockCandidate._id);
          expect($scope.vm.candidate._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/candidates/client/views/form-candidate.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CandidatesController,
          mockCandidate;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('candidates.edit');
          $templateCache.put('modules/candidates/client/views/form-candidate.client.view.html', '');

          // create mock Candidate
          mockCandidate = new CandidatesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Candidate Name'
          });

          // Initialize Controller
          CandidatesController = $controller('CandidatesController as vm', {
            $scope: $scope,
            candidateResolve: mockCandidate
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:candidateId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.candidateResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            candidateId: 1
          })).toEqual('/candidates/1/edit');
        }));

        it('should attach an Candidate to the controller scope', function () {
          expect($scope.vm.candidate._id).toBe(mockCandidate._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/candidates/client/views/form-candidate.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
