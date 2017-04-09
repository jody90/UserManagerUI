myApp.controller('ModalUserEditController', ['$scope', '$q', 'close', 'username', 'UserService', 'RightService', 'RoleService',
function($scope, $q, close, username, UserService, RightService, RoleService) {

    var userService = new UserService();
    var roleService = new RoleService();
    var rightService = new RightService();

    // REST Schnittstelle nach allen notwendigen Daten anfragen
    var getScopeData = function(username) {
        return $q.all([userService.getUser(username), roleService.getRoles(), rightService.getRights()])
    }

    // Hilfsfunktion: findet raus ob eine id(needle) im haystack vorhanden ist
    var idInArray = function(haystack, needle) {
        console.log("haystack: ", haystack);
        console.log("needle: ", needle);
        for (var i = 0; i < haystack.length; i++) {

            // console.log(haystack[i].id + " : " + needle);
            // console.log(haystack[i].id == needle);
            return haystack[i].name == needle;
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

        console.log("user.roles: ", user.roles);

        // herrausfinden welche Rollen der Benutzer bereits hat
        if (user.roles != null && roles != null) {
            for (var i = 0; i < roles.length; i++) {
                if (!idInArray(user.roles, roles[i].name)) {
                    console.log("role: ", roles[i]);
                    tRolesList.push(roles[i]);
                }
            }
        }

        // herrausfinden welche Rechte der Benutzer bereits hat
        // if (user.rights != null && rights != null) {
        //     for (var i = 0; i < rights.length; i++) {
        //         if (!idInArray(user.rights, rights[i].id)) {
        //             tRightsList.push(rights[i]);
        //         }
        //     }
        // }

        $scope.user = user;
        $scope.possibleRoles = tRolesList;
        $scope.possibleRights = tRightsList;

        return $q.all([user, tRolesList, tRightsList]);

    });

    $scope.addRole = function(roleName) {
        userService.addUserRole(username, roleName)
        .then(function(response) {
            console.log("addUserRole DATA: ", response);
            for (var i = 0; i < $scope.roles.length; i++) {
                if ($scope.roles[i].name === roleName) {
                    delete $scope.roles[i];
                    break;
                }
            }

            for (var i = 0; i < $scope.roles.length; i++) {
                if ($scope.roles[i].name === roleName) {
                    $scope.user.roles.push($scope.roles[i]);
                    break;
                }
            }
        })
        .catch(function(response) {
            console.log("addUserRole Error DATA: ", response.data);
        });
    }

    $scope.close = function(result) {
        if (result) {
            result = $scope.modalUser;
            close(result, 500); // close, but give 500ms for bootstrap to animate
        }
    };

}]);
