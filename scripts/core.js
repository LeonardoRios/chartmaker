var gaugeApp = angular.module('gaugeApp',['ngRoute','ngAnimate','ui.bootstrap','ngSanitize','ui.select','ngTagsInput','ui.sortable',
'angularFileUpload','autocomplete','ui.utils','ngCleanMask','monospaced.elastic','angularjs-dropdown-multiselect','cgPrompt'/*,'ngMockE2E'*/]);



gaugeApp.run(['$rootScope','$location', '$templateCache',
function($rootScope,$location, $templateCache) {


    $rootScope.$on('$routeChangeStart', function(event, next, current) {

    });

    
    $rootScope.$on('$routeChangeSuccess', function(e, curr, prev) {

    });
    
}]);
