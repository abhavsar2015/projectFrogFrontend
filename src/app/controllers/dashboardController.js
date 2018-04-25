;
(function() {
  'use strict';
  var myApp = angular.module('myApp');
  myApp.controller('dashboardController', dashboardController);
  dashboardController.$inject = ['restServices', '$scope', '$window', '$cookieStore'];

  function dashboardController(restServices, $scope, $window, $cookieStore) {
    var self = this;
    $scope.userName = "";
    $scope.passWord = "";
    $scope.classValue = "";
    $scope.lastName = "";
    $scope.viewby = 10;
    $scope.classShow = false;
    $scope.searchById = function() {
      console.log($scope.studentId);
      restServices.searchById($scope.studentId)
          .then(
              function(d) {
                if (d.status === 200) {
                  $scope.classShow = false;
                  var data = d.data;
                  $scope.studentDetails = data;
                } else {
                  $scope.studentDetails.length = 0;
                }
              }
          )
    }
    $scope.deleteById = function(a) {
      console.log(a);
      restServices.delete(a)
          .then(
              function(d) {
                if (d.status === 200) {
                  var data = d.data;
                  $scope.studentDetails = data;
                } else {
                  $scope.studentDetails.length = 0;
                }
              }
          )
    }
    $scope.update = function(b, a) {
      console.log(b);
      $scope.dat = {
        studentId: b.studentId,
        firstName: $('#first' + a).val(),
        lastName: $('#last' + a).val(),
        dateOfBirth: b.dateOfBirth,
        classDetails: $('#class' + a).val(),
        scoreCard: {
          scoreCardId: b.scoreCard.scoreCardId,
          subject1: $('#sub1' + a).val(),
          subject2: $('#sub2' + a).val(),
          subject3: $('#sub3' + a).val()
        }
      }
      console.log($scope.dat)
      restServices.update($scope.dat)
          .then(
              function(d) {
                if (d.status === 200) {
                  var data = d.data;
                  data.sort(function(a, b) {
                    return (parseFloat(b.scoreCard['subject1']) + parseFloat(b.scoreCard['subject2']) + parseFloat(b.scoreCard['subject3'])) - (parseFloat(a.scoreCard['subject1']) + parseFloat(a.scoreCard['subject2']) + parseFloat(a.scoreCard['subject3']));
                  });
                  $scope.studentDetails = data;
                } else {
                  $scope.studentDetails.length = 0;
                }
              }
          )
    }
    $scope.getPercentage = function(a) {
      console.log(a)
      var sum = parseFloat(a.subject1) + parseFloat(a.subject2) + parseFloat(a.subject3);
      var percentage = (sum * 100) / 300;
      return percentage;
    }
    $scope.sorting = function(a) {
      return $scope.getPercentage(a.scoreCard);
    }
    $scope.searchByClass = function() {
      restServices.searchByClass($scope.classValue)
          .then(
              function(d) {
                if (d.status === 200) {
                  $scope.classShow = true;
                  var data = d.data;
                  console.log(d);
                  data.sort(function(a, b) {
                    return (parseFloat(b.scoreCard['subject1']) + parseFloat(b.scoreCard['subject2']) + parseFloat(b.scoreCard['subject3'])) - (parseFloat(a.scoreCard['subject1']) + parseFloat(a.scoreCard['subject2']) + parseFloat(a.scoreCard['subject3']));
                  });
                  $scope.studentDetails = data;
                } else {
                  $scope.studentDetails.length = 0;
                }
              }
          );
    }
    $scope.searchByFirstName = function() {

      restServices.searchByFirstName($scope.firstName)
          .then(
              function(d) {
                $scope.classShow = false;
                if (d.status === 200) {
                  var data = d.data;
                  console.log(d);
                  data.sort(function(a, b) {
                    return (parseFloat(b.scoreCard['subject1']) + parseFloat(b.scoreCard['subject2']) + parseFloat(b.scoreCard['subject3'])) - (parseFloat(a.scoreCard['subject1']) + parseFloat(a.scoreCard['subject2']) + parseFloat(a.scoreCard['subject3']));
                  });
                  $scope.studentDetails = data;
                } else {
                  $scope.studentDetails.length = 0;
                }
              }
          );
    }
    $scope.searchByLastName = function() {
      console.log($scope.lastName);
      restServices.searchByLastName($scope.lastName)
          .then(
              function(d) {
                if (d.status === 200) {
                  $scope.classShow = false;
                  var data = d.data;
                  data.sort(function(a, b) {
                    return (parseFloat(b.scoreCard['subject1']) + parseFloat(b.scoreCard['subject2']) + parseFloat(b.scoreCard['subject3'])) - (parseFloat(a.scoreCard['subject1']) + parseFloat(a.scoreCard['subject2']) + parseFloat(a.scoreCard['subject3']));
                  });
                  $scope.studentDetails = data;
                } else {
                  $scope.studentDetails.length = 0;
                }
              }
          );
    }
    $scope.logout = function() {

      restServices.signOut()
          .then(
              function(response) {
                if (response['status'] === 200) {

                  delete $window.sessionStorage.token;
                  $window.location.href = '#!/login';
                }
              },
              function(errResponse) {

              });

    }
    $scope.classe = [{
      name: "1",
      id: "1"
    },
      {
        name: "2",
        id: "2"
      },
      {
        name: "3",
        id: "3"
      },
      {
        name: "4",
        id: "4"
      },
      {
        name: "5",
        id: "5"
      },
      {
        name: "6",
        id: "6"
      },
      {
        name: "7",
        id: "7"
      },
      {
        name: "8",
        id: "8"
      },
      {
        name: "9",
        id: "9"
      },
      {
        name: "10",
        id: "10"
      },
      {
        name: "11",
        id: "11"
      },
      {
        name: "12",
        id: "12"
      }
    ];
  }

})();