myApp.controller('ModalRoleDeleteController', ['$scope', 'roleName', 'close', function($scope, roleName, close) {

    $scope.roleName = roleName;

    $scope.deleteRole = function(result) {
        close(roleName, 500); // close, but give 500ms for bootstrap to animate
    };

}]);
