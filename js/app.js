//AngularJS v1.7.8

//Модуль
var model = {
    groups: [
        {
            name: "Програмирование",
            id_color: "6",
            article_links: [
                {name: "Хабра", url: "http://habrahabr.ru/rss"},
                {name: "Хабра 2", url: "http://habrahabr.ru/rss"},
                {name: "Хабра 3", url: "http://habrahabr.ru/rss"}]
        },

        {
            name: "Дизайн",
            id_color: "5",
            article_links: [
                {name: "Дизай", url: "дизайн.рф"}]
        },

        {
            name: "Смешнявки",
            id_color: "0",
            article_links: [
                {name: "Пикабу", url: "Пикабу.рф"}]
        }],

    color_markers: [
        {
            className: 'color_red'
        },

        {
            className: 'color_orange'
        },

        {
            className: 'color_yellow'
        },

        {
            className: 'color_green'
        },

        {
            className: 'color_aqua'
        },

        {
            className: 'color_blue'
        },

        {
            className: 'color_purple'
        }
    ]
};

//Модуль
var rssReader = angular.module("rssReaderApp", []);

//Контроллер
rssReader.controller("rssReaderCtrl", function ($scope) {
    $scope.data = model;
    $scope.indexGroup = 0;

    //addNewGroup
    $scope.groupName = "";
    $scope.idGroupColor = "0";

    //addNewLink
    $scope.linkName = "";
    $scope.linkUrl = "";

    //editLink
    $scope.editLinkName = "";
    $scope.editLinkUrl = "";


    $scope.showFormAdding = false;
    $scope.showFormEditing = false;

    //Обработчики нажатия
    $scope.selectGroup = function () {
        $scope.indexGroup = this.$index;
    };

    $scope.addNewGroup = function () {
        $scope.data.groups.push({
            name: $scope.groupName,
            id_color: $scope.idGroupColor,
            article_links: [],
        });
    };

    $scope.deleteGroup = function () {
        if (confirm("В данной группе находится " +$scope.data.groups[this.$index].article_links.length+ " ссылок. Вы уверены, что хотите удалить группу?")) {
            $scope.data.groups.splice(this.$index, 1);
        };
    };

    $scope.addNewLink = function () {
        $scope.data.groups[$scope.indexGroup].article_links.push({
            name: $scope.linkName,
            url: $scope.linkUrl,
        });

        $scope.linkName = "";
        $scope.linkUrl = "";
    };

    $scope.deleteLink = function () {
        if (confirm("Вы уверены, что хотите удалить данную ссылку?")) {
            $scope.data.groups[$scope.indexGroup].article_links.splice(this.$index, 1);
        };
    };


    $scope.showFromEditing = function () {
        $scope.editLinkName = $scope.data.groups[$scope.indexGroup].article_links[this.$index].name;
        $scope.editLinkUrl = $scope.data.groups[$scope.indexGroup].article_links[this.$index].url;
        $scope.showFormEditing = true;
        $scope.indexEditLink = this.$index;
        console.log($scope.indexEditLink, this.link.name, $scope.showFormEditing);
    };

    $scope.editLink = function () {
        $scope.data.groups[$scope.indexGroup].article_links[$scope.indexEditLink] = {name: $scope.editLinkName, url: $scope.editLinkUrl};
    };
});