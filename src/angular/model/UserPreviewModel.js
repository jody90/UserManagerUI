myApp.factory('UserPreviewModel', ['MyException', function(MyException) {

    function UserPreviewModel(username, firstname, lastname, email) {
        this.setUsername(username);
        this.setFirstname(firstname);
        this.setLastname(lastname);
        this.setEmail(email);
    };

    UserPreviewModel.prototype = {
        setUsername: function(username) {
            this.username = username;
        },
        getUsername: function() {
            return this.username;
        },
        setFirstname: function(firstname) {
            this.firstname = firstname;
        },
        getFirstname: function() {
            return this.firstname;
        },
        setLastname: function(lastname) {
            this.lastname = lastname;
        },
        getLastname: function() {
            return this.lastname;
        },
        setEmail: function(email) {
            this.email = email;
        },
        getEmail: function() {
            return this.email;
        }
    }

    return UserPreviewModel;

}]);
