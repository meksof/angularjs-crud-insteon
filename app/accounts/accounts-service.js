module.exports = function (ngModule) {
    ngModule.factory('AccountsService', [
        '$http',
        'CONFIG',
        function ($http, CONFIG) {
            var accountsServiceInstance = {};
            // after login is made we should make use of a token
            /**
             * function login(email, password){
             *  // login logic
             *  ... 
             *  // add token to each user request
             *  $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;example_access_135fhn80w35hynainrsg0q824hyn
             * }
             */
            accountsServiceInstance.fakeLogin = function() {
                $http.defaults.headers.common.Authorization = 'Bearer ' + "example_access_135fhn80w35hynainrsg0q824hyn";
            }
            accountsServiceInstance.getAll = function () {
                return $http({
                    method: 'GET',
                    url: CONFIG.INSTEON_API_URL + '/accounts'
                });
            }
            accountsServiceInstance.createAccount = function (account) {
                return $http({
                    method: 'POST', 
                    url: CONFIG.INSTEON_API_URL + '/accounts',
                    data: account
                });
            }
            accountsServiceInstance.updateAccount = function(account, id){
                return $http({
                    method: 'PUT',
                    url: CONFIG.INSTEON_API_URL + '/accounts/' + id,
                    data: account
                })
            }
            accountsServiceInstance.deleteAccount = function (id) {
                return $http({
                    method: 'DELETE',
                    url: CONFIG.INSTEON_API_URL + '/accounts/' + id
                });
            }
            return accountsServiceInstance;
        }
    ]);
}