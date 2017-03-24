myApp.factory('CookieService', ['config', 'MyException', '$cookies', function(config, MyException, $cookies) {

    function CookieService() {}

    // Date.prototype.addHours = function(h) {
    //     this.setHours(this.getHours() + h);
    //     return this;
    // }

    Date.prototype.addHours = function(h) {
        this.setMinutes(this.getMinutes() + 1);
        return this;
    }

    function isTokenActive(token) {

        var currentDate = new Date();
        var tokenDate = new Date(token.expires);

        return currentDate < tokenDate;
    }

    CookieService.prototype.setTokenCookie = function(token, username) {

        var expires = new Date().addHours(config.tokenCookieExipre);

        var tokenObject = {
            value : token,
            expires : expires,
            username : username
        }

        $cookies.putObject("token", tokenObject, {expires: expires});
    }

    CookieService.prototype.getTokenCookie = function() {

        var token = $cookies.getObject("token");

        if (token !== undefined && isTokenActive(token)) {
            return token;
        }

        return null;

    }

    return CookieService;


}]);
