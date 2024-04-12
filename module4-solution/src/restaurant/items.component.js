(function() {
  'use strict';
  // Define the items component
    angular.module('MenuApp')
    .controller('ItemsController', ItemsController)
    .component('items', {
      templateUrl: 'src/restaurant/templates/items.template.html',
      bindings: {
        categoryShortName: '<'
      },
      controller: ItemsController
    });

    ItemsController.$inject = ['$stateParams', 'MenuDataService'];
    function ItemsController($stateParams, MenuDataService) {
      var $ctrl = this;

      $ctrl.items = [];
     
      MenuDataService.getItemsForCategory($stateParams.categoryShortName)
        .then(function(response) {
          $ctrl.items = response.data;
          $ctrl.categoryShortName = $stateParams.categoryShortName;
        })
        .catch(function(error) {
          console.log('Error fetching items for category:', error);
        });
    }

})();