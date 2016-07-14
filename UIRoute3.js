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
//����Դ
                            $scope.data = response.data.articles;
//��ҳ����
                            $scope.pageSize = 10;
                            $scope.pages = Math.ceil($scope.data.length / $scope.pageSize); //��ҳ��
                            $scope.newPages = $scope.pages > 10 ? 10 : $scope.pages;
                            $scope.pageList = [];
                            $scope.selPage = 1;
//���ñ������Դ(��ҳ)
                            $scope.setData = function () {
                                $scope.items = $scope.data.slice(($scope.pageSize * ($scope.selPage - 1)), ($scope.selPage * $scope.pageSize));//ͨ����ǰҳ��ɸѡ�����ǰ��ʾ����
                            }
                            $scope.items = $scope.data.slice(0, $scope.pageSize);
//��ҳҪrepeat������
                            for (var i = 0; i < $scope.newPages; i++) {
                                $scope.pageList.push(i + 1);
                            }
//��ӡ��ǰѡ��ҳ����
                            $scope.selectPage = function (page) {
//����С��1�������
                                if (page < 1 || page > $scope.pages) return;
//�����ʾ��ҳ��5
                                if (page > 2) {
//��Ϊֻ��ʾ5��ҳ��������2ҳ��ʼ��ҳת��
                                    var newpageList = [];
                                    for (var i = (page - 3) ; i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)) ; i++) {
                                        newpageList.push(i + 1);
                                    }
                                    $scope.pageList = newpageList;
                                }
                                $scope.selPage = page;
                                $scope.setData();
                                $scope.isActivePage(page);
                                console.log("ѡ���ҳ��" + page);
                            };
//���õ�ǰѡ��ҳ��ʽ
                            $scope.isActivePage = function (page) {
                                return $scope.selPage == page;
                            };
//��һҳ
                            $scope.Previous = function () {
                                $scope.selectPage($scope.selPage - 1);
                            }
//��һҳ
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

