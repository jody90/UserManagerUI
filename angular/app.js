var myApp = angular.module('MyApp', []);

myApp.factory("MyException", function() {

    function MyException(name, message, throwingClass) {
        this.name = name;
        this.message = message;
        this.throwingClass = throwingClass;
    }

    MyException.prototype = new Error();
    MyException.prototype.constructor = MyException;

    return MyException

})
