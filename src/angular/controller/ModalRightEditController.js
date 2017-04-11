myApp.controller('ModalRightEditController', ['$scope', '$q', 'rightName', 'RightService',
function($scope, $q, rightName, RightService) {

    var rightService = new RightService();

    // Hilfsfunktion: findet raus ob eine id(needle) im haystack vorhanden ist
    var idInArray = function(haystack, needle) {
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i].id === needle) {
                return true;
            }
        }
        return false;
    }

    // REST Anfrage verarbeiten
    rightService.getRight(rightName)
    .then(function(data) {
        $scope.right = data;
    });

}]);
