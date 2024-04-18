(function () {
    'use strict';

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['MenuService', 'UserService'];
    function SignUpController(MenuService, UserService) {
        var $signUpCtrl = this;
        $signUpCtrl.user = {};
        $signUpCtrl.menuNotFound = false;
        $signUpCtrl.signUpSuccess = false;
        $signUpCtrl.callSignUp = false;

        $signUpCtrl.submitSignUpForm = function () {
        MenuService.getMenuItem($signUpCtrl.user.favoriteDish)
            .then(function (response) {
                $signUpCtrl.callSignUp = true;
                if (response) {
                    var categoryShortName = $signUpCtrl.user.favoriteDish && $signUpCtrl.user.favoriteDish.length > 1 ? $signUpCtrl.user.favoriteDish.charAt(0) : $signUpCtrl.user.favoriteDish;

                    $signUpCtrl.user.menuItem = response;
                    $signUpCtrl.user.menuItem.categoryShortName = categoryShortName;
                    UserService.saveUserInfo($signUpCtrl.user);
                    $signUpCtrl.signUpSuccess = true;
                    $signUpCtrl.menuNotFound = false;
                } else {
                    $signUpCtrl.menuNotFound = true;
                    $signUpCtrl.signUpSuccess = false;
                }
            })
            .catch(function (error) {
                $signUpCtrl.menuNotFound = false;
                $signUpCtrl.signUpSuccess = false;
                $signUpCtrl.callSignUp = true;
                console.log('Error fetching menu item:', error);
            });
        };
        $signUpCtrl.offMessage = function (){
            $signUpCtrl.callSignUp = false;
        }
    }
})();

  