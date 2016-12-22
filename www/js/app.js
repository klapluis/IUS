angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives', 'app.services'])
        .run(function($ionicPlatform) {
            $ionicPlatform.ready(function() {
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
                if (window.Connection) {
                    if (navigator.connection.type == Connection.NONE) {
                        alert('Internet no funciona en su dispositivo.');
                        $ionicPopup.confirm({
                            title: "Internet no funciona",
                            content: "Internet no funciona en su dispositivo."
                        })
                                .then(function(result) {
                                    if (!result) {
                                        ionic.Platform.exitApp();
                                    }
                                });
                    }
                }
            });
        })
