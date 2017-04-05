myApp.factory('RightModel', ['MyException', function(MyException) {

    function RightModel(name, description) {
        this.setName(name);
        this.setDescription(description);
    };

    RightModel.prototype = {
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

    return RightModel;

}]);
