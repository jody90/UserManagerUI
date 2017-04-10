myApp.controller('ModalUserEditController', ['$scope', '$q', 'close', 'username', 'UserService', 'RightService', 'RoleService',
function($scope, $q, close, username, UserService, RightService, RoleService) {

    var userService = new UserService();
    var roleService = new RoleService();
    var rightService = new RightService();

    $scope.user = null;
    $scope.possibleRoles = null;
    $scope.possibleRights = null;

    // REST Schnittstelle nach allen notwendigen Daten anfragen
    var getScopeData = function(username) {
        return $q.all([userService.getUser(username), roleService.getRoles(), rightService.getRights()])
    }

    // Hilfsfunktion: findet raus ob eine id(needle) im haystack vorhanden ist
    var idInArray = function(haystack, needle) {
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i].id === needle) {
                return true;
            }
        }
        return false;
    }

    var addScopeRoles = function(userRoles, roles) {

        var tRolesList = [];

        // herrausfinden welche Rollen der Benutzer bereits hat
        if (userRoles != null && roles != null) {
            for (var i = 0; i < roles.length; i++) {
                if (!idInArray(userRoles, roles[i].id)) {
                    tRolesList.push(roles[i]);
                }
            }
        }

        return $q.resolve(tRolesList);
    }

    var addScopeRights = function(userRights, rights) {

        var tRightsList = [];

        // herrausfinden welche Rechte der Benutzer bereits hat
        if (userRights != null && rights != null) {
            for (var i = 0; i < rights.length; i++) {
                if (!idInArray(userRights, rights[i].id)) {
                    tRightsList.push(rights[i]);
                }
            }
        }

        return $q.resolve(tRightsList);
    }

    // REST Anfrage verarbeiten
    getScopeData(username)
    .then(function(data) {

        var user = data[0];
        var roles = data[1];
        var rights = data[2];

        $q.all([addScopeRoles(user.roles, roles), addScopeRights(user.rights, rights)])
        .then(function(tRolesRights) {
            $scope.possibleRoles = tRolesRights[0];
            $scope.possibleRights = tRolesRights[1];
        })

        $scope.user = user;

    });

    $scope.addRole = function(roleName) {
        // userService.addUserRole(username, roleName)
        // .then(function(response) {

            for (var i = 0; i < $scope.possibleRoles.length; i++) {
                console.log("$scope.possibleRoles[i]: ", $scope.possibleRoles[i]);
                if ($scope.possibleRoles[i].name === roleName) {
                    delete $scope.possibleRoles[i];
                    break;
                }
            }

            for (var i = 0; i < $scope.possibleRoles.length; i++) {
                if ($scope.possibleRoles[i].name === roleName) {
                    $scope.user.roles.push($scope.possibleRoles[i]);
                    break;
                }
            }

        // })
        // .catch(function(response) {
        //     console.log("addUserRole Error DATA: ", response);
        // });
    }

    $scope.removeRole = function(roleName) {
        userService.removeUserRole(username, roleName)
        .then(function(response) {

            for (var i = 0; i < $scope.user.roles.length; i++) {
                if ($scope.user.roles[i].name === roleName) {
                    $scope.possibleRoles.push($scope.user.roles[i]);
                    break;
                }
            }

            for (var i = 0; i < $scope.possibleRoles.length; i++) {
                if ($scope.user.roles[i].name === roleName) {
                    delete $scope.user.roles[i];
                    break;
                }
            }

        })
        .catch(function(response) {
            console.log("removeRole Error DATA: ", response);
        });
    }

    $scope.close = function(result) {
        if (result) {
            result = $scope.modalUser;
            close(result, 500); // close, but give 500ms for bootstrap to animate
        }
    };

}]);
