Angular (UI-Router) Bootstrap Navbar
========================

A basic [AngularJS](http://angularjs.org) directive for Bootstrap's [navbar](http://getbootstrap.com/components/#navbar) that builds itself based on data entered into [Angular UI-Router](https://github.com/angular-ui/ui-router)'s app configuration.

This is very much a work in progress and could do with a lot of work.

Check out the **[Demo](http://rodrigomartell.com/demos/cr-bootstrap-navbar/#/readme)**.

## Requirements and installation

It is fully intended to be used in conjunction with [Angular UI-Router](https://github.com/angular-ui/ui-router) so you'll need that, as well as [bootstrap](http://getbootstrap.com/), [underscore](http://underscorejs.org/), and [angular-underscore](https://github.com/andresesfm/angular-underscore-module). These will all be installed by the following if you don't already have them:

`bower install --save cr-bootstrap-navbar`

Then make sure your project includes all of the dependencies:

```html

    <script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>

    <script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>

    <script src="bower_components/underscore/underscore.js"></script>

    <script src="bower_components/angular-underscore/angular-underscore.js"></script>

    <script src="bower_components/cr-bootstrap-navbar/src/cr-bootstrap-navbar.js"></script>

```

## Usage and example

Check out the **[Demo](http://rodrigomartell.com/demos/cr-bootstrap-navbar/#/readme)** for more context.
Here is the gist of how it works:

Suppose we wanted to create the following navbar using data in UI Router's state configurations:



In your HTML, where you want your navbar, you'd place the directive and first and second level `ui-views`:

```html

    <!-- Stuff here ....-->

    <body ng-app="myapp">
        
        <!-- The navbar directive, by default not inverse class -->
        <div cr-bootstrap-navbar css-inverse="true"></div>

        <!-- Some demo content -->
        <div class="container">

            <div class="row marketing">

              <div ui-view> <!-- First (top) view level -->

                <div ui-view></div> <!-- Second level nesting -->

              </div>

            </div>

        </div>
    </body>

    <!-- More stuff here ....-->

```

In your app configuration, you'd specify the states as *groups* of links. This is done by adding a `bsNav` property to the [custom data](https://github.com/angular-ui/ui-router/wiki#attach-custom-data-to-state-objects) object of the UI Router state you want to show up in the navbar. For this example it would look like this:

```javscript

angular
    .module('myApp', [
        'ui.router',
        'cr.bootstrap.navbar'
    ])
    .config(function($stateProvider, $urlRouterProvider){

//     stuff here

        $urlRouterProvider.otherwise('/readme');

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
                    data        : {
                        bsNav : {
                            textDisplay : 'Help',
                            group       : 2,
                            align       : 'right'
                        }
                    }
                })
                .state('user', {
                    url  : '/user',
                    data : {
                        bsNav : {
                            isDropdown  : true,
                            textDisplay : 'Pippo',
                            group       : 2
                        }
                    }
                });

//      More stuff here

});

```


## API

The `bsNav` object contains the following properties

`bsNav : {`

**type:** "link" (*default*), "dropDownLink" (a link with sub-links in a dropdown) or "brand" (a right-aligned link with `brand` class),

**textDisplay:** The text to display on the navbar for this state,

**group:** The link group `ul` this link belongs to,

**align:** Whether to align the link group left (default) or right. It only needs to be declared on the first state belonging to the link group

`}`


## Limitations/To-Dos

* Test coverage is undercooked.
* Allow forms to be included in navbar
* Allow icon classes to be specified

## Contributions

This is still pretty raw but if it's useful to others contributions are welcome.

To contribute install prerequisites:

`npm install && bower install`

Then spin up the demo to begin developing and watching changes:

`grunt demo`

Tests can be run with:

`grunt test`

Building can be done with:

`grunt build`

