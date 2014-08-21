'use strict';

angular.module('cr.bootstrap.navbar', ['ui.router', 'angular-underscore'])
  .directive('crEatClick', [function () {
    return {
        restrict : 'A',
        link     : function postLink(scope, element, attrs) {
            element.click(function(event){
                event.preventDefault();
            });
        }
    };
  }])
  .directive('crBootstrapNavbar', ['$state', function ($state) {
    return {
      template : '<nav class="navbar navbar-default" ng-class="{\'navbar-inverse\' : cssInverse }" role="navigation">' + 
                    '<div class="container-fluid">' +
                        // Brand and toggle nav
                        '<div class="navbar-header">' + 
                          '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#cr-bootstrap-navbar-collapse">' +
                            '<span class="sr-only">Toggle navigation</span>' + 
                            '<span class="icon-bar"></span>' + 
                            '<span class="icon-bar"></span>' + 
                            '<span class="icon-bar"></span>' + 
                          '</button>' + 
                          '<a class="navbar-brand" href="#" ng-if="stateNavConfigs.brand">' + 
                             '{{stateNavConfigs.brand.textDisplay}}' + 
                          '</a>' + 
                        '</div>' + 
                        // Toggable content
                        '<div class="collapse navbar-collapse" id="cr-bootstrap-navbar-collapse">' + 
                            '<ul ng-repeat="group in stateNavConfigs.groups" class="nav navbar-nav navbar-{{group.align}}"">' +
                                '<li' + 
                                ' ng-repeat = "link in group.links"' + 
                                ' ng-class  ="{ active : isCurrentState(link._state.name) }"' + 
                                '>' + 
                                    // Normal links
                                '    <a ' + 
                                '      ng-if   ="!link.isDropdown"' + 
                                '      ui-sref ="{{ link._state.name }}"' + 
                                '    >' + 
                                '        {{ link.textDisplay }}' +
                                '     </a>' +
                                    // Multi links (dropdowns)
                                '    <a ' + 
                                '      ng-if       ="link.isDropdown"' + 
                                '      href        ="#"' + 
                                '      class       ="dropdown-toggle"' + 
                                '      data-toggle ="dropdown"' + 
                                '      cr-eat-click' + 
                                '    >' + 
                                '        {{ link.textDisplay }}' +
                                '        <span class="caret"></span>' +
                                '     </a>' +
                                '    <ul ' + 
                                '      ng-if ="link.isDropdown"' + 
                                '      class ="dropdown-menu"' + 
                                '      role  ="menu"' + 
                                '    >' + 
                                '       <li ' + 
                                '             ng-repeat     ="childLink in link.links"' +
                                '            ui-sref-active ="active"' + 
                                '            ng-class       ="{\'rm-navbar-divider-before\': childLink.dividerBefore}"' +
                                '       >' + 
                                '         <a ui-sref="{{ childLink._state.name }}">' + 
                                '           {{ childLink.textDisplay }}' + 
                                '         </a>' + 
                                '       </li>' + 
                                '    </ul>' + 
                                '</li>' + 
                            '</ul>' + 
                        '</div>' + //.navbar-collapse
                    '</div>' + //.container-fluid
                '</nav>',
      restrict   : 'A',
      scope      : {
        'cssInverse' : '@'
      },
      link       : function postLink(scope, element, attrs) {

        // Private helpers
        var defaults = {
            link : {
                type       : 'link',
                isDropdown : false
            },
            group : {
                align : 'left'
            }
        };

        var bubbleUpNavConfigs = function(allStates){
            return _.chain(allStates)
                    .filter(function(state){ // States with defined custom data bsNav
                        return _.has(state, 'data') && _.has(state.data, 'bsNav');
                    }).map(function(state){ // The bsNav configs
                        var defaultConfig = _.extend({},defaults.link),
                            bsNavConfig   = _.extend(defaultConfig, state.data.bsNav),
                            origState     = angular.copy(state);
                        delete origState.data;
                        return _.extend(bsNavConfig, {_state : origState});
                    }).value();
        };

        var groupToObject = function(group){
            var groupObj = {
                group : group[0].group,
                align : group[0].align ? group[0].align : defaults.group.align,
                links : group
            };
            _.each(group, function(link){
                delete link.group;
                delete link.align;
            });
            return groupObj;
        };

        var filterConfigs = function(configs, configType){
            var filteredConfigs = _.filter(configs, function(config){
                return config[0].type === configType;
            });

            if(configType === 'link'){
                filteredConfigs = _.map(filteredConfigs, function(group){
                    return groupToObject(group);
                });
            }
            return filteredConfigs;
        };

        var getLinkByName = function(name, groups){
            return _.chain(groups)
                    .flatten() // Converts all to one array of links
                    .filter(function(link){
                        return link._state.name === name;
                    })
                    .value()[0];
        };

        var groupifyConfigs = function(configs){
            var groups = _.chain(configs)
                            .filter(function(config){
                                return _.has(config,'group');
                            })
                            .groupBy('group')
                            .values()
                            .value();

            var dropDownLinks = _.filter(configs, function(config){
                return !_.has(config, 'group');
            });

            // Push dropdown links into their parent link's links property
            _.each(dropDownLinks, function(dropDownLink){
                var parentLink = getLinkByName(dropDownLink._state.parent, groups);
                if(!parentLink.links){
                    parentLink.links  = [];
                }
                parentLink.links.push(dropDownLink);
            });

            return groups;
        };

        // Public helper functions
        scope.isCurrentState = function(stateName){ // better than ui-sref-active as it's a fuzzy state
            return $state.is(stateName) || $state.includes(stateName + '.*');
        };

        // Nitty gritty
        var stateNavConfigs = bubbleUpNavConfigs($state.get());
            stateNavConfigs = groupifyConfigs(stateNavConfigs);

        scope.stateNavConfigs = {
            'brand'  : filterConfigs(stateNavConfigs, 'brand')[0][0],
            'groups' : filterConfigs(stateNavConfigs, 'link')
        };

      }
    };
  }]);
