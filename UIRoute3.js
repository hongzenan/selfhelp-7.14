var routerApp = angular.module('App', ['ui.router']);
routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'tpl/index.html'
                },
                'topbar@index': {
                    templateUrl: 'tpl/topbar.html',
                    controller: function($scope, $state,$rootScope,$http,$location) {
                        $scope.addUserType = function() {
                            $http.get("message.json").then(function(response){
                                if($scope.search===undefined){

                                }
                                else{
                                    $rootScope.message=response.data.articles;
                                    $rootScope.title=$scope.search;
                                    $location.path('index/result');
                                }
                            })
                        }
                    }
                },
                'main@index': {
                    templateUrl: 'tpl/home.html',
                }
            }
        })
        .state('index.result', {
            url: '/result',
            views: {
                'main@index': {
                    templateUrl: 'tpl/result.html',
                    controller:function($scope,$http){
                        $http.get("message.json").then(function (response) {
//数据源
                            $scope.data = response.data.articles;
//分页总数
                            $scope.pageSize = 10;
                            $scope.pages = Math.ceil($scope.data.length / $scope.pageSize); //分页数
                            $scope.newPages = $scope.pages > 10 ? 10 : $scope.pages;
                            $scope.pageList = [];
                            $scope.selPage = 1;
//设置表格数据源(分页)
                            $scope.setData = function () {
                                $scope.items = $scope.data.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//通过当前页数筛选出表格当前显示数据
                            }
                            $scope.items = $scope.data.slice(0, $scope.pageSize);
//分页要repeat的数组
                            for (var i = 0; i < $scope.newPages; i++) {
                                $scope.pageList.push(i + 1);
                            }
//打印当前选中页索引
                            $scope.selectPage = function (page) {
//不能小于1大于最大
                                if (page < 1 || page > $scope.pages) return;
//最多显示分页数5
                                if (page > 2) {
//因为只显示5个页数，大于2页开始分页转换
                                    var newpageList = [];
                                    for (var i = (page - 3) ; i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)) ; i++) {
                                        newpageList.push(i + 1);
                                    }
                                    $scope.pageList = newpageList;
                                }
                                $scope.selPage = page;
                                $scope.setData();
                                $scope.isActivePage(page);
                                console.log("选择的页：" + page);
                            };
//设置当前选中页样式
                            $scope.isActivePage = function (page) {
                                return $scope.selPage == page;
                            };
//上一页
                            $scope.Previous = function () {
                                $scope.selectPage($scope.selPage - 1);
                            }
//下一页
                            $scope.Next = function () {
                                $scope.selectPage($scope.selPage + 1);
                            };
                        });
                    }
                }
            }
        })
        .state('index.result.detail', {
            url: '/result/detail?type',
            views: {
                'main@index': {
                    templateUrl: 'tpl/detail.html',
                    controller: function($scope,$stateParams,$rootScope) {
                        $rootScope.id=$stateParams.type;
                    }

                }
            }
        })
        .state('index.result.detail1', {
            url: '/result/detail1',
            views: {
                'main@index': {
                    templateUrl: 'tpl/detail1.html',
                }
            }
        })
        .state('index.result.detail2', {
            url: '/result/detail2',
            views: {
                'main@index': {
                    templateUrl: 'tpl/detail2.html',
                }
            }
        })



});

