myApp.controller('ModalDeleteController', ['$scope', 'close', 'modalUser', function($scope, close, modalUser) {

    $scope.modalUser = modalUser;

    $scope.close = function(result) {
        if (result === "delete") {
            result = $scope.modalUser;
        }
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };

}]);
