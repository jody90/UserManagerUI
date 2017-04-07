myApp.factory('LoginService', ['MyException', '$http', '$q', function(MyException, $http, $q) {

    function LoginService() {};

    LoginService.prototype.login = function(loginModel) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: 'http://localhost:51001/api/auth',
            headers: {
                'Content-Type': 'application/json'
            },
            data: loginModel
        }).then(function successCallback(response) {
            defer.resolve(response);
            // return response;
        }, function errorCallback(response) {
            defer.reject(response);
            // return response;
        });

        return defer.promise;
    }

    return LoginService;

}]);
