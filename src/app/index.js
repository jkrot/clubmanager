'use strict';

angular.module('clubmanager', ['ngTouch', 'ngSanitize', 'ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
            initializeData: function($q, $timeout, dataService) {
                return dataService.promiseToHaveData();
            }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .service('dataService', function($http, $q) {
    var _this = this;

    this.promiseToHaveData = function() {
        var defer = $q.defer();

        $http.get('/assets/json/sample-data.json')
            .success(function(data) {
                angular.extend(_this, data);
                defer.resolve();
            })
            .error(function() {
                defer.reject('could not find sample-data.json');
            });

        return defer.promise;
    };
  }).filter('toArray', function () {
  return function (obj, addKey) {
    if (!obj) return obj;
    if ( addKey === false ) {
      return Object.keys(obj).map(function(key) {
        return obj[key];
      });
    } else {
      return Object.keys(obj).map(function (key) {
        return Object.defineProperty(obj[key], '$key', { enumerable: false, value: key});
      });
    }
  };
}).filter('searchName', function () {
  return function (array, query) {
      var data = [];
      if(typeof query === 'string' ){
        array.forEach(function(element){
          if (element.first_name != undefined && element.last_name != undefined ){
            if (element.first_name.indexOf(query) > -1 || element.last_name.indexOf(query) > -1){
              data.push(element);
            }
          }
        });
        return data;
      }else{
        return array;
      }
    };
});

WebFont.load({
    google: {
      families: ['Oswald']
    }
  });