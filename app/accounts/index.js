module.exports = function(ngModule){
    require('./accounts-controller')(ngModule);
    require('./accounts-service')(ngModule);
    require('./accounts-directive')(ngModule);
}