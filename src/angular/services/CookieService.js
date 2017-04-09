myApp.factory('CookieService', ['config', 'MyException', '$cookies', function(config, MyException, $cookies) {

    function CookieService() {}

    Date.prototype.addHours = function(h) {
        this.setMinutes(this.getMinutes() + 20);
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

        var tokenJson = JSON.stringify(tokenObject);

        $cookies.put("token", tokenJson, {expires: expires});
        $cookies.put("authToken", token, {expires: expires});
    }

    CookieService.prototype.getTokenCookie = function() {

        var tokenJson = $cookies.get("token");
        if (tokenJson != null) {
            var token = JSON.parse(tokenJson);
        }

        if (token !== undefined && isTokenActive(token)) {
            return token;
        }

        return null;

    }

    return CookieService;

}]);
