/**
 * Created by Steven on 2/20/2016.
 */
(function () {
    var app = angular.module('DataManager', []);

    var host = "http://137.112.137.116:5000/";
    var token;
    var user;
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
                user = username;
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

        self.createChar = function(Pname, Cname, callback){
            var pkt = {P_name:Pname, C_name:Cname, type:'cape'};
            $http({
                method: 'GET',
                url: host + 'create',
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': getToken('auth-token')
                }
            }).then(function(response){
                callback(response.data);
            });
        };
        self.createSeries = function(Sname, Uname, Pname, callback){
            var pkt = {S_name:Sname, U_name:Uname, P_name:Pname, type:'series'};
            $http({
                method: 'GET',
                url: host + 'create',
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': getToken('auth-token')
                }
            }).then(function(response){
                callback(response.data);
            });
        };
        self.createUniverse = function(Uname, size, Pname, location, callback){
            var pkt = {U_name:Uname, Size:size, P_name:Pname, Location:location, type:'universe'};
            $http({
                method: 'GET',
                url: host + 'create',
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': getToken('auth-token')
                }
            }).then(function(response){
                callback(response.data);
            });
        };
        self.createPublisher = function(Pname, Hname, callback){
            var pkt = {P_name:Pname, H_name:Hname, type:'publisher'};
            $http({
                method: 'GET',
                url: host + 'create',
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': getToken('auth-token')
                }
            }).then(function(response){
                callback(response.data);
            });
        };
        self.createDeath = function(KillerName, KilledName, callback){
            var rName ='';
            search(KillerName, 'cape',function(responseR){
                search(KilledName, 'cape',function(responseD){
                    var pkt = {KillerID:responseR.ID, KilledID:responseD.ID, type:'kills'};
                        $http({
                            method: 'GET',
                            url: host + 'create',
                            headers: {
                                'Content-Type': "application/json",
                                'Accept': "application/json",
                                'Authorization': getToken('auth-token')
                            }
                        }).then(function(response){
                            callback(response.data);
                        });
                });
            });   
        };
        self.createRating = function(killID, val, callback){
            var pkt = {Username:user, KID:klilID, Value:val, type:'publisher'};
            $http({
                method: 'GET',
                url: host + 'create',
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

