(function() {
  'use strict';
  
  angular.module('MenuApp')
    .controller('CategoriesController', CategoriesController)
    .component('categories', {
      templateUrl: 'src/restaurant/templates/categories.template.html',
      controller: CategoriesController
    });

  CategoriesController.$inject = ['MenuDataService'];
  function CategoriesController(MenuDataService) {
    var $ctrl = this;
    
    $ctrl.categories = [];

    MenuDataService.getAllCategories()
      .then(function(response) {
        $ctrl.categories = response.data;
      })
      .catch(function(error) {
        console.log('Error fetching categories:', error);
      });
  }
})();
