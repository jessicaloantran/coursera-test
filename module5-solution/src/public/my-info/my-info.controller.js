// my-info.controller.js
(function () {
    "use strict";

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['UserService'];
    function MyInfoController(UserService) {
        var signUpCtrl = this;

        signUpCtrl.userInfo = UserService.getUserInfo();
    }

})();
