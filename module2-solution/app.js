(function () {
    'use strict';
  
    angular.module('ShoppingListCheckOff', [])
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController);
  
    function ShoppingListCheckOffService() {
      var service = this;
  
      var toBuyItems = [
        { name: "cookies", quantity: 10 },
        { name: "apples", quantity: 5 },
        { name: "bananas", quantity: 8 },
        { name: "milk", quantity: 2 },
        { name: "bread", quantity: 1 }
      ];
  
      var boughtItems = [];
  
      service.getToBuyItems = function () {
        return toBuyItems;
      };
  
      service.getBoughtItems = function () {
        return boughtItems;
      };
  
      service.buyItem = function (index) {
        var item = toBuyItems.splice(index, 1)[0];
        boughtItems.push(item);
      };
    }
  
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      var toBuyCtrl = this;
  
      toBuyCtrl.toBuyList = ShoppingListCheckOffService.getToBuyItems();
  
      toBuyCtrl.buyItem = function (index) {
        ShoppingListCheckOffService.buyItem(index);
      };
    }
  
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var boughtCtrl = this;
  
      boughtCtrl.boughtList = ShoppingListCheckOffService.getBoughtItems();
    }
  
  })();
  