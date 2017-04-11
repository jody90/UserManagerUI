myApp.controller('ModalUserDeleteController', ['$scope', 'close', 'username', function($scope, close, username) {

    $scope.username = username;

    $scope.deleteUser = function(result) {
        close(username, 500); // close, but give 500ms for bootstrap to animate
    };

}]);
