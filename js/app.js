/**
 * @license AngularJS v1.7.8
 * (c) 2010-2018 Google, Inc. http://angularjs.org
 * License: MIT
 */
//Модуль
var model = {
    groups: [
        {
            name: "Програмирование",
            class_color: "color_purple",
            article_feeds: [
                {name: "Хабра", url: "http://habrahabr.ru/rss"},
                {name: "Хабра 2", url: "http://habrahabr.ru/rss"},
                {name: "Хабра 3", url: "http://habrahabr.ru/rss"}]
        },

        {
            name: "Дизайн",
            class_color: "color_blue",
            article_feeds: [
                {name: "Дизай", url: "дизайн.рф"}]
        },

        {
            name: "Смешнявки",
            class_color: "color_red",
            article_feeds: [
                {name: "Пикабу", url: "Пикабу.рф"}]
        }],

    color_markers: [
        {
            id: 0,
            className: 'color_red'
        },

        {
            id: 1,
            className: 'color_orange'
        },

        {
            id: 2,
            className: 'color_yellow'
        },

        {
            id: 3,
            className: 'color_green'
        },

        {
            id: 4,
            className: 'color_aqua'
        },

        {
            id: 5,
            className: 'color_blue'
        },

        {
            id: 6,
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
    $scope.id_color_value = "0";

    //addNewFeed
    $scope.feedName = "";
    $scope.feedUrl = "";

    //editFeed
    $scope.feedName = "";
    $scope.feedUrl = "";

    $scope.colorID = "0";

    $scope.showFormAddFeed = false;
    $scope.showFormEditFeed = false;

    $scope.validError__feedName = false;
    $scope.validError__feedUrl = false;

    $scope.selectGroup = function () {
        $scope.indexGroup = this.$index;
    };

    $scope.colorsMarkers__searchColor = function (id) {
        id = Number(id);
        return $scope.data.color_markers.filter(color_marker => color_marker['id'] === id)[0]['className'];
    };

    $scope.validFormGroup = function () {
        if ($scope.newGroupForm.newGroupForm__name.$valid) {
            $scope.addNewGroup();
        }
    };

    $scope.addNewGroup = function () {
        $scope.data.groups.push({
            name: $scope.groupName,
            class_color: $scope.colorsMarkers__searchColor($scope.colorID),
            article_feeds: [],
        });

        $scope.groupName = "";
        $scope.colorID = "0";
    };

    $scope.confirmDeleteGroup = function () {
        if ($scope.data.groups[this.$index].article_feeds.length == 0) {
            $scope.deleteGroup(this);
        } else {
            if (confirm("В данной группе находится " +$scope.data.groups[this.$index].article_feeds.length+ " лент(а/ы). Вы уверены, что хотите удалить её?")) {
                $scope.deleteGroup(this);
            };
        };
    };

    $scope.deleteGroup = function (this_group) {
        $scope.data.groups.splice(this_group.$index, 1);
    };

    $scope.validFormFeed = function () {
        if ($scope.feedForm.$valid) {
            if ($scope.showFormAddFeed) {
                $scope.addNewFeed();
                $scope.showFormAddFeed = false;

                $scope.validError__feedName = false;
                $scope.validError__feedUrl = false;

            } else if ($scope.showFormEditFeed) {
                $scope.editFeed();
                $scope.showFormEditFeed = false;

                $scope.validError__feedName = false;
                $scope.validError__feedUrl = false;
            }
        } else {
            $scope.validError__feedName = $scope.feedForm.feedForm__name.$error.required;
            $scope.validError__feedUrl = $scope.feedForm.feedForm__url.$error;
        };
    };

    $scope.addNewFeed = function () {
        $scope.data.groups[$scope.indexGroup].article_feeds.push({
            name: $scope.feedName,
            url: $scope.feedUrl,
        });

        $scope.feedName = "";
        $scope.feedUrl = "";
    };

    $scope.deleteFeed = function (indexGroup, indexFeed) {
            $scope.data.groups[indexGroup].article_feeds.splice(indexFeed, 1);
    };

    $scope.confirmDeleteFeed = function () {
        if (confirm("Вы уверены, что хотите удалить данную ленту?")) {
            $scope.deleteFeed($scope.indexGroup, this.$index);
        };
    };


    $scope.showFormEditing = function () {
        $scope.indexGroupForFeed  = $scope.indexGroup;
        $scope.indexEditFeed = this.$index;
        $scope.feedName = $scope.data.groups[$scope.indexGroup].article_feeds[this.$index].name;
        $scope.feedUrl = $scope.data.groups[$scope.indexGroup].article_feeds[this.$index].url;
        $scope.showFormEditFeed = true;
    };

    $scope.editFeed = function () {
        if ($scope.indexGroupForFeed == $scope.indexGroup) {
            $scope.data.groups[$scope.indexGroup].article_feeds[$scope.indexEditFeed] = {name: $scope.feedName, url: $scope.feedUrl};
        } else {
            $scope.deleteFeed($scope.indexGroupForFeed, $scope.indexEditFeed);
            $scope.addNewFeed();
        };

        $scope.feedName = "";
        $scope.feedUrl = "";
    };
});