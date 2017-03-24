myApp.controller('UsersController', [
    '$scope',
    '$rootScope',
    '$q',
    'UsersService',
    function($scope, $rootScope, $q, UsersService) {

        var usersService = new UsersService();

        usersService.getUsers($rootScope.token.value)
        .then(function(users) {
            $scope.users = users;
            console.log("users: ", users);
        })
        .catch(function(usersResponse) {
            console.error("usersResponse: ", usersResponse);
        })





}]);
