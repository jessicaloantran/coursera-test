(function () {
  'use strict';

  angular.module('common')
      .service('MenuService', MenuService);

  MenuService.$inject = ['$http', 'ApiPath'];
  function MenuService($http, ApiPath) {
      var service = this;

      service.getCategories = function () {
          return $http.get(ApiPath + '/categories.json').then(function (response) {
              return response.data;
          });
      };

      service.getMenuItems = function (category) {
          return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
              return response.data;
          });
      };

      
      service.getMenuItem = function (favoriteDish) {
          var categoryShortName = favoriteDish && favoriteDish.length > 1 ? favoriteDish.charAt(0) : favoriteDish;

          return $http.get(ApiPath + '/menu_items/' + categoryShortName + '.json').then(function (response) {
            
            if (response.data){
              var menuItems = response.data.menu_items;
              
              var menuItem = menuItems.find(function (item) {
                  return item.short_name === favoriteDish;
              });
              return menuItem;
            }
            else
            {
              return null
            }
          });
      };
  }
})();
