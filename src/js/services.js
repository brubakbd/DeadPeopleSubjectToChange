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
            var pkt = { username: username, password: CryptoJS.SHA256(password+username).toString()};
            console.log(pkt);
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
                setRole(data.data.role);
                callback(data.data.access_token);
            }, function errorCallback(response) {
                console.log('error occured: ', response);
                callback('', response);
                //UPDATE STUFF FOR INCORRECT USER NAME PASSWORD VS SERVER ERROR
            });
        };

        self.newUser = function (username, pwd) {
            var pkt = { username: username, password: CryptoJS.SHA256(pwd+username).toString()};
            console.log(pkt);
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
                setRole('basic');
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
                method: 'POST',
                url: host + 'create',
                data: pkt,
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
                method: 'POST',
                url: host + 'create',
                data: pkt,
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
                method: 'POST',
                url: host + 'create',
                data: pkt,
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
                method: 'POST',
                url: host + 'create',
                data: pkt,
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': getToken('auth-token')
                }
            }).then(function(response){
                callback(response.data);
            });
        };
        self.createDeath = function(KillerName, KilledName, iss, desc, callback){
            var rName ='';
            var pkt = {KillerID:KillerName, KilledID:KilledName, Issue:iss, Dsc:desc, type:'kills'};
            $http({
                method: 'POST',
                url: host + 'create',
                data: pkt,
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': getToken('auth-token')
                }
            }).then(function(response){
                callback(response.data);
            });
        };
        self.createRating = function(killID, val, callback){
            var pkt = {Username:user, KID:klilID, Value:val, type:'rating'};
            $http({
                method: 'POST',
                url: host + 'create',
                data: pkt,
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
                method: 'POST',
                url: host + 'create',
                data: pkt,
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
                method: 'POST',
                url: host + 'delete',
                data: pkt,
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
                method: 'POST',
                url: host + 'delete',
                data: pkt,
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
                method: 'POST',
                url: host + 'delete',
                data: pkt,
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
                method: 'POST',
                url: host + 'delete',
                data: pkt,
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
            console.log(pkt);
            $http({
                method: 'POST',
                url: host + 'delete',
                data: pkt,
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': getToken('auth-token')
                }
            }).then(function(response){
                callback(response.data);
            });
        };

        
        self.updateChar = function(id, Pname, Cname,img, callback){
            var pkt = {ID:id, P_name:Pname, C_name:Cname, Img_URL:img, type:'cape'};
            $http({
                method: 'POST',
                url: host + 'update',
                data: pkt,
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': getToken('auth-token')
                }
            }).then(function(response){
                callback(response.data);
            });
        };
        self.updateDeath = function(id, killerID, killedID, iss, desc, callback){
            var pkt = {ID:id, Killer:killerID, Killed:killedID, diedinissue:iss, description:desc, type:'kills'};
            $http({
                method: 'POST',
                url: host + 'update',
                data: pkt,
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': getToken('auth-token')
                }
            }).then(function(response){
                callback(response.data);
            });
        };
        self.updateSeries = function(oldName, newName, uname, pname, imgurl, callback){
            var pkt = {old:oldName, new:newName, U_name:uname, P_name:pname, Img_URL:imgurl, type:'series'};
            $http({
                method: 'POST',
                url: host + 'update',
                data: pkt,
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': getToken('auth-token')
                }
            }).then(function(response){
                callback(response.data);
            });
        };
        self.updateUniverse = function(oldName, newName, size, pname, location, imgurl, callback){
            var pkt = {old:oldName, new:newName, size:size, P_name:pname, location:location, Img_URL:imgurl, type:'universe'};
            $http({
                method: 'POST',
                url: host + 'update',
                data: pkt,
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'Authorization': getToken('auth-token')
                }
            }).then(function(response){
                callback(response.data);
            });
        };
        self.updatePublisher = function(oldName, newName, hnames, imgurl, callback){
            var pkt = {old:oldName, new:newName, H_name:hnames, Img_URL:imgurl, type:'publisher'};
            $http({
                method: 'POST',
                url: host + 'update',
                data: pkt,
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

