var myApp = angular.module('MyApp', ['ngCookies']);

myApp.factory("MyException", function() {

    function MyException(name, message, throwingClass) {
        this.name = name;
        this.message = message;
        this.throwingClass = throwingClass;
        this.method = method;
    }

    MyException.prototype = new Error();
    MyException.prototype.constructor = MyException;

    return MyException

})

myApp.constant('config', {
    tokenCookieExipre: 24  
});
