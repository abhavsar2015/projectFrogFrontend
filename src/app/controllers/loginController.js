;
(function() {
  'use strict';
  var myApp = angular.module('myApp');
  myApp.controller('loginController', loginController);
  loginController.$inject = ['restServices', '$scope', '$window'];

  function loginController(restServices, $scope, $window) {
    var self = this;
    $scope.userName = "";
    $scope.passWord = "";
    $scope.submit = function() {
      console.log($scope.userName)
      var data = {
        username: $scope.userName,
        password: $scope.passWord
      }
      console.log(data)
      restServices.login(data).then(
          function(response) {
            console.log(data)
            if (response['status'] === 200) {
              $window.sessionStorage.token = response.data.token;
              console.log($window.sessionStorage.token)
              $window.location.href = '#!/dashboard';
            } else {
              $scope.error = true;
              $scope.errorDescriptio = "Login Unsuccessful. Please try Again.";

            }
          }
      )
    }
  }

})();