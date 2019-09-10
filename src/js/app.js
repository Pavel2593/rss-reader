var model = {
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
    ],

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
            name: 'Мобилки',
            colorId: 6,
            feeds: [
                {name: 'Hi-Tech / Мобильная связь', url: 'http://mobidevices.ru'}]
        },

        {
            name: 'Шлак',
            colorId: 1,
            feeds: [
                {name: 'Телеканал дождь', url: 'https://domashniy.ru'}]
        }],
};

var rssReader = angular.module('rssReaderApp', ['ngSanitize']);

rssReader.controller('rssReaderCtrl', function ($scope, $http) {
    $scope.data = model;

    $scope.group = {
        colorId: 1,
        feeds: []
    };

    $scope.feed = {};
    $scope.articles = [];
    $scope.article = {};

    $scope.selectGroupIndex = 0;
    $scope.selectFeedIndex = null;
    $scope.selectArticleIndex = null;
    $scope.selectPopupGroupIndex = $scope.selectGroupIndex;

    $scope.addFeedPopupVisibilityEnabled = false;
    $scope.editFeedPopupVisibilityEnabled = false;
    $scope.descriptionVisibilityEnabled = false;
    $scope.articleReadEnabled = false;
    $scope.loadingArticleEnabled = false;

    $scope.feedNameEnabled = false;
    $scope.feedUrlEnabled = false;


    $scope.selectGroup = function () {
        $scope.selectGroupIndex = this.$index;
        $scope.selectFeedIndex = null;
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
        if (!($scope.group.name == '') && !($scope.group.name == undefined)) {
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

    $scope.confirmFeedDeletion = function () {
        $scope.confirmationMessage = 'Вы уверены, что хотите удалить данную ленту?';
        if (confirm($scope.confirmationMessage)) {
            $scope.data.groups[$scope.selectGroupIndex].feeds.splice(this.$index, 1);
        }
    }

    $scope.checkClickFeedContainer = function () {
        $scope.loadingArticleEnabled = true;
        $scope.articles = [];
        $scope.selectFeedIndex = this.$index;
        $scope.feedUrl = $scope.data.groups[$scope.selectGroupIndex].feeds[this.$index].url;
        $scope.feedUrl = $scope.buildingRssUrl($scope.feedUrl);
        $scope.method = 'GET';
        $scope.url = '/api/feed-url?feedUrl=' + $scope.feedUrl;
        $http({
            method: $scope.method,
            url: $scope.url
        }).then(function successCallback(response) {
            $scope.rssJson = response.data;
            $scope.parsingRssJson($scope.rssJson);
        });
    };

    $scope.buildingRssUrl = function (url) {
        var urlPars = url.split('/');
        url = urlPars[0] + '//' + urlPars[2] + '/rss';
        return url;
    };

    $scope.parsingRssJson = function (rssJson) {
        $scope.test = rssJson;
        $scope.test = $scope.test.rss.channel[0].item;
        $scope.test.forEach(function (item) {
            if (item.title != undefined) {
                $scope.article.title = item.title[0];
            }
            $scope.article.isPermaLink = false;
            if (item.pubDate != undefined) {
                $scope.article.pubData = $scope.getPublicationTime(item.pubDate[0]);
            }
            if (item.description != undefined) {
                $scope.article.description = item.description[0];
            }
            if (item.link != undefined) {
                $scope.article.link = item.link[0];
            }
            $scope.articles.push(Object.assign($scope.article));
            $scope.loadingArticleEnabled = false;
            $scope.article = {};
        });
    };

    $scope.getPublicationTime = function (time) {
        $scope.time = new Date(time);
        $scope.date = $scope.time.getDate();
        if ($scope.date < 10) {
            $scope.date = '0' + $scope.date;
        }
        $scope.month = $scope.time.getMonth() + 1;
        if ($scope.month < 10) {
            $scope.month = '0' + $scope.month;
        }
        $scope.year = $scope.time.getFullYear();
        $scope.hours = $scope.time.getHours();
        if ($scope.hours < 10) {
            $scope.hours = '0' + $scope.hours;
        }
        $scope.minutes = $scope.time.getMinutes();
        if ($scope.minutes < 10) {
            $scope.minutes = '0' + $scope.minutes;
        }
        $scope.time = $scope.date+'.'+$scope.month+'.'+$scope.year+' в '+$scope.hours+':'+$scope.minutes;
        return $scope.time;
    };

    $scope.hideFeedPopup = function () {
        $scope.addFeedPopupVisibilityEnabled = false;
        $scope.editFeedPopupVisibilityEnabled = false;
        $scope.feedNameEnabled = false;
        $scope.feedUrlEnabled = false;
    };
});