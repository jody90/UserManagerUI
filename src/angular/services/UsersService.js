myApp.factory('UsersService', ['MyException', '$q', '$http', '$rootScope', 'UserModel', function(MyException, $q, $http, $rootScope, UserModel) {

    function UsersService() {}

    UsersService.prototype.getUsers = function() {

        var defer = $q.defer();

        $http({
            method: 'GET',
            url: 'http://localhost:8080/api/user',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.token.value
            }
        })
        .then(function successCallback(response) {
            var tmpUsers = response.data;
            var users = [];
            for (var i = 0; i < tmpUsers.length; i++) {
                var userModel = new UserModel(tmpUsers[i].username, tmpUsers[i].firstname, tmpUsers[i].lastname, tmpUsers[i].email, tmpUsers[i].authorities, tmpUsers[i].rights, tmpUsers[i].roles);
                users.push(userModel);
            }
            defer.resolve(users);
        }, function errorCallback(response) {
            defer.reject(response);
        });

        return defer.promise;
    }

    UsersService.prototype.deleteUser = function(username) {

        var defer = $q.defer();

        $http({
            method: 'DELETE',
            url: 'http://localhost:8080/api/user/' + username,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.token.value
            }
        })
        .then(function successCallback(response) {
            console.log("DeleteResponse: ", response);
            return defer.resolve(response);
        }, function errorCallback(response) {
            defer.reject(response);
        });

        return defer.promise;
    }

    return UsersService;

}]);
