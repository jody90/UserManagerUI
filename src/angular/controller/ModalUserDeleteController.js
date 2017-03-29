myApp.controller('ModalUserDeleteController', ['$scope', 'close', 'modalUser', function($scope, close, modalUser) {

    $scope.modalUser = modalUser;

    $scope.close = function(result) {
        if (result) {
            result = $scope.modalUser.getUsername();
            close(result, 500); // close, but give 500ms for bootstrap to animate
        }
    };

}]);
