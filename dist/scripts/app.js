(function() {
  function config($stateProvider, $locationProvider) {
    $locationProvider
        .html5Mode({
          enabled: true,
          requireBase: false
        });
    $stateProvider
        .state('lists', {
          url: '/',
          controller: 'ListCtrl as lists',
          templateUrl: '/templates/lists.html'
        });
  }

  angular
      .module('blocitoff', ['ui.router', 'firebase', 'ui.bootstrap', 'ngCookies'])
      .config(config);
})();
