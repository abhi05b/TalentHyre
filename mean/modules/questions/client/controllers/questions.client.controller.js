(function () {
  'use strict';

  // Questions controller
  angular
    .module('questions')
    .controller('QuestionsController', QuestionsController);

  QuestionsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'questionResolve','$http','notifications'];

  function QuestionsController ($scope, $state, $window, Authentication, question,$http, notifications) {
    var vm = this;

    vm.authentication = Authentication;
    vm.question = question;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.triggerFileDialog = function(){
      $("#questionText").trigger("click");
    };

    $scope.saveFileInModel = function(event){
      $("#filePlaceholder").val($("#questionText").val().replace(/C:\\fakepath\\/i, ''));
      vm.question.questionText = event.target.files[0];
    }
    // Remove existing Question
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.question.$remove($state.go('questions.list'));
      }
    }
    var serialize = function (obj, prefix,formData) {
        for (var p in obj) {
          if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix+'.'+p  : p,
                  v = obj[p];
              if(typeof v == "object"){
            	  serialize(v, k, formData)
              }   else{
            	  formData.append(k, v );
              }
          }
        }
        return formData;
    }
    // Save Question
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.questionForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.question._id) {
        vm.question.$update(successCallback, errorCallback);
      } else {
        //vm.question.$save(successCallback, errorCallback);
        $http({
                method: 'POST',
                url: '/api/questions',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data:{'name': vm.question.name},
        				headers :  {
                          'Content-type': undefined
                        },
                transformRequest: function (data, headersGetter) {
                    var formData = new FormData();
                    serialize(data,"",formData);
                    var headers = headersGetter();
                    delete headers['Content-Type'];
                    if(vm.question.questionText)
                    formData.append("questionText", vm.question.questionText);
                    return formData;
                }
            }).then(function(){
              notifications.showSuccess({message: 'Questions Uploaded Successfully'});
            },function(){
               notifications.showError({message: 'Oh no! Upload failed, <em>please check the fields and try again.</em>'});
            });
      }

      function successCallback(res) {
        $state.go('questions.view', {
          questionId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
