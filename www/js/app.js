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
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
          templateUrl : 'main.html',
          controller  : 'MainCtrl'
      })
      .when('/flow', {
          templateUrl : 'coverflowPage.html',
          controller  : 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });