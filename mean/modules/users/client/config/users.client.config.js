'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push(['$q', '$location', 'Authentication','notifications',
      function ($q, $location, Authentication,notifications) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
              case 401:
                // Deauthenticate the global user
                Authentication.user = null;

                // Redirect to signin page
                $location.path('signin');
                break;
              case 403:
                // Add unauthorized behaviour
                break;
              case 400:
              notifications.showError({message: 'Oh no! Error occured, <em>please try again.</em>'});
               break;
            }

            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
])
.value('home','/dashboard');
