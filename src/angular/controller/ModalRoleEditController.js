myApp.controller('ModalRoleEditController', ['$scope', '$q', 'roleName', 'RightService', 'RoleService',
function($scope, $q, roleName, RightService, RoleService) {

    var roleService = new RoleService();
    var rightService = new RightService();

    $scope.possibleRights = null;

    // REST Schnittstelle nach allen notwendigen Daten anfragen
    var getScopeData = function(roleName) {
        return $q.all([roleService.getRole(roleName), rightService.getRights()])
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
    getScopeData(roleName)
    .then(function(data) {

        var role = data[0];
        var rights = data[1];

        addScopeRights(role.rights, rights)
        .then(function(tRights) {
            $scope.possibleRights = tRights;
        })

        $scope.role = role;

    });

    $scope.addRight = function(rightName) {

        roleService.addRoleRight(roleName, rightName)
        .then(function(response) {
            for (var i = 0; i < $scope.possibleRights.length; i++) {
                if ($scope.possibleRights[i].name === rightName) {
                    $scope.role.rights.push($scope.possibleRights[i]);
                    $scope.possibleRights.splice(i, 1);
                    break;
                }
            }
        })
        .catch(function(response) {
            console.log("removeRole Error DATA: ", response);
        });
    }

    $scope.removeRight = function(rightName) {

        roleService.removeRoleRight(roleName, rightName)
        .then(function(response) {
            for (var i = 0; i < $scope.role.rights.length; i++) {
                if ($scope.role.rights[i].name === rightName) {
                    $scope.possibleRights.push($scope.role.rights[i]);
                    $scope.role.rights.splice(i, 1);
                    break;
                }
            }
        })
        .catch(function(response) {
            console.log("removeRole Error DATA: ", response);
        });
    }

}]);
