angular.module("itsItinerary").controller("itineraryController", function ($scope, $http) {
    $scope.isEditing = false;
    $scope.isUpdating = false;
    $scope.showAll = false;
    var itinId;


    //initialisation if Itinerary List


    $scope.init = function () {

        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/its")
            .success(function (response) {
                $scope.itineraries = response;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    }


    // Adding Itinerary to Database

    $scope.add = function () {
        var itineraryDetails = {
            //id: $scope.itineraries.length + 1,
            itiName: $scope.itineraryName,
            destination: $scope.itineraryDestination,
            purpose: $scope.itineraryPurpose,
            startDate: new Date($scope.itineraryStartDate),
            endDate: new Date($scope.itineraryEndDate)
        }
        $http.post("http://webteach_net.hallam.shu.ac.uk/acesjas/api/its/", itineraryDetails)


            .success(function () {
                $scope.isEditing = false,
                $scope.init();
            })

            .error(function (error) {
                $scope.errorMessage = error;
            });
    }



    $scope.beginEditing = function () {

        $scope.isEditing = true;
    };

    $scope.cancelAddition = function () {

        $scope.isEditing = false;
        $scope.itineraryName = "";
    };

    // Delete Itinerary

    $scope.remove = function (itineraryId) {
        $http.delete("http://webteach_net.hallam.shu.ac.uk/acesjas/api/its/" + itineraryId)
            .success(function () {
                $scope.init();
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    }
        // Edit Itinerary- Part 1

    $scope.displayEditItinerary = function (itineraryId) {
        $scope.isUpdating = true;
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/its/" + itineraryId)

            .success(function (response) {
                $scope.editItineraryName = response.itiName;
                $scope.editItineraryDestination = response.destination;
                $scope.editItineraryPurpose = response.purpose;
                $scope.editItineraryStartDate = response.startDate;
                $scope.editItineraryEndDate = response.endDate;

                itinId = response.Id;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
    }

    //Edit Itinerary Part 2

    $scope.edit = function (Itinerary) {
        var editItineraryItem = {
            Id: itinId,
            itiName: $scope.editItineraryName,  //should use Itinerary as $
            destination: $scope.editItineraryDestination,
            purpose: $scope.editItineraryPurpose,
            startDate: new Date($scope.editItineraryStartDate),
            EndDate: new Date($scope.editItineraryStartDate),
        };

        $http.put("http://webteach_net.hallam.shu.ac.uk/acesjas/api/its/", editItineraryItem)
            .success(function (){
            $scope.isUpdating = false
            $scope.init;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });

    }

    $scope.cancelEdit = function () {

        $scope.isUpdating = false;
        $scope.itineraryName = "";
        $scope.ItineraryDestination = "";
        $scope.itineraryPurpose = "";
    }



    //Details of selected Itinerary

    $scope.details = function (itineraryId)
    {
        $scope.itineraries = [];
        $http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/its/" + itineraryId)
            .success(function (response) {
                $scope.itineraries[0] = response;
            })
            .error(function (error) {
                $scope.errorMessage = error;
            });
        $scope.showAll = true;



    }

    $scope.hideShowAll = function ()
    {
        
        $scope.showAll = false;
        $scope.init()
    }

    $scope.init();

});