module.exports = function (ngModule) {
    ngModule.controller('AccountsCtrl', ['$scope', '$mdDialog', 'AccountsService', function ($scope, $mdDialog, AccountsService) {
        // get the token from login process
        AccountsService.fakeLogin();
        // Get all accounts list
        AccountsService.getAll()
            .then(function (response) {
                $scope.accounts = response.data.AccountList;
            }, function (error) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        // Display Create Account Dialog
        $scope.showAccountDialog = function (ev) {
            var dialogOptions = {
                template: require('./create-account.html'),
                controller: CreateAccountController,
                parent: angular.element(document.body),
                targetEvent: ev,
            }
            $mdDialog.show(dialogOptions).then(function (newAccount) {
                $scope.accounts.push(newAccount);
            }, function () {
                // when dialog is canceled
            });
        }

        $scope.updateAccountDialog = function (ev, $index) {
            var dialogOptions = {
                template: require('./update-account.html'),
                controller: UpdateAccountController,
                controllerAs: 'updAccCtrl',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    accounts: $scope.accounts,
                    index: $index
                }
            }
            $mdDialog.show(dialogOptions).then(function (updatedAccount) {
                // iterate through all existing properties 
                // and update them
                for (el in updatedAccount) {
                    $scope.accounts[$index][el] = updatedAccount[el];
                }
            }, function () {
                // when dialog is canceled
            });
        }

        // delete account click
        $scope.deleteAccount = function (ev, $index) {
            if($scope.accounts[$index]){
                AccountsService.deleteAccount($scope.accounts[$index].AccountID).then(function (response) {
                    if (response.status == 204) {
                        // delete html element from DOM
                        var el = angular.element(document.querySelector('[acc-index="' + $index + '"]'));
                        el.remove();
                    }
                }, function (error) {
                    console.log("one error has occured while creating account");
                })
            }
        }


        //  create account dialog controller
        function CreateAccountController($scope, $mdDialog) {

            $scope.hide = function () {
                $mdDialog.hide(null);
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.addAccount = addAccount;

            function addAccount() {
                var accountData = {
                    "Username": $scope.Username,
                    "Password": $scope.Password,
                    "Email": $scope.Email,
                    "FirstName": $scope.FirstName,
                    "MiddleName": $scope.MiddleName,
                    "LastName": $scope.LastName,
                    "Suffix": $scope.Suffix,
                    "Phone": $scope.Phone
                };
                AccountsService.createAccount(accountData).then(function (response) {
                    $mdDialog.hide(response.data);
                }, function (error) {
                    console.log("one error has occured while creating account");
                })
            }
        }

        // update account dialog controller
        function UpdateAccountController($scope, $mdDialog, accounts, index) {
            $scope.AccountID = accounts[index].AccountID;
            $scope.Username = accounts[index].Username;
            $scope.Password = accounts[index].Password;
            $scope.Email = accounts[index].Email;
            $scope.FirstName = accounts[index].FirstName;
            $scope.MiddleName = accounts[index].MiddleName;
            $scope.LastName = accounts[index].LastName;
            $scope.Suffix = accounts[index].Suffix;
            $scope.Phone = accounts[index].Phone;
            $scope.hide = function () {
                $mdDialog.hide(null);
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.updateAccount = function ($ev) {
                var accountData = {
                    "Username": $scope.Username,
                    "Password": $scope.Password,
                    "Email": $scope.Email,
                    "FirstName": $scope.FirstName,
                    "MiddleName": $scope.MiddleName,
                    "LastName": $scope.LastName,
                    "Suffix": $scope.Suffix,
                    "Phone": $scope.Phone
                };
                AccountsService.updateAccount(accountData, $scope.AccountID).then(function (response) {

                    if (response.status == 204)
                        $mdDialog.hide(accountData);
                }, function (error) {
                    console.log("one error has occured while creating account");
                })
            }
        }

    }])
}