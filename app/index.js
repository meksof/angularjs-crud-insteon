// Load Angular and dependent libs
const angular = require('angular');
require('angular-material');
require('angular-messages')
// styles
require('./assets/scss/style.scss');
const ngModule = angular.module('app', [ 'ngMaterial', 'ngMessages' ]);

require('./config')(ngModule);
require('./accounts')(ngModule);