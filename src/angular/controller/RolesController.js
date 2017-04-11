myApp.controller('RolesController', ['$scope', '$rootScope', '$q', 'RoleService', 'ModalService',
function($scope, $rootScope, $q, RoleService, ModalService) {

        var roleService = new RoleService();

        roleService.getRoles()
        .then(function(roles) {
            $scope.roles = roles;
        })
        .catch(function(rolesResponse) {
            console.error("rolesResponse ERROR: ", rolesResponse);
        })

        $scope.openRoleEditModal = function(roleName) {

            if (roleName === 'superadmin') {
                showNotification("Die Rolle [superadmin] kann nicht editiert werden", "error", undefined, 2000);
                return false;
            }

            ModalService.showModal({
                templateUrl: "/src/templates/_modalRoleEdit.html",
                controller: 'ModalRoleEditController',
                inputs: {
                    roleName : roleName
                }
            })
            .then(function(modal) {
                modal.element.modal();
            });
        };

        $scope.openRoleDeleteModal = function(roleName) {

            if (roleName === 'superadmin') {
                showNotification("Die Rolle [superadmin] kann nicht gelöscht werden", "error", undefined, 2000);
                return false;
            }

            ModalService.showModal({
                templateUrl: "/src/templates/_modalRoleDelete.html",
                controller: 'ModalRoleDeleteController',
                inputs: {
                    roleName : roleName
                }
            })
            .then(function(modal) {
                modal.element.modal();
                modal.close.then(function(roleName) {
                    roleService.deleteRole(roleName)
                    .then(function() {
                        for (var i = 0; i < $scope.roles.length; i++) {
                            if ($scope.roles[i].name === roleName) {
                                $scope.roles.splice(i, 1);
                                break;
                            }
                        }
                        showNotification("Die Rolle [" + roleName + "] wurde erfolgreich gelöscht.", "success", undefined, 2000);
                    })
                })
            });
        };

    }]);
