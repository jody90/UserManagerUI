myApp.controller('ModalUserEditController', ['$scope', '$q', 'close', 'username', 'UserService', 'RightService', 'RoleService',
function($scope, $q, close, username, UserService, RightService, RoleService) {

    var userService = new UserService();
    var roleService = new RoleService();
    var rightService = new RightService();

    // $scope.user = null;
    // $scope.roles = [];
    // $scope.rights = null;

    // REST Schnittstelle nach allen notwendigen Daten anfragen
    var getScopeData = function(username) {
        return $q.all([userService.getUser(username), roleService.getRoles(), rightService.getRights()])
    }

    // Hilfsfunktion: findet raus ob eine id(needle) im haystack vorhanden ist
    var idInArray = function(haystack, needle) {
        for (var i = 0; i < haystack.length; i++) {
            return haystack[i].id == needle;
        }
        return false;
    }

    getScopeData(username)
    .then(function(data) {

        var user = data[0];
        var roles = data[1];
        var rights = data[2];

        var tRolesList = [];
        var tRightsList = [];

        // herrausfinden welche Rollen der Benutzer bereits hat
        if (user.roles != null && roles != null) {
            for (var i = 0; i < roles.length; i++) {
                if (!idInArray(user.roles, roles[i].id)) {
                    tRolesList.push(roles[i]);
                }
            }
        }

        // herrausfinden welche Rechte der Benutzer bereits hat
        if (user.rights != null && rights != null) {
            for (var i = 0; i < rights.length; i++) {
                if (!idInArray(user.rights, rights[i].id)) {
                    tRightsList.push(rights[i]);
                }
            }
        }

        $scope.user = user;
        $scope.roles = tRolesList;
        $scope.rights = tRightsList
        return $q.all([user, tRolesList, tRightsList]);

        console.log("$scope.roles: ", $scope.roles);

    });

    $scope.close = function(result) {
        if (result) {
            result = $scope.modalUser;
            close(result, 500); // close, but give 500ms for bootstrap to animate
        }
    };

}]);
