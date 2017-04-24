/**
 * App.js
 * Entry point for angular JS application.
 * Specifies application configurations and states.
 */
angular.module('trudaktari', ['ionic', 'starter.controllers', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html',
          controller: 'SearchController'
        }
      }
    })

    .state('app.searchresults', {
      url: '/search/:t/:q',
      views: {
        'menuContent': {
          templateUrl: 'templates/search_results.html',
          controller: 'SearchController'
        }
      }
    })

    .state('app.practitioner', {
      url: '/practitioner/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/doctor.html',
          controller: 'DoctorController'
        }
      }
    })

    .state('app.facility', {
      url: '/facility/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/facility.html',
          controller: 'FacilityController'
        }
      }
    })

    .state('app.report', {
      url: '/report/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/report.html',
          controller: 'ReportController'
        }
      }
    })

    .state('app.rate', {
      url: '/rate/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/rate.html',
          controller: 'RateController'
        }
      }
    })

    .state('app.map', {
        url: '/map',
        views: {
          'menuContent': {
            templateUrl: 'templates/map.html',
            controller: 'MapController'
          }
        }
      })

    .state('app.info', {
      url: '/info',
      views: {
        'menuContent': {
          templateUrl: 'templates/info.html',
          controller: 'InfoController'
        }
      }
    })

    .state('app.single', {
      url: '/info/:title',
      views: {
        'menuContent': {
          templateUrl: 'templates/info_item.html',
          controller: 'InfoItemController'
        }
      }
    })

    .state('app.help', {
      url: '/help',
      views: {
        'menuContent': {
          templateUrl: 'templates/help.html',
          controller: 'HelpController'
        }
      }
    })

    .state('app.about', {
      url: '/about',
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html',
          controller: 'AboutController'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');
});
