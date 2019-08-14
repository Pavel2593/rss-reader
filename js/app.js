/**
 * @license AngularJS v1.7.8
 * (c) 2010-2018 Google, Inc. http://angularjs.org
 * License: MIT
 */
//Модуль
var model = {
    groups: [
        {
            name: 'Програмирование',
            colorId: '7',
            feeds: [
                {name: 'Хабра', url: 'http://habrahabr.ru/rss'},
                {name: 'Хабра 2', url: 'http://habrahabr.ru/rss'},
                {name: 'Хабра 3', url: 'http://habrahabr.ru/rss'}]
        },

        {
            name: 'Дизайн',
            colorId: '6',
            feeds: [
                {name: 'Дизай', url: 'дизайн.рф'}]
        },

        {
            name: 'Смешнявки',
            colorId: '1',
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

    $scope.Group = {
        colorId: '1',
        feeds: []
    };

    $scope.Feed = {};

    $scope.selectGroupIndex = 0;
    $scope.selectPopupGroupIndex = $scope.selectGroupIndex;

    $scope.addFeedPopupVisibleEnabled = false;
    $scope.editFeedPopupVisibleEnabled = false;

    $scope.feedNameEnabled = false;
    $scope.feedUrlEnabled = false;

    $scope.selectGroup = function () {
        $scope.selectGroupIndex = this.$index;
    };

    $scope.searchColorClass = function (id) {
        id = parseInt(id);
        return ($scope.data.colorMarkers.filter(function (colorMarker) {return colorMarker['id'] === id})[0]['className']);
    };

    $scope.validateFormGroup = function () {
        if ($scope.newGroupForm.newGroupForm__name.$valid) {
            $scope.addNewGroup();
        };
    };

    $scope.showAddFeedPopup = function () {
        $scope.selectPopupGroupIndex = $scope.selectGroupIndex;
        $scope.addFeedPopupVisibleEnabled = true;
        $scope.Feed = {
            url: ''
        };
    };

    $scope.addNewGroup = function () {
        $scope.data.groups.push(Object.assign($scope.Group));
        $scope.Group = {
            colorId: '1',
            feeds: []
        };
    };

    $scope.confirmDeleteGroup = function () {
        $scope.feedCount = $scope.data.groups[this.$index].feeds.length;
        $scope.confirmMessage = 'В данной группе находится ' +$scope.feedCount+ ' лент(а/ы). Вы уверены, что хотите удалить её?';
        if ($scope.feedCount === 0 || confirm($scope.confirmMessage)) {
            $scope.data.groups.splice(this.$index, 1);
        };
    };

    $scope.validateFormFeed = function () {
        if ($scope.feedForm.$valid) {
            if ($scope.addFeedPopupVisibleEnabled) {
                $scope.addNewFeed($scope.selectGroupIndex);
                $scope.addFeedPopupVisibleEnabled = false;

                $scope.feedNameEnabled = false;
                $scope.feedUrlEnabled = false;

            } else if ($scope.editFeedPopupVisibleEnabled) {
                $scope.editFeed();
                $scope.editFeedPopupVisibleEnabled = false;

                $scope.feedNameEnabled = false;
                $scope.feedUrlEnabled = false;
            }
        } else {
            $scope.feedNameEnabled = $scope.feedForm.feedForm__name.$error.required;
            $scope.feedUrlEnabled = $scope.feedForm.feedForm__url.$error;
        };
    };

    $scope.addNewFeed = function (index) {
        $scope.data.groups[index].feeds.push(Object.assign($scope.Feed));
        $scope.Feed = {};
    };

    $scope.confirmDeleteFeed = function () {
        $scope.confirmMessage = 'Вы уверены, что хотите удалить данную ленту?';
        if (confirm($scope.confirmMessage)) {
            $scope.data.groups[$scope.selectGroupIndex].feeds.splice(this.$index, 1);
        };
    };

    $scope.showEditFeedPopup = function () {
        $scope.editFeedIndex = this.$index;
        $scope.editFeedPopupVisibleEnabled = true;

        Object.assign($scope.Feed, $scope.data.groups[$scope.selectGroupIndex].feeds[$scope.editFeedIndex]);
    };

    $scope.editFeed = function () {
        if ($scope.selectPopupGroupIndex === $scope.selectGroupIndex) {
            $scope.data.groups[$scope.selectGroupIndex].feeds[$scope.editFeedIndex] = {};
            Object.assign($scope.data.groups[$scope.selectGroupIndex].feeds[$scope.editFeedIndex], $scope.Feed);
        } else {
            $scope.data.groups[$scope.selectGroupIndex].feeds.splice($scope.editFeedIndex, 1);
            $scope.addNewFeed($scope.selectPopupGroupIndex);
        }
    };
});