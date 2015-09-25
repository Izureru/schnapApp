'use strict';

/**
 * @ngdoc overview
 * @name schnapApp
 * @description
 * # schnapApp
 *
 * Main module of the application.
 */
angular
  .module('schnapApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });