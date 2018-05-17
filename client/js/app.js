var app = angular.module('rokk3r-app', ['ui.router','ngSanitize']);


app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('/', {
            url: '/',
            templateUrl: '/views/search.html'

        })
}]);

app.controller('SearchCtrl', ['$scope','$http', function ($scope, $http) {
    console.log("controller Loading");
    $scope.searchBrandsColths=function () {
        $scope.result="";
        $http({
            url: '/search-brands-cloths/'+$scope.search,
            method: "get"
        }).then(function (response) {
            if(response.data.status){
                $scope.result=response.data.data;
            }else{
                $scope.result=response.data.err;
            }
        });
    }
}]);

