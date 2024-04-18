(function () {
    'use strict';
  
    angular.module('public')
      .service('UserService', UserService);
  
    function UserService() {
      var service = this;
      var userInfo;
  
      service.saveUserInfo = function (user) {
        userInfo = user;
      };
  
      service.getUserInfo = function () {
        return userInfo;
      };
    }
})();
