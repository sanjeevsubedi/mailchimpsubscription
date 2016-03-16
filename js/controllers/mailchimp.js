//This controls view  and data
angular.module('mailchimp.controller', ['mailchimp.services'])

.controller('subscription', function($scope, mailchimpService) {

    $scope.display = false;
    $scope.isDisabled = false;

    $scope.submit = function(form) {

        var user = {};
        user.firstName = $scope.firstName;
        user.lastName = $scope.lastName;
        user.email = $scope.email;

        $scope.display = true;
        $scope.isDisabled = true;

        mailchimpService.doSubscribe(user, function(response) {

            if (response.status == 200) {
                $("#subscriptionForm form").slideUp();
                $("#msg").removeClass('invalid').addClass('valid').html("Your subscription has been confirmed.").show();
            } else {
                $("#msg").removeClass('valid').addClass('invalid').html(response.data.error).show();
            }

            $scope.display = false;
            $scope.isDisabled = false;

        });

        return false;
    }

});