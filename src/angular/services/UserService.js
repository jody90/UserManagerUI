myApp.factory('UserService', ['MyException', '$q', '$http', 'UserModel', function(MyException, $q, $http, UserModel) {

    function UserService() {}

    UserService.prototype.getUser = function(username, token) {

        var defer = $q.defer();

        $http({
            method: 'GET',
            url: 'http://localhost:8080/api/user/' + username,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
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
