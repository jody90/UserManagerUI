var myApp = angular.module('MyApp', ['ngCookies', 'ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "src/templates/options.html",
        controller : "OptionsController"
    })
    .when("/login", {
        templateUrl : "src/templates/login.html",
        controller : "LoginController"
    })
    .otherwise({redirectTo: "/"});
})

// Pruefen ob User angemeldet ist
myApp.run(function($rootScope, $location, CookieService) {

    var cookieService = new CookieService();

    // bei jedem routeChangeStart ausfuehren
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {

        var token = cookieService.getTokenCookie();

        // console.log("$rootScope.user: ", $rootScope.user);

        // Pruefen ob User Object und Token vorhanden sind
        if ($rootScope.user != null) {
            // console.log("next: ", next);
        }
        else if ($rootScope.user == null && token != null && token.username != null && token.value != null) {
            console.log("User Object mithilfe von Token anfragen");
        }
        else {
            // Pruefen ob Ziel-URL login ist wenn nicht automatisch zu Login umleiten
            if (next.templateUrl !== "src/templates/login.html") {
                $location.path("/login");
            }
        }
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
