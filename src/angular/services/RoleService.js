myApp.factory('RoleService', ['MyException', '$q', '$http', '$rootScope',
function(MyException, $q, $http, $rootScope) {

    function RoleService() {}

    RoleService.prototype.getRole = function(roleName) {

        var defer = $q.defer();

        $http({
            method: 'GET',
            url: 'http://localhost:51001/api/role/' + roleName,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.token.value
            }
        })
        .then(function successCallback(response) {
            var role = response.data;
            defer.resolve(role);
        }, function errorCallback(response) {
            defer.reject(response);
        });

        return defer.promise;
    }

    RoleService.prototype.getRoles = function() {

        var defer = $q.defer();

        $http({
            method: 'GET',
            url: 'http://localhost:51001/api/role/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.token.value
            }
        })
        .then(function successCallback(response) {
            var roles = response.data;
            defer.resolve(roles);
        }, function errorCallback(response) {
            defer.reject(response);
        });

        return defer.promise;
    }

    RoleService.prototype.deleteRole = function(roleName) {

        var defer = $q.defer();

        $http({
            method: 'DELETE',
            url: 'http://localhost:51001/api/role/' + roleName,
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

    RoleService.prototype.addRoleRight = function(roleName, rightName) {

        var defer = $q.defer();

        $http({
            method: 'PUT',
            url: 'http://localhost:51001/api/role/' + roleName + '/right/' + rightName,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.token.value
            }
        })
        .then(function successCallback(response) {
            defer.resolve(response);
        }, function errorCallback(response) {
            console.log("addRoleRight errorCallback: ", response);
            defer.reject(response);
        });

        return defer.promise;
    }

    RoleService.prototype.removeRoleRight = function(roleName, rightName) {

        var defer = $q.defer();

        $http({
            method: 'DELETE',
            url: 'http://localhost:51001/api/role/' + roleName + '/right/' + rightName,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.token.value
            }
        })
        .then(function successCallback(response) {
            defer.resolve(response);
        }, function errorCallback(response) {
            console.log("removeRoleRight errorCallback: ", response);
            defer.reject(response);
        });

        return defer.promise;
    }

    return RoleService;

}]);
