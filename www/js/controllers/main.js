'use strict';

/**
 * @ngdoc function
 * @name schnapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the schnapApp
 */
angular.module('schnapApp')
    .controller('MainCtrl', function($scope, $http, $location) {

        $scope.shirts = [];
        $scope.trousers = [];

        $scope.changeView = function(view){
            //code to change view?
            $location.url('/coverflowPage');
            console.log("you have been called!");
        }

        $scope.compareUsers = function() {
            var sameShirt = 0;
            var sameTrousers = 0;

            for (var i = 0; i < $scope.users.length; i++) {
                if ($scope.currentShirt.name == $scope.users[i].currentOutfit.shirts.name) {
                    sameShirt++
                }

                if ($scope.currentTrouser.name == $scope.users[i].currentOutfit.trouser.name) {
                    sameTrousers++
                }
            }
            if (sameShirt > 0 && sameTrousers > 0) {
                $scope.setMatchResult("oh_snap","This is a 100% Match");
            } else if (sameShirt > 0 || sameTrousers > 0) {
                $scope.setMatchResult("so_snap","Do you enjoy being middle of the road?");
            } else {
                $scope.setMatchResult("no_snap","This is a <20% Match");
            }
        }

        $scope.shirtCycle = function() {
           
            var shirtIndex = $scope.shirts.indexOf($scope.currentShirt);
            if (shirtIndex != -1) {
                var slength = $scope.shirts.length;
                var newindex = shirtIndex + 1;

                if (newindex >= slength) {
                    newindex = 0;
                }
                $scope.currentShirt = $scope.shirts[newindex];
            } else {
                $scope.currentShirt = $scope.shirts[0];
            }

            $scope.compareUsers();
        }

        $scope.trouserCycle = function() {
            var trouserIndex = $scope.trousers.indexOf($scope.currentTrouser);
            if (trouserIndex != -1) {
                var tlength = $scope.trousers.length;
                var newindex = trouserIndex + 1;

                if (newindex >= tlength) {
                    newindex = 0;
                }
                $scope.currentTrouser = $scope.trousers[newindex];
            } else {
                $scope.currentTrouser = $scope.trousers[0];
            }
            $scope.compareUsers();
        }

        $scope.getUsers = function() {
            var request = new XMLHttpRequest();
            request.open('GET', 'https://schnapi.herokuapp.com/v1/users');
            request.setRequestHeader('schnapikey', '112358');

            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    console.log('Status:', this.status);
                    console.log('Headers:', this.getAllResponseHeaders());

                    var data=this.responseText;
                    var jsonResponse = JSON.parse(data);

                    for (var i = 0; i < jsonResponse[0].wardrobe.length; i++) {
                        if (jsonResponse[0].wardrobe[i].type == "shirt") {
                            $scope.shirts.push(jsonResponse[0].wardrobe[i]);
                        } else {
                            $scope.trousers.push(jsonResponse[0].wardrobe[i]);
                        }
                    }
                }
            };

            request.send();
            return this.responseText;
        }

        $scope.customStyle = {};
        $scope.result = {message: ""};

        $scope.setMatchResult = function(statusColor, message){
            $scope.customStyle.colorClass = statusColor;
            $scope.result.message = message;
        }

        $scope.users = [{
            "username": "izee",
            "currentOutfit": {
                "shirts": {
                    "color": "all",
                    "name": "T1234"
                },
                "trouser": {
                    "color": "blue",
                    "name": "cargo shorts"
                }
            }
        }, {
            "username": "pete",
            "currentOutfit": {
                "shirts": {
                    "color": "all",
                    "name": "straw shirt"
                },
                "trouser": {
                    "color": "blue",
                    "name": "formal shorts"
                }
            }
        }, {
            "username": "greggers",
            "currentOutfit": {
                "shirts": {
                    "color": "all",
                    "name": "T1234"
                },
                "trouser": {
                    "color": "all",
                    "name": "funkytown"
                }
            }
        }, {
            "username": "rachael",
            "currentOutfit": {
                "shirts": {
                    "color": "all",
                    "name": "T1235"
                },
                "trouser": {
                    "color": "all",
                    "name": "T9879"
                }
            }
        }, {
            "username": "daniel",
            "currentOutfit": {
                "shirts": {
                    "color": "all",
                    "name": "wasp shirt"
                },
                "trouser": {
                    "color": "all",
                    "name": "T9879"
                }
            }
        }, {
            "username": "anu",
            "currentOutfit": {
                "shirts": {
                    "color": "all",
                    "name": "T1236"
                },
                "trouser": {
                    "color": "blue",
                    "name": "T9877"
                }
            }
        }, {
            "username": "zan",
            "currentOutfit": {
                "shirts": {
                    "color": "all",
                    "name": "santa jumper"
                },
                "trouser": {
                    "color": "blue",
                    "name": "T9877"
                }
            }
        }, {
            "username": "paul",
            "currentOutfit": {
                "shirts": {
                    "color": "all",
                    "name": "fleece"
                },
                "trouser": {
                    "color": "blue",
                    "name": "sexy jeans"
                }
            }
        }, {
            "username": "kiera",
            "currentOutfit": {
                "shirts": {
                    "color": "all",
                    "name": "T1234"
                },
                "trouser": {
                    "color": "blue",
                    "name": "T9877"
                }
            }
        }]

        $scope.currentShirt = {
            "color": "all",
            "name": "clickMe",
            "image": "clickMe2.png"
        };
        $scope.currentTrouser = {
            "color": "all",
            "name": "clickMe",
            "image": "trouserClick.png"
        };

        // $scope.$on('$destroy', function() {
        //     socket.unsyncUpdates('thing');
        // });

 $scope.getUsers();
    });
