myApp.factory('RightService', ['MyException', '$q', '$http', '$rootScope', 'RightModel', 'RightModel',
function(MyException, $q, $http, $rootScope, RightModel, RightModel) {

    function RightService() {}

    RightService.prototype.addRight = function(right) {

        var defer = $q.defer();

        $http({
            method: 'POST',
            url: 'http://localhost:51001/api/right/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.token.value
            },
            data: right
        })
        .then(function successCallback(response) {
            console.log("PostResponse: ", response);
            return defer.resolve(response);
        }, function errorCallback(response) {
            defer.reject(response);
        });

        return defer.promise;
    }

    RightService.prototype.getRight = function(rightName) {

        var defer = $q.defer();

        $http({
            method: 'GET',
            url: 'http://localhost:51001/api/right/' + rightName,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.token.value
            }
        })
        .then(function successCallback(response) {
            var right = response.data;
            // console.log("right: ", right);
            defer.resolve(right);
        }, function errorCallback(response) {
            defer.reject(response);
        });

        return defer.promise;
    }

    RightService.prototype.getRights = function() {

        var defer = $q.defer();

        $http({
            method: 'GET',
            url: 'http://localhost:51001/api/right/',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.token.value
            }
        })
        .then(function successCallback(response) {
            var rights = response.data;
            // console.log("rights: ", rights);
            defer.resolve(rights);
        }, function errorCallback(response) {
            defer.reject(response);
        });

        return defer.promise;
    }

    RightService.prototype.deleteRight = function(rightName) {

        var defer = $q.defer();

        $http({
            method: 'DELETE',
            url: 'http://localhost:51001/api/right/' + rightName,
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

    RightService.prototype.updateRight = function(right, rightname) {

        var defer = $q.defer();

        $http({
            method: 'PUT',
            url: 'http://localhost:51001/api/right/' + rightname,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': $rootScope.token.value
            },
            data : right
        })
        .then(function successCallback(response) {
            defer.resolve(response);
        }, function errorCallback(response) {
            console.log("updateRight errorCallback: ", response);
            defer.reject(response);
        });

        return defer.promise;
    }

    return RightService;

}]);
