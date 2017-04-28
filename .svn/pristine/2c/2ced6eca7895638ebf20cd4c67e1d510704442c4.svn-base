(function () {
  'use strict';

  angular
    .module('hrs')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('hr', {
        abstract: true,
        url: '/hr',
        templateUrl: 'modules/hrs/views/hr.client.view.html',
        controller: ['Socket','notifications',function(Socket,notifications){
          Socket.on('testCompleted',function(data){
            notifications.showSuccess({
              message: '<a>'+data.user.displayName + '</a> has submitted test for job <a>'+data.job.title+'</a>',
              hideDelay: 10000, //ms
              hide: true //bool
            });
          });

        }]
      })
      .state('hr.candidate-detail', {
        url: '/candidate-detail/:candidateId',
        templateUrl: 'modules/candidates/views/profile.client.view.html',
        controller: 'HRCandidateDetailController',
        controllerAs: 'vm',
        resolve: {
          candidate: getCandidate,
          candidateApplications: getApplications
        }
      })
      .state('hr.dashboard', {
        url: '/dashboard',
        templateUrl: 'modules/hrs/views/dashboard.client.view.html',
        controller: 'HRDashboardController',
        resolve: {
          jobs: getJobs,
          questionCount: getQuestionCount,
          candidateCount: getCandidateCount
        },
        controllerAs: 'vm'
      })
       .state('hr.job-detail', {
        url: '/job-detail/:jobId',
        templateUrl: 'modules/hrs/views/job-detail.client.view.html',
        controller: 'HRJobDetailController',
        resolve: {
          job: getJob,
          jobCandidateScores: getJobCandidateScoresForJob
        },
        controllerAs: 'vm'
      })
      .state('hr.jobsCreate', {
        url: '/job/create',
        templateUrl: 'modules/jobs/views/form-job.client.view.html',
        controller: 'JobsController',
        controllerAs: 'vm',
        resolve: {
          jobResolve: newJob
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Jobs Create'
        }
      })
       .state('hr.questions', {
        url: '/questions',
        templateUrl: 'modules/questions/views/form-question.client.view.html',
        controller: 'QuestionsController',
        controllerAs: 'vm',
        resolve: {
          questionResolve: newQuestion
        }
      })
       .state('hr.applicants', {
        url: '/applicants',
        templateUrl: 'modules/hrs/views/view-applicants.client.view.html',
        controller: 'ApplicantsController',
        controllerAs: 'vm',
        resolve: {
          applicants: getApplicants
        }
      });
  }
  newJob.$inject = ['JobsService'];

  function newJob(JobsService) {
    return new JobsService();
  }

  getJobs.$inject = ['HrsService'];

  function getJobs(HrsService){
    return HrsService.getJobs();
  }

  getQuestionCount.$inject = ['HrsService'];

  function getQuestionCount(HrsService){
    return HrsService.getQuestionCount();
  }

  getCandidateCount.$inject = ['HrsService'];

  function getCandidateCount(HrsService){
    return HrsService.getCandidateCount();
  }

  getJob.$inject = ['$stateParams', 'JobsService'];

  function getJob($stateParams, JobsService){
    return JobsService.get({jobId: $stateParams.jobId});
  }

  getJobCandidateScoresForJob.$inject = ['$stateParams','HrsService'];

  function getJobCandidateScoresForJob($stateParams, HrsService){
    return HrsService.getJobCandidateScoresForJob($stateParams.jobId);
  }

  newQuestion.$inject = ['QuestionsService'];

  function newQuestion(QuestionsService) {
    return new QuestionsService();
  }

  getApplications.$inject = ['JobCandidateStatusService', '$stateParams'];

  function getApplications(JobCandidateStatusService, $stateParams){
    return JobCandidateStatusService.get({
      candidateId: $stateParams.candidateId
    });
  }

  getCandidate.$inject = ['CandidatesService', '$stateParams'];

  function getCandidate(CandidatesService, $stateParams){
    return CandidatesService.get({
      candidateId: $stateParams.candidateId
    });
  }

  getApplicants.$inject = ['CandidatesService'];

  function getApplicants(CandidatesService){
    return CandidatesService.query();
  }

}());
