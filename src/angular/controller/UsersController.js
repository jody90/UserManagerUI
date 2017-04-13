myApp.controller('UsersController', ['$scope', '$rootScope', '$q', 'UserService', 'ModalService',
function($scope, $rootScope, $q, UsersService, ModalService, UserModel) {

        $scope.users = null;

        var userService = new UsersService();

        userService.getUsers()
        .then(function(users) {
            $scope.users = users;
        })
        .catch(function(usersResponse) {
            console.error("usersResponse: ", usersResponse);
        })

        $scope.openUserEditModal = function(username) {

            if (username === 'superadmin') {
                showNotification("Der Benutzer [superadmin] kann nicht editiert werden", "error", undefined, 2000);
                return false;
            }

            ModalService.showModal({
                templateUrl: "/src/templates/_modalUserEdit.html",
                controller: 'ModalUserEditController',
                inputs: {
                    username : username
                }
            })
            .then(function(modal) {
                modal.element.modal();
                modal.close.then(function(closeParams) {
                    if (closeParams.oldUser === undefined) {
                        $scope.users.push(closeParams.user)
                    }
                    else {
                        for (var i = 0; i < $scope.users.length; i++) {
                            if ($scope.users[i].username === closeParams.oldUser) {
                                $scope.users.splice(i, 1);
                                $scope.users.push(closeParams.user);
                            }
                        }
                    }
                })
            });
        };

        $scope.openUserDeleteModal = function(username) {

            if (username === 'superadmin') {
                showNotification("Der Benutzer [superadmin] kann nicht gelöscht werden", "error", undefined, 2000);
                return false;
            }

            ModalService.showModal({
                templateUrl: "/src/templates/_modalUserDelete.html",
                controller: 'ModalUserDeleteController',
                inputs: {
                    username : username
                }
            })
            .then(function(modal) {
                modal.element.modal();
                modal.close.then(function(username) {

                    // User loeschen und aktuelle Liste der User holen
                    userService.deleteUser(username)
                    .then(function(response) {
                        for (var i = 0; i < $scope.users.length; i++) {
                            if ($scope.users[i].username === username) {
                                $scope.users.splice(i, 1);
                                break;
                            }
                        }
                        showNotification("Der Benutzer [" + username + "] wurde erfolgreich gelöscht.", "success", undefined, 2000);
                    })

                });
            });
        };

    }]);
