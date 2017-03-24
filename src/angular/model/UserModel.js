myApp.factory('UserModel', ['MyException', function(MyException) {

    function UserModel(username, firstname, lastname, email, authorities, rights, roles) {
        this.setUsername(username);
        this.setFirstname(firstname);
        this.setLastname(lastname);
        this.setEmail(email);
        this.setAuthorities(authorities);
        this.setRights(rights);
        this.setRoles(roles);
    };

    UserModel.prototype = {
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
        },
        setAuthorities: function(authorities) {
            this.authorities = authorities;
        },
        getAuthorities: function() {
            return this.authorities;
        },
        setRights: function(rights) {
            this.rights = rights;
        },
        getRights: function() {
            return this.rights;
        },
        setRoles: function(roles) {
            this.roles = roles;
        },
        getRoles: function() {
            return this.roles;
        }
    }

    return UserModel;

}]);
