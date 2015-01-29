angular.module('autocomplete', []).directive('autocomplete', function($parse, $http, $sce, $timeout) {
 return {
        restrict: 'EA',
        scope: {
            "id": "@id",
            "placeholder": "@placeholder",
            "selectedObject": "=selectedobject",
            "titleField": "@titlefield",
            "inputClass": "@inputclass",
            "minLengthUser": "@minlength",
            "maxLength": "@maxlength",
            "embHeight": "@embHeight",
            "embScrollEnd" : "@embScrollEnd",
            "param" : "=param",
            "find": "=find",
            "save": "=save"
        },
        template: 
        	'<div class="angucomplete-holder">'+
        		'<input id="{{id}}_value" ng-focus="callFind()" maxlength="{{maxLength}}" ng-blur="callSave($event)" ng-model="selectedObject[titleField]" type="text" '+
        					'placeholder="{{placeholder}}" class="{{inputClass}}" onmouseup="this.select();" ng-trim="false" />'+ 
	        	
        		'<div id="{{id}}_dropdown" ng-show="showDropdown" class="angucomplete-dropdown" style="max-height:300px" >'+
	        		'<div class="angucomplete-searching" ng-show="searching">Searching...</div>'+
	        		'<div class="angucomplete-searching" ng-show="!searching && (!results || results.length == 0)">No results found</div>'+
	        		
	        		'<div class="angucomplete-row" ng-repeat="result in results" ng-click="selectResult(result)" ng-mouseover="hoverRow()" '+ 
	        				'ng-class="{\'angucomplete-selected-row\': $index == currentIndex}">'+
        				'<div class="angucomplete-description">{{result[titleField]}}</div>'+
        			'</div>'+
        		'</div>'+
        	'</div>',

        link: function($scope, elem, attrs) {
            $scope.currentIndex = null;
            $scope.searching = false;
            $scope.minLength = 2;
            $scope.showDropdown = false;
            $scope.isDropdownSelected = false;
            $scope.typingTimer = null;
            $scope.scrollTimer = null;
            $scope.results = [];

            if ($scope.minLengthUser && $scope.minLengthUser != "") {
                $scope.minLength = $scope.minLengthUser;
            }
           
            $scope.callSave = function(event){
            	$scope.scrollTimer = setTimeout(function() {
	                if($scope.save && ! $scope.isDropdownSelected ){
	                	$scope.save( $scope.selectedObject, $scope.selectedObject, $scope.param );
	                }
	                $scope.hideResults();
            	}, 100);
            };

            $scope.showDataList = function ( dataList ){
            	$scope.searching = false;
            	$scope.results = dataList;
            };

            $scope.hideResults = function() {
            	$timeout(function() {
                    $scope.showDropdown = false;
                    $scope.results = [];
                }, 500);
            };

            $scope.hoverRow = function(index) {
                $scope.currentIndex = index;
            };

            $scope.isNewSearchNeeded = function(newTerm) {
                return newTerm && newTerm.length >= $scope.minLength && newTerm != "";
            };

            $scope.keyup = function(event) {
                if (!(event.which == 38 || event.which == 40 || event.which == 13 || event.which == 27 )) {
                	$scope.callFind();
                } else {
                    event.preventDefault();
                }
            };

            $scope.keydown = function(event) {
            	if (!(event.which == 38 || event.which == 40 || event.which == 13 || event.which == 27)) {
            		clearTimeout($scope.typingTimer);
            	}
            	else if(event.which == 40) {
                    if ($scope.results && ($scope.currentIndex + 1) < $scope.results.length) {
                        $scope.currentIndex ++;
                        $scope.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    }

                    $scope.$apply();
                } else if(event.which == 38) {
                    if ($scope.currentIndex >= 1) {
                        $scope.currentIndex --;
                        $scope.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    }

                } 
                else if (event.which == 13) {
                    if ($scope.results && $scope.currentIndex >= 0 && $scope.currentIndex < $scope.results.length) {
                        $scope.selectResult($scope.results[$scope.currentIndex]);
                        $scope.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    } else {
                        $scope.results = [];
                        $scope.$apply();
                        event.preventDefault;
                        event.stopPropagation();
                    }
                } 
                else if (event.which == 27) {
                    $scope.results = [];
                    $scope.showDropdown = false;
                    $scope.$apply();
                } 
            };
            
            $scope.callFind = function(){
            	if( $scope.selectedObject ){
            		var searchStr = $scope.selectedObject[$scope.titleField];
            		$scope.isDropdownSelected = false;
            		
            		clearTimeout($scope.typingTimer);
            		
            		if ( $scope.isNewSearchNeeded(searchStr) ) 
            		{
            			$scope.typingTimer = setTimeout(function(){
            				$scope.showDropdown = true;
            				$scope.currentIndex = -1;
            				$scope.searching = true;
            				
            				console.log("finding..."+ new Date());
            				$scope.find(searchStr,$scope.showDataList,$scope.selectedObject);
            			}, 700);
            		}
            		else {
            			$scope.hideResults();
            		}
            	}
            };
            
            $scope.selectResult = function( newSelectedObject ) {
    			var oldSelectedObject = $scope.selectedObject;
        		$scope.selectedObject = newSelectedObject;
            	$scope.showDropdown = false;
            	$scope.isDropdownSelected = true;
            	$scope.results = [];
            	if( $scope.save ){
            		$scope.save( $scope.selectedObject, oldSelectedObject, $scope.param );
            	}
            };
            
            elem.find('input').on('keyup', $scope.keyup);
            elem.find('input').on('keydown', $scope.keydown);
            
			$timeout(function() {
	            $("#"+ $scope.id + "_dropdown").on( 'scroll', function(event){
	            	clearTimeout($scope.scrollTimer);
	            });
			}, 2000);
        }
    };
});
