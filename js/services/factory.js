//This handles retrieving data and is used by controllers.
angular.module('mailchimp.services', ['mailchimp.constants'])

.factory('mailchimpService', function($http, API) {
    return {

        doCORSRequest: function(options, callback) {
            var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
            var x = new XMLHttpRequest();
            x.open(options.method, cors_api_url + options.url);
            x.onload = x.onerror = function() {
                callback(x.status, x.responseText, x.statusText);
            };

            x.send(options.data);
        },

        doSubscribe: function(user, callbackFunc) {

            /*prepare request body*/
            var userFirstName = user.firstName;
            var userLastName = user.lastName;
            var userEmail = user.email;

            var params = {};
            var user = {};

            user.name = userFirstName + " " + userLastName;
            params.apikey = API.key;
            params.id = API.listId;
            params.email = {};
            params.email.email = userEmail;
            params.merge_vars = {};
            params.merge_vars.FNAME = userFirstName;
            params.merge_vars.LNAME = userLastName;
            params.double_optin = false;
            params.send_welcome = true;


            //console.log(JSON.stringify(params));
            //var params = '{"apikey":"b5e2c25ed525b5c9da8809ede0419b5c-us13","id":"0d2572a717","email":{"email":"sanjeev2lt@gmail.com"},"merge_vars":{"groupings":[{"name":"example name"}]}}';

            /*this.doCORSRequest({
               method: 'POST',
               url: API.url,
               data: JSON.stringify(params)
             }, function callback(status,responseText,statusText) {
               callbackFunc(status,responseText,statusText);
                
             })*/

            $http.post('https://cors-anywhere.herokuapp.com/' + API.url, JSON.stringify(params), {}).then(function(response) {

                callbackFunc(response);

            }, function(response) {

                callbackFunc(response);

            });


        },


    };
})