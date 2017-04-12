myApp.controller('ModalUserEditController', ['$scope', '$q', 'username', 'UserService', 'RightService', 'RoleService',
function($scope, $q, username, UserService, RightService, RoleService) {

    var userService = new UserService();
    var roleService = new RoleService();
    var rightService = new RightService();

    $scope.user = null;
    $scope.possibleRoles = null;
    $scope.possibleRights = null;

    var buildNewUser = function() {
        var newUser = {
            rights: [],
            roles: []
        };
        return newUser;
    }

    // REST Schnittstelle nach allen notwendigen Daten anfragen
    var getScopeData = function(username) {
        if (username == null) {
            return $q.all([buildNewUser(), roleService.getRoles(), rightService.getRights()])
        }
        else {
            return $q.all([userService.getUser(username), roleService.getRoles(), rightService.getRights()])
        }
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
        if (roles != null) {
            for (var i = 0; i < roles.length; i++) {
                if (userRoles == null || !idInArray(userRoles, roles[i].id)) {
                    tRolesList.push(roles[i]);
                }
            }
        }

        return $q.resolve(tRolesList);
    }

    var addScopeRights = function(userRights, rights) {

        var tRightsList = [];

        // herrausfinden welche Rechte der Benutzer bereits hat
        if (rights != null) {
            for (var i = 0; i < rights.length; i++) {
                if (userRights == null || !idInArray(userRights, rights[i].id)) {
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

    var findAndRemoveFromScopeAddToUser = function(scopeVariable, type, needle) {
        for (var i = 0; i < $scope[scopeVariable].length; i++) {
            if ($scope[scopeVariable][i].name === needle) {
                $scope.user[type].push($scope[scopeVariable][i]);
                $scope[scopeVariable].splice(i, 1);
                break;
            }
        }
    }

    var findAndRemoveFromUserAddToScope = function(scopeVariable, type, needle) {
        for (var i = 0; i < $scope.user[type].length; i++) {
            if ($scope.user[type][i].name === needle) {
                $scope[scopeVariable].push($scope.user[type][i]);
                $scope.user[type].splice(i, 1);
                break;
            }
        }
    }

    $scope.addRole = function(roleName) {

        if (username != null) {
            userService.addUserRole(username, roleName)
            .then(function(response) {
                findAndRemoveFromScopeAddToUser("possibleRoles", "roles", roleName);
            })
            .catch(function(response) {
                console.log("removeRole Error DATA: ", response);
            });
        }
        else {
            findAndRemoveFromScopeAddToUser("possibleRoles", "roles", roleName);
        }
    }

    $scope.removeRole = function(roleName) {

        if (username != null) {
            userService.removeUserRole(username, roleName)
            .then(function(response) {
                findAndRemoveFromUserAddToScope("possibleRoles", "roles", roleName);
            })
            .catch(function(response) {
                console.log("removeRole Error DATA: ", response);
            });
        }
        else {
            findAndRemoveFromUserAddToScope("possibleRoles", "roles", roleName);

        }
    }

    $scope.addRight = function(rightName) {
        if (username != null) {
            userService.addUserRight(username, rightName)
            .then(function(response) {
                findAndRemoveFromScopeAddToUser("possibleRights", "rights", rightName);
            })
            .catch(function(response) {
                console.log("removeRole Error DATA: ", response);
            });
        }
        else {
            findAndRemoveFromScopeAddToUser("possibleRights", "rights", rightName);
        }
    }

    $scope.removeRight = function(rightName) {

        if (username != null) {
            userService.removeUserRight(username, rightName)
            .then(function(response) {
                findAndRemoveFromUserAddToScope("possibleRights", "rights", rightName);
            })
            .catch(function(response) {
                console.log("removeRole Error DATA: ", response);
            });
        }
        else {
            findAndRemoveFromUserAddToScope("possibleRights", "rights", rightName);
        }
    }

    $scope.close = function(save) {
        if (save) {
            console.log("$scope.user: ", $scope.user);
            userService.addUser($scope.user);
        }
    }

}]);
