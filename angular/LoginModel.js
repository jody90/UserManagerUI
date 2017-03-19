myApp.factory('LoginModel', ['MyException', function(MyException) {

    function LoginModel(username, password) {
        if (arguments.length == 2) {
            this.setUsername(arguments[0]);
            this.setPassword(arguments[1]);
        }
    };

    LoginModel.prototype = {
        setUsername: function(username) {
            if (username === undefined || username === "") {
                throw new MyException("emptyUsernameException", "Username is undefined or empty", "LoginModel");
            }
            this.username = username;
        },
        getUsername: function() {
            return this.username;
        },
        setPassword: function(password) {
            if (password === undefined || password === "") {
                throw new MyException("emptyPasswordException", "Password is undefined or empty", "LoginModel");
            }
            this.password = password;
        },
        getPassword: function() {
            return this.password;
        }
    }

    return LoginModel;

}])
