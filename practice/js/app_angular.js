//Модуль
var model = {
    groups: [{name: "Програмирование (0)"},
        {name: "Дизайн (0)"},
        {name: "Смешнявки (0)"}]
};

//Модуль
var groupListApp = angular.module("groupListApp", []);

console.log(model);
//Контроллер
groupListApp.controller("GroupListCtrl", function ($scope) {
    $scope.data = model;

    //Обработчик нажатия
    $scope.addNewGroup = function () {

        $scope.data.groups.push({
            name: $scope.groupName
        });

        $scope.groupName = "";
    }
});