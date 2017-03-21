myApp.factory('LoginService', ['MyException', '$http', function(MyException, $http) {

    function LoginService() {};

    LoginService.prototype.login = function(loginModel) {

        console.log("LoginService LoginModel", loginModel);

        $http({
            method: 'POST',
            url: 'http://localhost:8080/api/auth',
            headers: {
                'Content-Type': 'application/json'
            },
            data: loginModel
        }).then(function successCallback(response) {
            console.log(response);
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            console.error(response.data);
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });

    }

    return LoginService;

}]);
