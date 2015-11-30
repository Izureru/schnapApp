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
      .when('/main', {
          templateUrl : 'main.html',
          controller  : 'MainCtrl'
      })
      .when('/coverflowPage', {
          templateUrl : 'coverflowPage.html',
          controller  : 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/main'
      });
  });