myApp.controller('UsersController', [
    '$scope',
    '$rootScope',
    '$q',
    'UsersService',
    'ModalService',
    function($scope, $rootScope, $q, UsersService, ModalService, UserModel) {

        $scope.users = null;

        var usersService = new UsersService();

        usersService.getUsers()
        .then(function(users) {
            $scope.users = users;
        })
        .catch(function(usersResponse) {
            console.error("usersResponse: ", usersResponse);
        })

        $scope.openUserEditModal = function(user) {
            ModalService.showModal({
                templateUrl: "/src/templates/_modalUserEdit.html",
                controller: 'ModalUserEditController',
                inputs: {
                    modalUser : user
                }
            })
            .then(function(modal) {
                modal.element.modal();
                modal.close.then(function(result) {
                    console.log(result);
                    if (result) {
                        console.log("ja");
                        // usersService.deleteUser(username);
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
                        usersService.deleteUser(deleteUser)
                        .then(function(response) {
                            usersService.getUsers()
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
