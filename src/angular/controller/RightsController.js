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

        $scope.openRightEditModal = function(rightname) {

            ModalService.showModal({
                templateUrl: "/src/templates/_modalRightEdit.html",
                controller: 'ModalRightEditController',
                inputs: {
                    rightname : rightname
                }
            })
            .then(function(modal) {
                modal.element.modal();
                modal.close.then(function(closeParams) {
                    if (closeParams.oldRight === undefined) {
                        $scope.rights.push(closeParams.right)
                    }
                    else {
                        for (var i = 0; i < $scope.rights.length; i++) {
                            if ($scope.rights[i].name === closeParams.oldRight) {
                                $scope.rights.splice(i, 1);
                                $scope.rights.push(closeParams.right);
                            }
                        }
                    }
                })
            });
        };

        $scope.openRightDeleteModal = function(rightname) {

            ModalService.showModal({
                templateUrl: "/src/templates/_modalRightDelete.html",
                controller: 'ModalRightDeleteController',
                inputs: {
                    rightname : rightname
                }
            })
            .then(function(modal) {
                modal.element.modal();
                modal.close.then(function(rightname) {
                    rightService.deleteRight(rightname)
                    .then(function() {
                        for (var i = 0; i < $scope.rights.length; i++) {
                            if ($scope.rights[i].name === rightname) {
                                $scope.rights.splice(i, 1);
                                break;
                            }
                        }
                        showNotification("Das Recht [" + rightname + "] wurde erfolgreich gelöscht.", "success", undefined, 2000);
                    })
                })
            });
        };

    }]);
