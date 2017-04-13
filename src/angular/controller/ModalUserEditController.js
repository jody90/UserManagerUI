myApp.controller('ModalUserEditController', ['$scope', '$q', 'close', 'username', 'UserService', 'RightService', 'RoleService',
function($scope, $q, close, username, UserService, RightService, RoleService) {

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

    $scope.addRemoveRolesRights = function(scopeVariable, type, needle, addRemove) {
        if (addRemove) {
            for (var i = 0; i < $scope[scopeVariable].length; i++) {
                if ($scope[scopeVariable][i].name === needle) {
                    $scope.user[type].push($scope[scopeVariable][i]);
                    $scope[scopeVariable].splice(i, 1);
                    break;
                }
            }
        }
        else {
            for (var i = 0; i < $scope.user[type].length; i++) {
                if ($scope.user[type][i].name === needle) {
                    $scope[scopeVariable].push($scope.user[type][i]);
                    $scope.user[type].splice(i, 1);
                    break;
                }
            }
        }
    }

    var notNull = function(data, type) {

        if (data == null) {
            showNotification(type + ": ist leer!", "error", "Fehler", 2000);
            return false;
        }

        if (data.trim() == "") {
            showNotification(type + ": ist leer!", "error", "Fehler", 2000);
            return false;
        }

        return true;

    }

    $scope.save = function() {

        if (notNull($scope.user.username, "Benutzername") && notNull($scope.user.firstname, "Vorname") && notNull($scope.user.lastname, "Nachname") && notNull($scope.user.email, "Email")) {
            if (username == null) {
                userService.addUser($scope.user)
                .then(function(response) {
                    var tUser = response.data;
                    var closeParams = {
                        oldUser : undefined,
                        user : tUser
                    }
                    showNotification("Der Benutzer [" + tUser.username + "] wurde erfolgreich angelegt.", "success", "Neuer Benutzer", 4000);
                    close(closeParams);
                })
                .catch(function(response) {
                    console.error("UserNew ERROR: ", response);
                });
            }
            else {
                userService.updateUser($scope.user, username)
                .then(function(response) {
                    var tUser = response.data
                    var tUsername = tUser.username === username ? undefined : username;
                    var closeParams = {
                        oldUser : tUsername,
                        user : tUser
                    }
                    showNotification("Der Benutzer [" + tUser.username + "] wurde erfolgreich aktualisiert.", "success", "Benutzer aktualisiert", 4000);
                    close(closeParams, 200);
                })
                .catch(function(response) {
                    console.error("UserNew ERROR: ", response);
                });
            }
        }
    }

}]);
