myApp.controller('LoginController', ['$scope', '$q', 'LoginModel', 'LoginService', 'CookieService', function($scope, $q, LoginModel, LoginService, CookieService) {

    $scope.loginModel = new LoginModel();

    $scope.eventListeners = {
        submitLogin : function(loginData) {

            $scope.usernameEmpty = false;
            $scope.passwordEmpty = false;

            try {
                $scope.loginModel.setUsername(loginData.username);
            } catch (e) {
                $scope.usernameEmpty = true;
            }
            try {
                $scope.loginModel.setPassword(loginData.password);
            } catch (e) {
                $scope.passwordEmpty = true;
            }

            var cookieService = new CookieService();
            cookieService.setTokenCookie("TokenXYZ");

            // Nur Request starten wenn Username und Passwort nicht leer sind
            if (!$scope.usernameEmpty && !$scope.passwordEmpty) {

                var loginService = new LoginService();

                // Login request stellen
                loginService.login($scope.loginModel)
                // Login erfolgreich
                .then(function(loginResponse) {
                    var cookieService = new CookieService();
                    cookieService.setTokenCookie(loginResponse.data.token);
                })
                // Login fehlgeschlagen
                .catch(function(loginResponse) {
                    switch (loginResponse.status) {
                        case 404 :
                            console.error("User does not exists");
                        break;
                        case 403 :
                            console.error("User has bad credentials");
                        break;
                    }
                })

            }

        }
    };

}]);
