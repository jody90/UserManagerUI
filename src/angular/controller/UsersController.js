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
            ModalService.showModal({
                templateUrl: "/src/templates/_modalUserEdit.html",
                controller: 'ModalUserEditController',
                inputs: {
                    username : username
                }
            })
            .then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    console.log(result);
                    if (result) {
                        console.log("ja");
                        // userService.deleteUser(username);
                    }
                    console.log(result);
                });
            });
        };

        $scope.openUserDeleteModal = function(user) {
            ModalService.showModal({
                templateUrl: "/src/templates/_modalUserDelete.html",
                controller: 'ModalUserDeleteController',
                inputs: {
                    modalUser : user
                }
            })
            .then(function(modal) {
                modal.element.modal();
                modal.close.then(function(deleteUser) {

                    if (deleteUser != null || deleteUser.trim() !== "") {

                        // User loeschen und aktuelle Liste der User holen
                        userService.deleteUser(deleteUser)
                        .then(function(response) {
                            userService.getUsers()
                            .then(function(users) {
                                $scope.users = users;
                            })
                            .catch(function(usersResponse) {
                                console.error("usersResponse: ", usersResponse);
                            })
                        })
                        .catch(function(usersResponse) {
                            console.error("userDeleteResponse: ", usersResponse);
                        })
                    }

                });
            });
        };

    }]);
