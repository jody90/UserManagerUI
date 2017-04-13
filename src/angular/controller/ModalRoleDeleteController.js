myApp.controller('ModalRoleDeleteController', ['$scope', 'rolename', 'close', function($scope, rolename, close) {

    $scope.rolename = rolename;

    $scope.deleteRole = function(result) {
        close(rolename, 500); // close, but give 500ms for bootstrap to animate
    };

}]);
