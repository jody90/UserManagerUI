myApp.controller('PasswordController', [
    '$scope',
    '$rootScope',
    '$q',
    'UserService',
    function($scope, $rootScope, $q, UserService) {

    $scope.loginModel = new LoginModel();

    function inIframe () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    $scope.eventListeners = {
        submitLogin : function(loginData) {

            $scope.usernameEmpty = false;
            $scope.passwordEmpty = false;

            // loginModel mit Eingaben befuellen
            try {
                $scope.loginModel.setUsername(loginData.username);
            } catch (e) {
                showNotification("Feld Benutzername ist leer!", "warning", undefined, 2000);
                $scope.usernameEmpty = true;
            }
            try {
                $scope.loginModel.setPassword(loginData.password);
            } catch (e) {
                showNotification("Feld Passwort ist leer!", "warning", undefined, 2000);
                $scope.passwordEmpty = true;
            }

            // Nur Request starten wenn Username und Passwort nicht leer sind
            if (!$scope.usernameEmpty && !$scope.passwordEmpty) {

                var loginService = new LoginService();

                // Login request stellen
                loginService.login($scope.loginModel)
                // Login erfolgreich
                .then(function(loginResponse) {

                    // Cookie mit Token setzen
                    var cookieService = new CookieService();
                    cookieService.setTokenCookie(loginResponse.data.token, $scope.loginModel.username);

                    $rootScope.token = cookieService.getTokenCookie("token");

                    // Pruefen ob User in rootScope und tokenCookie vorhanden
                    if ($rootScope.token != null && $rootScope.token.username != null) {

                        // UserDetails von REST Schnittstelle anfragen
                        var userService = new UserService();
                        userService.getUser($rootScope.token.username)
                        .then(function(userModel) {
                            $rootScope.user = userModel;
                            if (inIframe()) {
                                window.top.location.href = "http://localhost:8090/sortimo/index";
                            }
                            else {
                                $location.path("/");
                            }
                        })
                        .catch(function(getUserResponse) {
                            showNotification("Bei der Useranfrage lief was schief. Call an Admin!", "error", "Backend Request");
                        });
                    }
                    else {
                        showNotification("Token ist leer, bitte erneut versuchen.", "error", "Token");
                        console.info("token ist leer, erneut versuchen");
                        $location.path("/login");
                    }

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
                        case -1 :
                            showNotification("REST Service ist nicht erreichbar! Admin Benachrichtigen!", "error", "Backend");
                        break;
                    }
                })

            }

        }
    };

}]);
