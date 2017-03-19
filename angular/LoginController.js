myApp.controller('LoginController', ['$scope', 'LoginModel', function($scope, LoginModel) {

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
        }
    };

}]);
