//Модуль
var model = {
    groups: [
        {
            name: 'Програмирование',
            colorId: 7,
            feeds: [
                {name: 'Хабра', url: 'http://habrahabr.ru/rss'},
                {name: 'Хабра 2', url: 'http://habrahabr.ru/rss'},
                {name: 'Хабра 3', url: 'http://habrahabr.ru/rss'}]
        },

        {
            name: 'Дизайн',
            colorId: 6,
            feeds: [
                {name: 'Дизай', url: 'дизайн.рф'}]
        },

        {
            name: 'Смешнявки',
            colorId: 1,
            feeds: [
                {name: 'Пикабу', url: 'Пикабу.рф'}]
        }],

    colorMarkers: [
        {
            id: 1,
            className: 'color-red'
        },

        {
            id: 2,
            className: 'color-orange'
        },

        {
            id: 3,
            className: 'color-yellow'
        },

        {
            id: 4,
            className: 'color-green'
        },

        {
            id: 5,
            className: 'color-aqua'
        },

        {
            id: 6,
            className: 'color-blue'
        },

        {
            id: 7,
            className: 'color-purple'
        }
    ]
};

//Модуль
var rssReader = angular.module('rssReaderApp', []);

//Контроллер
rssReader.controller('rssReaderCtrl', function ($scope) {
    $scope.data = model;

    $scope.group = {
        colorId: 1,
        feeds: []
    };

    $scope.feed = {};

    $scope.selectGroupIndex = 0;
    $scope.selectPopupGroupIndex = $scope.selectGroupIndex;

    $scope.addFeedPopupVisibilityEnabled = false;
    $scope.editFeedPopupVisibilityEnabled = false;

    $scope.feedNameEnabled = false;
    $scope.feedUrlEnabled = false;

    $scope.clickGroup = false;

    $scope.selectGroup = function () {
        $scope.selectGroupIndex = this.$index;
    };

    $scope.searchColorClass = function (id) {
        id = parseInt(id);
        return $scope.data.colorMarkers.filter(
            function (colorMarker) {
                return colorMarker.id === id;
            }
            )[0]['className'];
    };

    $scope.validateFormGroup = function () {
        if ($scope.groupForm.groupFormName.$valid) {
            $scope.addNewGroup();
        }
    };

    $scope.addNewGroup = function () {
        $scope.data.groups.push(Object.assign($scope.group));
        $scope.group = {
            colorId: 1,
            feeds: []
        };
    };

    $scope.showAddFeedPopup = function () {
        $scope.selectPopupGroupIndex = $scope.selectGroupIndex;
        $scope.addFeedPopupVisibilityEnabled = true;
        $scope.feed = {
            url: ''
        };
    };

    $scope.hideFeedPopup = function () {
        $scope.addFeedPopupVisibilityEnabled = false;
        $scope.editFeedPopupVisibilityEnabled = false;
        $scope.feedNameEnabled = false;
        $scope.feedUrlEnabled = false;
    };

    $scope.confirmDeleteGroup = function () {
        $scope.feedCount = $scope.data.groups[this.$index].feeds.length;
        $scope.confirmMessage = 'В данной группе находится ' +$scope.feedCount+ ' лент(а/ы). Вы уверены, что хотите удалить её?';
        if ($scope.feedCount === 0 || confirm($scope.confirmMessage)) {
            $scope.data.groups.splice(this.$index, 1);
        }
    };

    $scope.validateFormFeed = function () {
        if ($scope.feedForm.$valid) {
            if ($scope.addFeedPopupVisibilityEnabled) {
                $scope.addNewFeed($scope.selectGroupIndex);
                $scope.addFeedPopupVisibilityEnabled = false;
                $scope.feedNameEnabled = false;
                $scope.feedUrlEnabled = false;
            } else if ($scope.editFeedPopupVisibilityEnabled) {
                $scope.editFeed();
                $scope.editFeedPopupVisibilityEnabled = false;
                $scope.feedNameEnabled = false;
                $scope.feedUrlEnabled = false;
            }
        } else {
            $scope.feedNameEnabled = $scope.feedForm.feedFormName.$error.required;
            if ($scope.feedForm.feedFormUrl.$error.url) {
                $scope.feedUrlEnabled = true;
            } else if ($scope.feedForm.feedFormUrl.$error.required) {
                $scope.feedUrlEnabled = true;
            } else {
                $scope.feedUrlEnabled = false;
            }
        }
    };

    $scope.addNewFeed = function (index) {
        $scope.data.groups[index].feeds.push(Object.assign($scope.feed));
        $scope.feed = {};
    };

    $scope.confirmDeleteFeed = function () {
        $scope.confirmMessage = 'Вы уверены, что хотите удалить данную ленту?';
        if (confirm($scope.confirmMessage)) {
            $scope.data.groups[$scope.selectGroupIndex].feeds.splice(this.$index, 1);
        }
    };

    $scope.showEditFeedPopup = function () {
        $scope.editFeedIndex = this.$index;
        $scope.editFeedPopupVisibilityEnabled = true;
        Object.assign($scope.feed, $scope.data.groups[$scope.selectGroupIndex].feeds[$scope.editFeedIndex]);
    };

    $scope.editFeed = function () {
        if ($scope.selectPopupGroupIndex === $scope.selectGroupIndex) {
            $scope.data.groups[$scope.selectGroupIndex].feeds[$scope.editFeedIndex] = {};
            Object.assign($scope.data.groups[$scope.selectGroupIndex].feeds[$scope.editFeedIndex], $scope.feed);
        } else {
            $scope.data.groups[$scope.selectGroupIndex].feeds.splice($scope.editFeedIndex, 1);
            $scope.addNewFeed($scope.selectPopupGroupIndex);
        }
    };
});