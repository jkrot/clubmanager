'use strict';

angular.module('clubmanager')
  .controller('MainCtrl', ['$scope', 'dataService', function($scope, tableData) {
  	// Table Setup
  	$scope.tableData = tableData;
 	$scope.setItem = 0;
 	$scope.currentItem = undefined;
 	// Pagination
 	$scope.itemsPerPage = '10';
 	$scope.currentPage = 0;

	$scope.range = function() {
		var rangeSize = 4;
		var ps = [];
		var start;

		start = $scope.currentPage;
		if ( start > $scope.pageCount()-rangeSize ) {
		  start = $scope.pageCount()-rangeSize+1;
		}
		for (var i=start; i<start+rangeSize; i++) {
			if(i>=0) {
				ps.push(i);
			}
		}
		return ps;
	};
	$scope.rangeSize = function() {
		var size = 4;
		if (Math.ceil($scope.pageCount / $scope.itemsPerPage) > 4){
			size = 4;
		}else{
			size = Math.ceil($scope.pageCount / $scope.itemsPerPage);
		}
		return size;
	};

	$scope.prevPage = function() {
		if ($scope.currentPage > 0) {
			$scope.currentPage = $scope.currentPage - 1;
		}
	};
	$scope.DisablePrevPage = function() {
		return $scope.currentPage === 0 ? 'disabled' : '';
	};
	$scope.pageCount = function() {
		return Math.ceil(Object.size($scope.filteredResults)/$scope.itemsPerPage)-1;
	};
	$scope.nextPage = function() {
		if ($scope.currentPage < $scope.pageCount()) {
			$scope.currentPage = $scope.currentPage + 1;
		}
	};
	$scope.DisableNextPage = function() {
		return $scope.currentPage === $scope.pageCount() ? 'disabled' : '';
	};
	$scope.setPage = function(event, n) {
		event.preventDefault();
		event.stopPropagation();

		$scope.currentPage = n;
	};

	$scope.setItem = function(n) {
		$scope.currentItem = $scope.tableData[n];
	};

	$scope.clearItem = function() {
		$scope.currentItem = undefined;
	};

	$scope.rowClass = function(n) {
		return 'row' + n;
	};

}]);

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

