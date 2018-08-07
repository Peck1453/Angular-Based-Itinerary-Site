angular.module("itsAuthentication").controller("authenticationController", function ($scope, $http) {

    $scope name;
    $scope role;
    $scope authenticated;





    $scope.login = function () {


        $http.post("http://webteach_net.hallam.shu.ac.uk/acesjas/api/login")
        var userDetails
    }

}