myApp.controller('ModalRightDeleteController', ['$scope', 'rightName', 'close', function($scope, rightName, close) {

    $scope.rightName = rightName;

    $scope.deleteRight = function(result) {
        close(rightName, 500); // close, but give 500ms for bootstrap to animate
    };

}]);
