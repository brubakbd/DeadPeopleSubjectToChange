/**
 * Created by Steven on 2/20/2016.
 */
(function () {
    var app = angular.module('DataManager', []);

    var host = "http://137.112.227.210:5000/";
    var token;
    app.service('AuthService', ['$http', '$state', function ($http, $state) {
        var self = this;

        self.login = function (username, password, callback) {
            var pkt = { username: username, password: CryptoJS.SHA256(password)};
            $http({
                method: 'POST',
                url: host + "login",
                data: pkt,
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                }
            }).then(function (data) {
                console.log('SUCCESS - login', data.data, data.data.access_token);
                setToken('auth-token', data.data.access_token);
                $http.defaults.headers.common.Authorization = 'Bearer ' + data.data.access_token;
                token = 'Bearer ' + data.data.access_token;
                callback(data.data.access_token);
            }, function errorCallback(response) {
                console.log('error occured: ', response);
                callback('', response);
                //UPDATE STUFF FOR INCORRECT USER NAME PASSWORD VS SERVER ERROR
            });
        };

        self.newUser = function (username, pwd) {
            var pkt = { username: username, password: CryptoJS.SHA256(pwd)};
            $http({
                method: 'POST',
                url: host + "createUser",
                data: pkt,
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                }
            }).then(function (response) {
                setToken('auth-token', response.data.access_token);
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.access_token;
                token = 'Bearer ' + response.data.access_token;
                $state.go('homepage');
            }, function errorCallback(response) {
                console.log('error occured: ', response);
            });
        };
    }]);
    app.service('DataService', ['$http', function ($http) {
        var self = this;

        self.search = function(searchTerm, type, callback){
            $http({
                method: 'GET',
                url: host + 'search?name=' + searchTerm+'&type='+type,
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json"
                }
            }).then(function(response){
                callback(response.data);
            });
        };
    }]);

})();

