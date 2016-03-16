//This handles routing and bootstraping tasks
angular.module('mailchimp', ['ui.router', 'mailchimp.controller'])

.run(function() {

    })
    //This configures the routes and associates each route with a view and a controller
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('subscribe', {
            url: '/subscribe',
            views: {
                'master': {
                    templateUrl: 'views/subscription_form.html',
                    controller: 'subscription'
                }
            }
        })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/subscribe');

    })