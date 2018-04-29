module.exports = function(ngModule){
    ngModule.directive('accounts',function () {
        return {
            restrict: 'EA',
            scope: {},
            templateUrl: 'accounts/accounts.html',
        }
    })
}