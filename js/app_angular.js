//Модуль
var model = {
    groups: [
        {
            name: "Програмирование",
            colored: "color_purple",
            article_links: [
                {name: "Хабра", url: "http://habrahabr.ru/rss"},
                {name: "Хабра 2", url: "http://habrahabr.ru/rss"},
                {name: "Хабра 3", url: "http://habrahabr.ru/rss"}]
        },

        {
            name: "Дизайн",
            colored: "color_blue",
            article_links: [
                {name: "Дизай", url: "дизайн.рф"}]
        },

        {
            name: "Смешнявки",
            colored: "color_red",
            article_links: [
                {name: "Пикабу", url: "Пикабу.рф"}]
        }],
};

//Модуль
var groupListApp = angular.module("groupListApp", []);

//Контроллер
groupListApp.controller("GroupListCtrl", function ($scope) {
    $scope.data = model;
    $scope.indexGroup = 0;

    //Обработчики нажатия
    $scope.openLinks = function () {
        $scope.indexGroup = this.$index
    };

    $scope.addNewGroup = function () {

        $scope.data.groups.push({
            name: $scope.groupName,
            colored: $scope.groupColor,
            article_links: []
        });

        $scope.groupName = "";
        $scope.groupColor = ""
    };

    $scope.deleteGroup = function () {
        $scope.data.groups.splice(this.$index, 1);
    };

    $scope.addNewLink = function () {
        $scope.data.groups[$scope.indexGroup_for_addNewLink].article_links.push({
            name: $scope.linkName,
            url: $scope.linkUrl
        });

        $scope.linkName = "";
        $scope.linkUrl = "";
        $scope.indexGroup_for_addNewLink = "";
        $scope.thisGroup = ""
    };

    $scope.deleteLink = function () {
        $scope.data.groups[$scope.indexGroup].article_links.splice(this.$index, 1);
    };


    $scope.editLink = function (index) {
        console.log(index, this.link.name);
        $('.wrapper__form_adding_new_feed').addClass('visibility');
        $('.form_editing_feed').addClass('visibility');
        $scope.edit = function () {
            $scope.data.groups[$scope.indexGroup].article_links[index] = {name: $scope.linkName, url: $scope.linkUrl};
        }
    }
});