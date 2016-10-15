/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module("RouteDemo", ["ngRoute"]);

var users = [];
app.controller("UserController", ["$http", "$routeParams", function ($http, $routeParams) {
    var self = this;
    self.userId = $routeParams;
    if (users.length === 0) {
        $http.get("data/data.json").success(function (data) {
            users = data.users;
            self.users = users;
        })
    } else { //We used the cache property on the http request instead
        self.users = users;
    }
    if (users != null) {
        console.log("Adding user: " + $routeParams.first)
        self.user = users[$routeParams.first];
    }
}]);

app.config(function ($routeProvider) {
    $routeProvider
            .when("/", {
                templateUrl: 'allUsers.html',
                controller: "UserController as ctrl"
            })
            .when("/details/:first", {
                templateUrl: "userDetails.html",
                controller: "UserController as ctrl"
            });
});

