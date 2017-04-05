myApp.factory('RolePreviewModel', ['MyException', function(MyException) {

    function RolePreviewModel(name, description) {
        this.setName(name);
        this.setDescription(description);
    };

    RolePreviewModel.prototype = {
        setName(name) {
            this.name = name;
        },
        getName() {
            return this.name;
        },
        setDescription(description) {
            this.description = description;
        },
        getDescription() {
            return this.description;
        }
    }

    return RolePreviewModel;

}]);
