!function ($, jQuery, window, document) {
    'use strict';

    /**
     * @ngdoc service
     * @public
     * @param $window
     * @param $document
     * @param $q
     * @param $cordovaCamera
     */
    function MobileCamera($window, $document, $q, $cordovaCamera) {

        function takePhoto() {
            var defer = $q.defer();

            var onCordovaDeviceReady = function () {
                var options = {
                    quality: 50,
                    destinationType: $window.Camera.DestinationType.DATA_URL,
                    sourceType: $window.Camera.PictureSourceType.CAMERA,
                    encodingType: $window.Camera.EncodingType.PNG,
                    saveToPhotoAlbum: false,
                    correctOrientation: true
                };

                $cordovaCamera.getPicture(options)
                    .then(function (imageData) {
                        $document[0].removeEventListener('deviceready', onCordovaDeviceReady);
                        defer.resolve("data:image/png;base64," + imageData);
                    }, defer.reject);
            };

            $document[0].addEventListener('deviceready', onCordovaDeviceReady);

            return defer.promise;
        }

        this.takePhoto = function () {
            return takePhoto();
        };
    }

    app.module.service('mobileCamera', MobileCamera);
}();
