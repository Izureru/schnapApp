'use strict';

/**
 * @ngdoc function
 * @name schnapApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the schnapApp
 */
angular.module('schnapApp')
    .controller('MainCtrl', function($scope, $http) {

        $scope.shirts = [""];
        $scope.trousers = [""];
        $scope.reset = function() {
            $scope.greenLight = false;
            $scope.amberLight = false;
            $scope.redLight = false;
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
                $scope.reset();

                $scope.redLight = true;
            } else if (sameShirt >= 1 || sameTrousers >= 1) {
                $scope.reset();

                $scope.amberLight = true;
            } else {
                $scope.reset();

                $scope.greenLight = true;
            }
        }

        $scope.shirtCycle = function() {
            $scope.getUsers();
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
                    console.log('Body:', this.responseText);

                    var data=this.responseText;
                    var jsonResponse = JSON.parse(data);

                    for (var i = 0; i < jsonResponse.length; i++) {
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

        $scope.users = [{
            "username": "izee",
            "currentOutfit": {
                "shirts": {
                    "color": "all",
                    "name": "sexyhawaiishirt"
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
            "username": "leanne",
            "currentOutfit": {
                "shirts": {
                    "color": "all",
                    "name": "straw shirt"
                },
                "trouser": {
                    "color": "blue",
                    "name": "cargo shorts"
                }
            }
        }, {
            "username": "greggers",
            "currentOutfit": {
                "shirts": {
                    "color": "all",
                    "name": "stripey stripes"
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
                    "name": "jumpy jumper"
                },
                "trouser": {
                    "color": "all",
                    "name": "yuppy"
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
                    "name": "cargo shorts"
                }
            }
        }, {
            "username": "anu",
            "currentOutfit": {
                "shirts": {
                    "color": "all",
                    "name": "sexyhawaiishirt"
                },
                "trouser": {
                    "color": "blue",
                    "name": "jim joggers"
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
                    "name": "bad knees"
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
                    "name": "polo"
                },
                "trouser": {
                    "color": "blue",
                    "name": "yuppy"
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

        $scope.$on('$destroy', function() {
            socket.unsyncUpdates('thing');
        });


    });