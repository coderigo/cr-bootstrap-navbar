'use strict';

describe('Directive: testDirective', function () {

    // load the directive's module and its dependencies
    beforeEach(function(){
        module('ui.router');
        module('angular-underscore');
        module('cr.bootstrap.navbar');
        module('crBootstrapNavbarApp'); // Use demo app to test for now.
    });

    var element,
        scope,
        $state,
        element,
        navbarContainer,
        brandNavElement,
        linkGroups,
        applyScope = function($rootScope){
            $rootScope.$apply();
            navbarContainer = element.find('.container-fluid');
            brandNavElement = $(navbarContainer.children()[0]);
            linkGroups      = $(navbarContainer.children()[1]).children('.navbar-collapse > ul');
        },
        getNavConfigs = function($state){
            return _.chain($state.get())
                    .filter(function(state){ // States with defined custom data bsNav
                        return _.has(state, 'data') && _.has(state.data, 'bsNav');
                    })
                    .value();
        };

    beforeEach(inject(function ($rootScope, $compile) {
        scope  = $rootScope.$new();
        element = $compile(
                    angular.element('<div cr-bootstrap-navbar css-inverse="true"></div>')
                )(scope);
    }));

    it('should add a brand navbar header as the first element in the nav', inject(function ($state, $rootScope) {
        var brandStateName = 'readme',
            targetState    = $state.get(brandStateName);
        
        $state.go(brandStateName);
        applyScope($rootScope);

        expect(targetState).toBe($state.current);

        var brandNavLink = brandNavElement.children('a');

        expect(brandNavLink).toBeTruthy();
        expect(brandNavLink.text()).toBe(targetState.data.bsNav.textDisplay);

    }));

    describe('adding link groups to navbar', function(){

        it('should add two link groups', function() {
            expect(linkGroups.length).toBe(2);
        });

        it('should add the correct text to each link', inject(function ($state){

            var expectedGroupTexts = [['Home', 'About', 'Multi-Section'], ['Help', 'Pippo']],
                groupTexts         = [ // Nasty shortcut
                                        _.filter($(linkGroups[0]).find('li > a').text().split(' '), function(string){
                                            return string != '';
                                        }).slice(0,3),
                                        _.filter($(linkGroups[1]).find('li > a').text().split(' '), function(string){
                                            return string != '';
                                        }).slice(0,2)
                                    ];

            expect(expectedGroupTexts).toEqual(groupTexts);
        }));

        it('should add dropdown link texts', inject(function ($state){

            var expectedDropDownTexts = [['Section1', 'Section2', 'Section3'], ['Logout']],
                dropDownTexts         = [ // Nasty shortcut
                                        _.filter($(linkGroups[0]).find('li > a').text().split(' '), function(string){
                                            return string != '';
                                        }).splice(3,3),
                                        _.filter($(linkGroups[1]).find('li > a').text().split(' '), function(string){
                                            return string != '';
                                        }).splice(2,1)
                                    ];

            expect(expectedDropDownTexts).toEqual(dropDownTexts);
        }));

    });

});
