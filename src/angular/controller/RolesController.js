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

        $scope.openRoleEditModal = function(rolename) {

            if (rolename === 'superadmin') {
                showNotification("Die Rolle [superadmin] kann nicht editiert werden", "error", undefined, 2000);
                return false;
            }

            ModalService.showModal({
                templateUrl: "/src/templates/_modalRoleEdit.html",
                controller: 'ModalRoleEditController',
                inputs: {
                    rolename : rolename
                }
            })
            .then(function(modal) {
                modal.element.modal();
                modal.close.then(function(closeParams) {
                    if (closeParams.oldRole === undefined) {
                        $scope.roles.push(closeParams.role)
                    }
                    else {
                        for (var i = 0; i < $scope.roles.length; i++) {
                            if ($scope.roles[i].name === closeParams.oldRole) {
                                $scope.roles.splice(i, 1);
                                $scope.roles.push(closeParams.role);
                            }
                        }
                    }
                })
            });
        };

        $scope.openRoleDeleteModal = function(rolename) {

            if (rolename === 'superadmin') {
                showNotification("Die Rolle [superadmin] kann nicht gelöscht werden", "error", undefined, 2000);
                return false;
            }

            ModalService.showModal({
                templateUrl: "/src/templates/_modalRoleDelete.html",
                controller: 'ModalRoleDeleteController',
                inputs: {
                    rolename : rolename
                }
            })
            .then(function(modal) {
                modal.element.modal();
                modal.close.then(function(rolename) {
                    roleService.deleteRole(rolename)
                    .then(function() {
                        for (var i = 0; i < $scope.roles.length; i++) {
                            if ($scope.roles[i].name === rolename) {
                                $scope.roles.splice(i, 1);
                                break;
                            }
                        }
                        showNotification("Die Rolle [" + rolename + "] wurde erfolgreich gelöscht.", "success", undefined, 2000);
                    })
                })
            });
        };

    }]);
