myApp.controller('RightsController', ['$scope', '$rootScope', '$q', 'RightService', 'ModalService',
function($scope, $rootScope, $q, RightService, ModalService) {

        var rightService = new RightService();

        rightService.getRights()
        .then(function(rights) {
            $scope.rights = rights;
        })
        .catch(function(rightsResponse) {
            console.error("rightsResponse ERROR: ", rightsResponse);
        })

        $scope.openRightEditModal = function(rightName) {

            ModalService.showModal({
                templateUrl: "/src/templates/_modalRightEdit.html",
                controller: 'ModalRightEditController',
                inputs: {
                    rightName : rightName
                }
            })
            .then(function(modal) {
                modal.element.modal();
            });
        };

        $scope.openRightDeleteModal = function(rightName) {

            ModalService.showModal({
                templateUrl: "/src/templates/_modalRightDelete.html",
                controller: 'ModalRightDeleteController',
                inputs: {
                    rightName : rightName
                }
            })
            .then(function(modal) {
                modal.element.modal();
                modal.close.then(function(rightName) {
                    rightService.deleteRight(rightName)
                    .then(function() {
                        for (var i = 0; i < $scope.rights.length; i++) {
                            if ($scope.rights[i].name === rightName) {
                                $scope.rights.splice(i, 1);
                                break;
                            }
                        }
                        showNotification("Das Recht [" + rightName + "] wurde erfolgreich gelöscht.", "success", undefined, 2000);
                    })
                })
            });
        };

    }]);
