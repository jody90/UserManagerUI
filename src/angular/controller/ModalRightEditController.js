myApp.controller('ModalRightEditController', ['$scope', '$q', 'close', 'rightname', 'RightService',
function($scope, $q, close, rightname, RightService) {

    var rightService = new RightService();

    var buildNewRight = function() {
        var newRight = {};
        return $q.resolve(newRight);
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

    // REST Anfrage verarbeiten
    if (rightname == null) {
        buildNewRight()
        .then(function(data) {
            $scope.right = data;
        });
    }
    else {
        rightService.getRight(rightname)
        .then(function(data) {
            $scope.right = data;
        });
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

        if (notNull($scope.right.name, "Name Recht") && notNull($scope.right.description, "Beschreibung Recht")) {
            if (rightname == null) {
                rightService.addRight($scope.right)
                .then(function(response) {
                    var tRight = response.data;
                    var closeParams = {
                        oldRight : undefined,
                        right : tRight
                    }
                    showNotification("Das Recht [" + tRight.name + "] wurde erfolgreich angelegt.", "success", "Neues Recht", 4000);
                    close(closeParams, 200);
                })
                .catch(function(response) {
                    console.error("UserNew ERROR: ", response);
                });
            }
            else {
                rightService.updateRight($scope.right, rightname)
                .then(function(response) {
                    var tRight = response.data
                    var closeParams = {
                        oldRight : rightname,
                        right : tRight
                    }
                    showNotification("Das Recht [" + tRight.name + "] wurde erfolgreich aktualisiert.", "success", "Recht aktualisiert", 4000);
                    close(closeParams, 200);
                })
                .catch(function(response) {
                    console.error("UserNew ERROR: ", response);
                });
            }
        }
    }


}]);
