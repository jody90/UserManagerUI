myApp.factory('UsersService', ['MyException', '$q', '$http', 'UserModel', function(MyException, $q, $http, UserModel) {

    function UsersService() {}

    UsersService.prototype.getUsers = function(token) {

        console.log("token", token);

        var defer = $q.defer();

        $http({
            method: 'GET',
            url: 'http://localhost:8080/api/user',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
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

    return UsersService;

}]);
