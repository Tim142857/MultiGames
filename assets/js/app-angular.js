'use strict';


/**
 * Déclaration de l'application demoApp
 */
var demoApp = angular.module('demoApp', [
  // Dépendances du "module"
  'todoList',
  'pendu',
  'nav',
  'bj',
  'chat',
  'arrows'
]);

/**
 * Déclaration du module todoList
 */
var nav = angular.module('nav', []);
/**
 * Contrôleur de l'application "Todo List" décrite dans le chapitre "La logique d'AngularJS".
 */
nav.controller('navCtrl', ['$scope',
  function ($scope) {
    $scope.page = 'accueil';
  }
]);





