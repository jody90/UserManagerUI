myApp.controller('ModalRightDeleteController', ['$scope', 'rightname', 'close', function($scope, rightname, close) {

    $scope.rightname = rightname;

    $scope.deleteRight = function(result) {
        close(rightname, 500); // close, but give 500ms for bootstrap to animate
    };

}]);
