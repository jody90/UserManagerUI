myApp.factory('CookieService', ['config', 'MyException', '$cookies', function(config, MyException, $cookies) {

    function CookieService() {

        console.info("CookieServcie constructor");

    }

    Date.prototype.addHours = function(h) {
        this.setHours(this.getHours() + h);
        return this;
    }

    CookieService.prototype.setTokenCookie = function(token) {

        console.log("setTokenCookie", token);

        var expires = new Date().addHours(config.tokenCookieExipre);

        $cookies.put("token", token, {expires: expires});
    }

    return CookieService;


}]);
