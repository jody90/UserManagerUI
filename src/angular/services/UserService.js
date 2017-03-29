myApp.factory('UserService', ['MyException', '$q', '$http', '$rootScope', 'UserModel', function(MyException, $q, $http, $rootScope, UserModel) {

    function UserService() {}

    UserService.prototype.getUser = function(username) {

        var defer = $q.defer();

        $http({
            method: 'GET',
            url: 'http://localhost:8080/api/user/' + username,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.token.value
            }
        })
        .then(function successCallback(response) {
            var tmpUser = response.data;
            var userModel = new UserModel(tmpUser.username, tmpUser.firstname, tmpUser.lastname, tmpUser.email, tmpUser.authorities, tmpUser.rights, tmpUser.roles);
            defer.resolve(userModel);
        }, function errorCallback(response) {
            defer.reject(response);
        });

        return defer.promise;
    }

    return UserService;

}]);
