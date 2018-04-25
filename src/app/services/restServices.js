;
(function() {
  'use strict';
  var myApp;
  myApp = angular.module('myApp');
  myApp.service('restServices', restServices);
  restServices.$inject = ['$http', '$q', 'CONFIG', 'Base64'];

  function restServices($http, $q, CONFIG, Base64) {
    var self = this;
    self.login = login;
    self.searchById = searchById;
    self.searchByClass = searchByClass;
    self.searchByFirstName = searchByFirstName;
    self.searchByLastName = searchByLastName;
    self.signOut = signOut;
    self.delete = deleteDetail;
    self.update = updateDetails;

    function login(data) {
      var deferred = $q.defer();
      var authdata = Base64.encode(data.username + ':' + data.password);
      self.user = {
        username: data.username,
        password: data.password
      };
      console.log(authdata)
      $http({
        url: CONFIG.API_HOST + '/token',
        method: "GET",
        headers: {
          'Content-Type': 'application/json ',
          'Authorization': 'Basic ' + authdata
        }
      })
          .then(
              function(response) {
                console.log(response);
                deferred.resolve(response);
              },
              function(errResponse) {
                console.error('Error while fetching Users');
                deferred.reject(errResponse);
              }
          );
      return deferred.promise;
    }

    function searchByClass(id) {
      console.log(id);
      var deferred = $q.defer();
      $http({
        url: CONFIG.API_HOST + '/api/getStudentInfoByclassDetails/' + id,
        method: "GET"
      }).then(
          function(response) {
            deferred.resolve(response);
          },
          function(errResponse) {
            console.error('Error while fetching Users');
            deferred.reject(errResponse);
          }
      );
      return deferred.promise;
    };

    function deleteDetail(id) {
      console.log(id);
      var deferred = $q.defer();
      $http({
        url: CONFIG.API_HOST + '/api/deleteById/' + id,
        method: "DELETE"
      }).then(
          function(response) {
            deferred.resolve(response);
          },
          function(errResponse) {
            console.error('Error while fetching Users');
            deferred.reject(errResponse);
          }
      );
      return deferred.promise;
    };

    function updateDetails(id) {
      console.log(id);
      var deferred = $q.defer();
      $http({
        url: CONFIG.API_HOST + '/api/updateByData',
        data: id,
        headers: {
          'Content-Type': 'application/json '
        },
        method: "POST"
      }).then(
          function(response) {
            deferred.resolve(response);
          },
          function(errResponse) {
            console.error('Error while fetching Users');
            deferred.reject(errResponse);
          }
      );
      return deferred.promise;
    };

    function searchById(id) {
      var deferred = $q.defer();
      $http({
        url: CONFIG.API_HOST + '/api/getStudentInfoById/' + id,
        method: "GET"
      }).then(
          function(response) {
            deferred.resolve(response);
          },
          function(errResponse) {
            console.error('Error while fetching Users');
            deferred.reject(errResponse);
          }
      );
      return deferred.promise;
    };

    function searchByFirstName(id) {
      var deferred = $q.defer();
      $http({
        url: CONFIG.API_HOST + '/api/getStudentInfoByName/' + id,
        method: "GET"
      }).then(
          function(response) {
            deferred.resolve(response);
          },
          function(errResponse) {
            console.error('Error while fetching Users');
            deferred.reject(errResponse);
          }
      );
      return deferred.promise;
    };

    function searchByLastName(id) {
      var deferred = $q.defer();
      $http({
        url: CONFIG.API_HOST + '/api/getStudentInfoByLastName/' + id,
        method: "GET"
      }).then(
          function(response) {
            deferred.resolve(response);
          },
          function(errResponse) {
            console.error('Error while fetching Users');
            deferred.reject(errResponse);
          }
      );
      return deferred.promise;
    };

    function signOut() {
      var deferred = $q.defer();
      $http({
        url: CONFIG.API_HOST + '/api/logout',
        method: "GET"
      })
          .then(
              function(response) {
                deferred.resolve(response);
              },
              function(errResponse) {
                console.error('Error while fetching Users');
                deferred.reject(errResponse);
              }
          );
      return deferred.promise;
    };
  }
})()