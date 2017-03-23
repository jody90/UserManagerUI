var myApp = angular.module('MyApp', ['ngCookies', 'ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "src/templates/login.html",
        controller : "LoginController"
    })
    .when("/options", {
        templateUrl : "src/templates/options.html",
        controller : "OptionsController"
    })
    .when("/red", {
        templateUrl : "src/templates/styleguide.html"
    });
});

myApp.factory("MyException", function() {

    function MyException(name, message, throwingClass) {
        this.name = name;
        this.message = message;
        this.throwingClass = throwingClass;
        this.method = method;
    }

    MyException.prototype = new Error();
    MyException.prototype.constructor = MyException;

    return MyException

})

myApp.constant('config', {
    tokenCookieExipre: 24
});

// myApp.directive('messageDirective', function ($rootScope) {
//
//     return {
//         scope: {
//             messageName: '@',
//             messageTitle: '@',
//             messageBody: '@',
//             messageType: '@'
//         },
//         link: function ($scope, element, attrs) {
//             showNotification($scope.messageBody, $scope.messageType, $scope.messageTitle, $scope.messageName, function(messageName) {
//
//                 delete $rootScope.messages[messageName];
//
//             });
//         } //DOM manipulation
//     }
//
// });
