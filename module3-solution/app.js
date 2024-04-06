(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
      .controller('NarrowItDownController', NarrowItDownController)
      .service('MenuSearchService', MenuSearchService)
      .directive('foundItems', FoundItemsDirective)
      .constant('ApiBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json');

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
      var narrowCtrl = this;
      narrowCtrl.searchTerm = '';
      narrowCtrl.found = [];
      narrowCtrl.isClickButton = false;

      narrowCtrl.getMatchedMenuItems = function () {
          if (narrowCtrl.searchTerm.trim() === '') {
              narrowCtrl.found = [];
              narrowCtrl.isClickButton = true;
              return;
          }
          MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm)
              .then(function (foundItems) {
                narrowCtrl.isClickButton = true;
                narrowCtrl.found = foundItems;
              })
              .catch(function (error) {
                  console.log('Error retrieving data:', error);
              });
      };

      narrowCtrl.removeItem = function (index) {
          narrowCtrl.found.splice(index, 1);
          narrowCtrl.isClickButton = false;
      };
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
      var service = this;

      service.getMatchedMenuItems = function (searchTerm) {
          return $http({
              method: 'GET',
              url: ApiBasePath
          })
          .then(function (response) {
              var foundItems = [];
              var responseData = response.data;

              for (var key in responseData) {
                  if (responseData.hasOwnProperty(key)) {
                      var menuItems = responseData[key].menu_items;

                      menuItems.forEach(function (menuItem) {
                          if (menuItem.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                              foundItems.push(menuItem);
                          }
                      });
                  }
              }
              return foundItems;
          })
          .catch(function (error) {
              console.log('Error retrieving data:', error);
              return [];
          });
      };
  }

  function FoundItemsDirective() {
      var ddo = {
          restrict: "E",
          templateUrl: 'foundItems.html',
          scope: {
              foundItems: '<',
              onRemove: '&'
          }
      };
      return ddo;
  }

})();
