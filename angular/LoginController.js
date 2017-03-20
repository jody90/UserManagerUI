myApp.controller('LoginController', ['$scope', 'LoginModel', 'LoginService', function($scope, LoginModel, LoginService) {

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

            // Nur Request starten wenn Username und Passwort nicht leer sind
            // if (!$scope.usernameEmpty && !$scope.passwordEmpty) {
                var loginService = new LoginService();
                loginService.login($scope.loginModel);
            // }

        }
    };

}]);
