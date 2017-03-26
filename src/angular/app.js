var myApp = angular.module('MyApp', ['ngCookies', 'ngRoute', 'angularModalService']);

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
    .when("/users", {
        templateUrl : "src/templates/users.html",
        controller : "UsersController"
    })
    .when("/rights", {
        templateUrl : "src/templates/rights.html",
        controller : "RightsController"
    })
    .when("/roles", {
        templateUrl : "src/templates/roles.html",
        controller : "RolesController"
    })
    .when("/password", {
        templateUrl : "src/templates/password.html",
        controller : "PasswordController"
    })
    .otherwise({redirectTo: "/"});
})

// Pruefen ob User angemeldet ist
myApp.run(function($rootScope, $location, CookieService, UserService) {

    var cookieService = new CookieService();

    // bei jedem routeChangeStart ausfuehren
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {

        if ($rootScope.token == null) {
            $rootScope.token = cookieService.getTokenCookie();
        }

        // console.info("$rootScope.user: ", $rootScope.user);
        // console.info("$rootScope.token: ", $rootScope.token);

        // Pruefen ob User Object und Token vorhanden sind
        if ($rootScope.user != null) {
        }
        else if ($rootScope.user == null && $rootScope.token != null && $rootScope.token.username != null && $rootScope.token.value != null) {

            // console.info("User Object mithilfe von Token anfragen");

            // UserDetails von REST Schnittstelle anfragen
            var userService = new UserService();
            userService.getUser($rootScope.token.username, $rootScope.token.value)
            .then(function(userModel) {
                $rootScope.user = userModel;
                $location.path(next.originalPath);
            })
            .catch(function(getUserResponse) {
                showNotification("Bei der Useranfrage lief was schief. Call an Admin!", "error", "Backend Request");
            });

        }
        else {
            // Pruefen ob Ziel-URL login ist wenn nicht automatisch zu Login umleiten
            if (next.templateUrl !== "src/templates/login.html") {
                console.log("Weitergeleitet von Proxy");
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
