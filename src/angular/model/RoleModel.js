myApp.factory('RoleModel', ['MyException', function(MyException) {

    function RoleModel(name, description, rights) {
        this.setName(name);
        this.setDescription(description);
        this.setRights(rights);
    };

    RoleModel.prototype = {
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
        },
        setRights(rights) {
            this.rights = rights;
        },
        getRights() {
            return this.rights;
        }
    }

    return RoleModel;

}]);
