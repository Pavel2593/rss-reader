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
                {name: '15 шрифтов для печати', url: 'https://skillbox.ru/media/design/15_shriftov_ot_skillbox/'}]
        },

        {
            name: 'Смешнявки',
            colorId: 1,
            feeds: [
                {name: 'Пикабу', url: 'https://pikabu.ru/story/byistro_styiril_i_ushel_nazyivaetsya_nashel_6878252'},
                {name: 'World of WarCraft', url: 'https://worldofwarcraft.com/ru-ru/'}]
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

var rssReader = angular.module('rssReaderApp', []);

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

    $scope.validateGroupForm = function () {
        if (!($scope.group.name === '')) {
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

    $scope.confirmGroupDeletion = function () {
        $scope.feedCount = $scope.data.groups[this.$index].feeds.length;
        $scope.confirmationMessage = 'В данной группе находится ' +$scope.feedCount+ ' лент(а/ы). Вы уверены, что хотите удалить её?';
        if ($scope.feedCount === 0 || confirm($scope.confirmationMessage)) {
            $scope.data.groups.splice(this.$index, 1);
        }
    };

    $scope.showAddFeedPopup = function () {
        $scope.selectPopupGroupIndex = $scope.selectGroupIndex;
        $scope.addFeedPopupVisibilityEnabled = true;
        $scope.feed = {
            url: ''
        };
    };

    $scope.showEditFeedPopup = function () {
        $scope.selectPopupGroupIndex = $scope.selectGroupIndex;
        $scope.editFeedIndex = this.$index;
        $scope.editFeedPopupVisibilityEnabled = true;
        Object.assign($scope.feed, $scope.data.groups[$scope.selectGroupIndex].feeds[$scope.editFeedIndex]);
    };

    $scope.validateFeedForm = function () {
        if ($scope.feedForm.$valid) {
            if ($scope.addFeedPopupVisibilityEnabled) {
                $scope.addNewFeed($scope.selectPopupGroupIndex);
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

    $scope.getFavIconUrl = function (url) {
        $scope.favIconUrl = '';
        url.split('/', 3).forEach(function (item) {
            $scope.favIconUrl = $scope.favIconUrl + item + '/';
        });
        $scope.favIconUrl = $scope.favIconUrl + 'favicon.ico';
        return $scope.favIconUrl;
    };

    $scope.addNewFeed = function (index) {
        $scope.data.groups[index].feeds.push(Object.assign($scope.feed));
        console.log($scope.data.groups);
        $scope.feed = {};
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

    $scope.hideFeedPopup = function () {
        $scope.addFeedPopupVisibilityEnabled = false;
        $scope.editFeedPopupVisibilityEnabled = false;
        $scope.feedNameEnabled = false;
        $scope.feedUrlEnabled = false;
    };

    $scope.confirmFeedDeletion = function () {
        $scope.confirmationMessage = 'Вы уверены, что хотите удалить данную ленту?';
        if (confirm($scope.confirmationMessage)) {
            $scope.data.groups[$scope.selectGroupIndex].feeds.splice(this.$index, 1);
        }
    };
});