/* Copyright (c) 2017-2018 Software AG, Darmstadt, Germany and/or Software AG USA Inc., Reston, VA, USA, and/or its subsidiaries and/or its affiliates and/or their licensors. 
 * Use, reproduction, transfer, publication or disclosure is prohibited except as specifically provided for in your License Agreement with Software AG. 
 */

(function () {
    var app = angular.module('app');

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/view/:param", {
                templateUrl: "partialView/coverage-table-1.html",
                controller: "treeTable-datarouter"
                //controller: "MainCtrl"
            })
            .otherwise({
                redirectTo: '/view/fullpackageview',
                controller: "treeTable-datarouter"
                //controller: "MainCtrl"
            });
    });

})();//.call(this);