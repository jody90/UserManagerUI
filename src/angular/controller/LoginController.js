myApp.controller('LoginController', ['$scope', '$rootScope', '$q', 'LoginModel', 'LoginService', 'CookieService', function($scope, $rootScope, $q, LoginModel, LoginService, CookieService) {

    $scope.loginModel = new LoginModel();

    $scope.eventListeners = {
        submitLogin : function(loginData) {

            $scope.usernameEmpty = false;
            $scope.passwordEmpty = false;

            try {
                $scope.loginModel.setUsername(loginData.username);
            } catch (e) {
                showNotification("Feld Benutzername ist leer!", "warning", undefined, 2000);
                $scope.usernameEmpty = true;
            }
            try {
                $scope.loginModel.setPassword(loginData.password);
            } catch (e) {
                showNotification("Feld Passwort ist leer!", "warning", undefined, 9999999);
                $scope.passwordEmpty = true;
            }

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
                            showNotification("Benutzer existiert nicht!", "error", "Benutzer");
                        break;
                        case 403 :
                            showNotification("Passwort ist falsch!", "error", "Passwort");
                        break;
                    }
                })

            }

        }
    };

}]);
