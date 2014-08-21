'use strict';

angular
    .module('crBootstrapNavbarApp', [
        'ui.router',
        'cr.bootstrap.navbar',
        'ngPrettyJson'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/readme');

        var demoController = function($scope, $state){
            $scope.currentState = $state.current.data;
            $scope.parentState = {
                name : $state.current.parent,
                data : $state.get($state.current.parent).data
            };
        };

        $stateProvider
            // First group of nav links
            .state('readme', {
                url         : '/readme',
                templateUrl : 'views/readme.html',
                data        : {
                    bsNav : {
                        type        : 'brand',
                        textDisplay : 'cr-bootstrap-navbar',
                        group       : 0
                    }
                }
            })
            // Second group of navlinks (left-aligned by default)
            .state('home', {
                url         : '/home',
                templateUrl : 'views/home.html',
                controller  : demoController,
                data        : {
                    bsNav : {
                        textDisplay : 'Home',
                        group       : 1
                    }
                }
            })
            .state('about', {
                url         : '/about',
                templateUrl : 'views/about.html',
                controller  : demoController,
                data        : {
                    bsNav : {
                        textDisplay : 'About',
                        group       : 1
                    }
                }
            })
            .state('multi', {
                url        : '/multi',
                abstract   : true,
                controller : demoController,
                data       : {
                    bsNav : {
                        isDropdown  : true,
                        textDisplay : 'Multi-Section',
                        group       : 1
                    }
                }
            })
                .state('multi.first', {
                    parent      : 'multi',
                    url         : '/first',
                    templateUrl : 'views/multi.first.html',
                    controller  : demoController,
                    data        : {
                        bsNav : {
                            type        : 'dropdownLink',
                            textDisplay : 'Section1'
                        }
                    }
                })
                .state('multi.second', {
                    parent      : 'multi',
                    url         : '/second',
                    templateUrl : 'views/multi.second.html',
                    controller  : demoController,
                    data        : {
                        bsNav : {
                            type        : 'dropdownLink',
                            textDisplay : 'Section2'
                        }
                    }
                })
                .state('multi.third', {
                    parent      : 'multi',
                    url         : '/third',
                    templateUrl : 'views/multi.third.html',
                    controller  : demoController,
                    data        : {
                        bsNav : {
                            type          : 'dropdownLink',
                            textDisplay   : 'Section3'
                        }
                    }
                })
            // Third group of navlinks (explicity right-aligned on first declaration)
            .state('Help', {
                url         : '/help',
                templateUrl : 'views/help.html',
                controller  : demoController,
                data        : {
                    bsNav : {
                        textDisplay : 'Help',
                        group       : 2,
                        align       : 'right'
                    }
                }
            })
            .state('user', {
                url      : '/user',
                abstract : true,
                data     : {
                    bsNav : {
                        isDropdown  : true,
                        textDisplay : 'Pippo',
                        group       : 2
                    }
                }
            })
                .state('user.logout', {
                    parent      : 'user',
                    url         : '/logout',
                    templateUrl : 'views/user.logout.html',
                    controller  : demoController,
                    data        : {
                        bsNav : {
                            type        : 'dropdownLink',
                            textDisplay : 'Logout'
                        }
                    }
                });
    }]);