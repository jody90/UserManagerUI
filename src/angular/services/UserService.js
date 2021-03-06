myApp.factory('UserService', ['MyException', '$q', '$http', '$rootScope', 'UserModel', 'UserPreviewModel',
function(MyException, $q, $http, $rootScope, UserModel, UserPreviewModel) {

    function UserService() {}

    UserService.prototype.addUser = function(user) {

        var defer = $q.defer();

        $http({
            method: 'POST',
            url: 'http://localhost:51001/api/user/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.token.value
            },
            data: user
        })
        .then(function successCallback(response) {
            console.log("PostResponse: ", response);
            return defer.resolve(response);
        }, function errorCallback(response) {
            defer.reject(response);
        });

        return defer.promise;
    }

    UserService.prototype.getUser = function(username) {

        var defer = $q.defer();

        $http({
            method: 'GET',
            url: 'http://localhost:51001/api/user/' + username,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.token.value
            }
        })
        .then(function successCallback(response) {
            var user = response.data;
            // console.log("user: ", user);
            defer.resolve(user);
        }, function errorCallback(response) {
            defer.reject(response);
        });

        return defer.promise;
    }

    UserService.prototype.getUsers = function() {

        var defer = $q.defer();

        $http({
            method: 'GET',
            url: 'http://localhost:51001/api/user',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.token.value
            }
        })
        .then(function successCallback(response) {
            var users = response.data;
            // console.log("users: ", users);
            defer.resolve(users);
        }, function errorCallback(response) {
            defer.reject(response);
        });

        return defer.promise;
    }

    UserService.prototype.deleteUser = function(username) {

        var defer = $q.defer();

        $http({
            method: 'DELETE',
            url: 'http://localhost:51001/api/user/' + username,
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

    UserService.prototype.updateUser = function(user, username) {

        var defer = $q.defer();

        $http({
            method: 'PUT',
            url: 'http://localhost:51001/api/user/' + username,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.token.value
            },
            data : user
        })
        .then(function successCallback(response) {
            defer.resolve(response);
        }, function errorCallback(response) {
            console.log("updateUser errorCallback: ", response);
            defer.reject(response);
        });

        return defer.promise;
    }

    return UserService;

}]);
