
$.getJSON('http://localhost:51111/api/APIDepartments', {}, function (data) {
    console.log(data);
});
//Viet ajax get du lieu employees
//Su dung angularJS
var app = angular.module("AngularFirstApp", []);
var urlE = "http://localhost:51111/api/APIEmployees";
var urlD = "http://localhost:51111/api/APIDepartments";

app.controller("EmployeeController", function ($scope, $http) {

    $scope.create = true;
    $scope.update = false;
    $scope.cancel = false;

    var loadData = function () {
        $http.get(urlE).then(function (response) {
            var obj = JSON.parse(response.data);       
            $scope.Employees = obj;
            $('#empTable').DataTable();     
        });
        $http.get(urlD).then(function(response){
            var obj = JSON.parse(response.data);   
            $scope.Departments = obj;
        })
    }
    
    loadData();



    $scope.delete = function (emp) {
        $http({ method: 'DELETE', url: urlE + "/" + emp.EmpID }).then(function (response) {
            alert("delete success!");
            $http.get(urlE).then(function (response) {
                //console.log(response.data);
                //var obj = JSON.parse(response.data);
                console.log(obj);
                $scope.Employees = obj;
                // $('#empTable').DataTable();
                loadData();
            });
        });
    };

    $scope.createEmployee = function () {
        $http({ method: 'POST', url: urlE, data: $scope.emp }).then(function (response) {
            alert("Create success!");
            $http.get(urlE).then(function (response) {
                //console.log(response.data);
                var obj = JSON.parse(response.data);
                console.log(obj);
                $scope.Employees = obj;
                // $('#empTable').DataTable();
            });
        })
    }

    $scope.edit = function (emp) {
        $http({
            method: 'GET',
            url: urlE + "/" + emp.EmpID
        }).then(function (response) {
            var obj = response.data;
            $scope.EmployeeDetail = obj;
            console.log(obj);
            $scope.updateEmployee = function () {
                $http({ method: 'POST', url: "api/Employees/Update", data: obj }).then(function (response) {
                    alert("Edit success!");
                    loadData();
                });
            }
            //loadData();
        });
    }
});






