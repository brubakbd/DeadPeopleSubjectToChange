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

        self.createChar = function(Pname, Cname,img, callback){
            var pkt = {P_name:Pname, C_name:Cname, Img_URL:img, type:'cape'};
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
        self.createSeries = function(Sname, Uname, Pname, img, callback){
            var pkt = {S_name:Sname, U_name:Uname, P_name:Pname, Img_URL:img, type:'series'};
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
        self.createUniverse = function(Uname, size, Pname, location, img, callback){
            var pkt = {U_name:Uname, Size:size, P_name:Pname, Location:location, Img_URL:img, type:'universe'};
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
        self.createPublisher = function(Pname, Hname, img, callback){
            var pkt = {P_name:Pname, H_name:Hname, Img_URL:img, type:'publisher'};
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
        self.createDeath = function(KillerName, KilledName, img, iss, desc, callback){
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
            var pkt = {Username:user, KID:klilID, Value:val, type:'rating'};
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
        self.createCharSeries = function(sname, cid, callback){
            var pkt = {S_name:sname, C_ID:cid, type:'charSeries'};
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



        
        self.deleteChar = function(charID, callback){
            var pkt = {delID:charID, type:'cape'};
            $http({
                method: 'GET',
                url: host + 'delete',
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': getToken('auth-token')
                }
            }).then(function(response){
                callback(response.data);
            });
        };
        self.deleteSeries = function(sname, callback){
            var pkt = {S_name:sname, type:'series'};
            $http({
                method: 'GET',
                url: host + 'delete',
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': getToken('auth-token')
                }
            }).then(function(response){
                callback(response.data);
            });
        };
        self.deleteUniverse = function(name, callback){
            var pkt = {U_name:name, type:'universe'};
            $http({
                method: 'GET',
                url: host + 'delete',
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': getToken('auth-token')
                }
            }).then(function(response){
                callback(response.data);
            });
        };
        self.deletePublisher = function(name, callback){
            var pkt = {P_name:name, type:'publisher'};
            $http({
                method: 'GET',
                url: host + 'delete',
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': getToken('auth-token')
                }
            }).then(function(response){
                callback(response.data);
            });
        };
        self.deleteKill = function(name, callback){
            var pkt = {KID:name, type:'kills'};
            $http({
                method: 'GET',
                url: host + 'delete',
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': getToken('auth-token')
                }
            }).then(function(response){
                callback(response.data);
            });
        };
    }]);

})();

