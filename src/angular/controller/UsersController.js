myApp.controller('UsersController', [
    '$scope',
    '$rootScope',
    '$q',
    'UsersService',
    'ModalService',
    function($scope, $rootScope, $q, UsersService, ModalService, UserModel) {

        $scope.users = null;

        var usersService = new UsersService();

        usersService.getUsers($rootScope.token.value)
        .then(function(users) {
            $scope.users = users;
        })
        .catch(function(usersResponse) {
            console.error("usersResponse: ", usersResponse);
        })

// var userModel = new UserModel("aa", "aa", ",aa", "asdfasd", "sdaf", "asdf", "asdf");
// var user = new Object();
// user.prototype = new UserModel("aa", "aa", ",aa", "asdfasd", "sdaf", "asdf", "asdf");
        // console.log("UserModel: ", user);

        $scope.openModal = function(user) {
            ModalService.showModal({
                templateUrl: "/src/templates/_modalDelete.html",
                controller: 'ModalDeleteController',
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

    }]);
