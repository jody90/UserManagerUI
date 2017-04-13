myApp.controller('ModalRoleEditController', ['$scope', '$q', 'close', 'rolename', 'RightService', 'RoleService',
function($scope, $q, close, rolename, RightService, RoleService) {

    var roleService = new RoleService();
    var rightService = new RightService();

    $scope.possibleRights = null;

    var buildNewRole = function() {
        var newRole = {
            rights: []
        };
        return newRole;
    }

    // REST Schnittstelle nach allen notwendigen Daten anfragen
    var getScopeData = function(rolename) {
        if (rolename == null) {
            return $q.all([buildNewRole(), rightService.getRights()])
        }
        else {
            return $q.all([roleService.getRole(rolename), rightService.getRights()])
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

    var addScopeRights = function(roleRights, rights) {

        var tRightsList = [];

        // herrausfinden welche Rechte der Benutzer bereits hat
        if (roleRights != null && rights != null) {
            for (var i = 0; i < rights.length; i++) {
                if (!idInArray(roleRights, rights[i].id)) {
                    tRightsList.push(rights[i]);
                }
            }
        }

        return $q.resolve(tRightsList);
    }

    // REST Anfrage verarbeiten
    getScopeData(rolename)
    .then(function(data) {

        var role = data[0];
        var rights = data[1];

        addScopeRights(role.rights, rights)
        .then(function(tRights) {
            $scope.possibleRights = tRights;
        })

        $scope.role = role;

    });

    $scope.addRemoveRolesRights = function(scopeVariable, type, needle, addRemove) {
        if (addRemove) {
            for (var i = 0; i < $scope[scopeVariable].length; i++) {
                if ($scope[scopeVariable][i].name === needle) {
                    $scope.role[type].push($scope[scopeVariable][i]);
                    $scope[scopeVariable].splice(i, 1);
                    break;
                }
            }
        }
        else {
            for (var i = 0; i < $scope.role[type].length; i++) {
                if ($scope.role[type][i].name === needle) {
                    $scope[scopeVariable].push($scope.role[type][i]);
                    $scope.role[type].splice(i, 1);
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

        if (notNull($scope.role.name, "Name Rolle") && notNull($scope.role.description, "Beschreibung Rolle")) {
            if (rolename == null) {
                roleService.addRole($scope.role)
                .then(function(response) {
                    var tRole = response.data;
                    var closeParams = {
                        oldRole : undefined,
                        role : tRole
                    }
                    showNotification("Die Rolle [" + tRole.name + "] wurde erfolgreich angelegt.", "success", "Neue Rolle", 4000);
                    close(closeParams, 200);
                })
                .catch(function(response) {
                    console.error("UserNew ERROR: ", response);
                });
            }
            else {
                roleService.updateRole($scope.role, rolename)
                .then(function(response) {
                    var tRole = response.data
                    var closeParams = {
                        oldRole : rolename,
                        role : tRole
                    }
                    showNotification("Die Rolle [" + tRole.name + "] wurde erfolgreich aktualisiert.", "success", "Rolle aktualisiert", 4000);
                    close(closeParams, 200);
                })
                .catch(function(response) {
                    console.error("UserNew ERROR: ", response);
                });
            }
        }
    }

}]);
