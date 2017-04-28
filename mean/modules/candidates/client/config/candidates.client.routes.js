(function () {
  'use strict';

  angular
    .module('candidates')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('job-detail', {
        url: '/job-detail/:jobId',
        templateUrl: 'modules/candidates/views/job-detail.client.view.html',
        controller: 'JobDetailController',
        controllerAs: 'vm',
        resolve: {
          job: getJobDetailForCandidate
        }
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'modules/candidates/views/profile.client.view.html',
        controller: 'ProfileController',
        controllerAs: 'vm',
        resolve: {
          candidateApplications: getApplications
        }
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'modules/candidates/views/dashboard.client.view.html',
        controller: 'DashboardController',
        controllerAs: 'vm',
        resolve: {
          jobCandidateScores: getJobCandidateScores,
          tests: getTests
        }
      })
      .state('candidates', {
        abstract: true,
        url: '/candidates',
        template: '<ui-view/>'
      })
      .state('candidates.list', {
        url: '',
        templateUrl: 'modules/candidates/views/list-candidates.client.view.html',
        controller: 'CandidatesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Candidates List'
        }
      })
      .state('candidates.create', {
        url: '/create',
        templateUrl: 'modules/candidates/views/form-candidate.client.view.html',
        controller: 'CandidatesController',
        controllerAs: 'vm',
        resolve: {
          candidateResolve: newCandidate
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Candidates Create'
        }
      })
      .state('candidates.edit', {
        url: '/:candidateId/edit',
        templateUrl: 'modules/candidates/views/form-candidate.client.view.html',
        controller: 'CandidatesController',
        controllerAs: 'vm',
        resolve: {
          candidateResolve: getCandidate
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Candidate {{ candidateResolve.name }}'
        }
      })
      .state('candidates.view', {
        url: '/:candidateId',
        templateUrl: 'modules/candidates/views/view-candidate.client.view.html',
        controller: 'CandidatesController',
        controllerAs: 'vm',
        resolve: {
          candidateResolve: getCandidate
        },
        data: {
          pageTitle: 'Candidate {{ candidateResolve.name }}'
        }
      });
  }

  getCandidate.$inject = ['$stateParams', 'CandidatesService', 'Authentication'];

  function getCandidate($stateParams, CandidatesService, Authentication) {
    return CandidatesService.get({
      candidateId: Authentication.user.candidate.id
    }).$promise;
  }

  getJobCandidateScores.$inject = ['$stateParams', 'JobCandidateStatusService', 'Authentication','$http'];

  function getJobCandidateScores($stateParams, JobCandidateStatusService, Authentication, $http){

     var candidateId = Authentication.candidate._id;
      return $http.get('/api/hrs/jobCandidateStatus?candidateId='+candidateId)
           .then(function successCallback(response) {         
                  return response.data;  
             }, function errorCallback(response) {
                  return response.data;    
          });
  }

  getTests.$inject = ['$stateParams', 'TestsService', 'Authentication'];

  function getTests($stateParams, TestsService,  Authentication){
    return TestsService.query({
      candidateId: Authentication.user.candidate ? Authentication.candidate._id : 1
    }).$promise;
  }

  getApplications.$inject = ['JobCandidateStatusService', 'Authentication'];

  function getApplications(JobCandidateStatusService, Authentication){
    return JobCandidateStatusService.get({
      candidateId: Authentication.candidate._id
    });
  }

  getJobDetailForCandidate.$inject = ['$stateParams','JobsService'];

  function getJobDetailForCandidate($stateParams, JobsService){
    return JobsService.get({
      jobId: $stateParams.jobId
    });
  }

  newCandidate.$inject = ['CandidatesService'];

  function newCandidate(CandidatesService) {
    return new CandidatesService();
  }
}());
