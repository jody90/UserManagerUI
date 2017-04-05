myApp.factory('RoleService', ['MyException', '$q', '$http', '$rootScope',
function(MyException, $q, $http, $rootScope) {

    function RoleService() {}

    RoleService.prototype.getRole = function(roleName) {

        var defer = $q.defer();

        $http({
            method: 'GET',
            url: 'http://localhost:8090/api/role/' + roleName,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.token.value
            }
        })
        .then(function successCallback(response) {
            var role = response.data;
            // console.log("role: ", role);
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
            url: 'http://localhost:8090/api/role/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.token.value
            }
        })
        .then(function successCallback(response) {
            var roles = response.data;
            // console.log("roles: ", roles);
            defer.resolve(roles);
        }, function errorCallback(response) {
            defer.reject(response);
        });

        return defer.promise;
    }

    return RoleService;

}]);
