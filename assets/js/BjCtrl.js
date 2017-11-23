var bj = angular.module('bj', []);
bj.controller('bjCtrl', ['$scope',
  function ($scope) {

    $scope.balance = 1000;
    $scope.mise = 0;
    $scope.twoSameCards = false;

  }
]);
