!function ($, jQuery, window, document) {
    "use strict";

    /**
     * @constructor
     * @public
     *
     * @param $scope
     * @param $element
     * @param $window
     * @param $stateParams
     * @param {BoardGamesApi} boardGamesApi
     */
    function GamePackshotController($scope, $element, $window, $stateParams, boardGamesApi) {
        var scene, camera, renderer, controls;

        init();

        function init() {
            var width = 500;
            var height = 500;

            // scene
            scene = new THREE.Scene();

            // camera
            camera = new THREE.PerspectiveCamera(45, width/height);
            camera.position.set(0, 0, 100);

            // renderer
            renderer = new THREE.WebGLRenderer({antialias: true});
            renderer.setPixelRatio($window.devicePixelRatio);
            renderer.setSize(width, height);
            renderer.setClearColor(0xECF0F5);

            var rendererElement = renderer.domElement;
            var container = $element.find('div')[0];
            container.appendChild(rendererElement);

            // controls
            controls = new THREE.TrackballControls(camera, rendererElement);

            // lights
            var ambientLight = new THREE.AmbientLight(0xffffff);
            scene.add(ambientLight);

            boardGamesApi.single($stateParams.gameId)
                .then(function (game) {
                    $scope.game = game;

                    if (game.packshot) {
                        // box
                        var geometry = new THREE.CubeGeometry(50, 35, 10);
                        var materials = [
                            new THREE.MeshLambertMaterial({map: getTextureFromBase64(game.packshot.rightImageUrl)}),
                            new THREE.MeshLambertMaterial({map: getTextureFromBase64(game.packshot.leftImageUrl)}),
                            new THREE.MeshLambertMaterial({map: getTextureFromBase64(game.packshot.topImageUrl)}),
                            new THREE.MeshLambertMaterial({map: getTextureFromBase64(game.packshot.bottomImageUrl)}),
                            new THREE.MeshLambertMaterial({map: getTextureFromBase64(game.packshot.frontImageUrl)}),
                            new THREE.MeshLambertMaterial({map: getTextureFromBase64(game.packshot.backImageUrl)})
                        ];
                        var material = new THREE.MeshFaceMaterial(materials);
                        var box = new THREE.Mesh(geometry, material);
                        scene.add(box);
                    }
                });

            animate();
        }

        function getTextureFromBase64(base64Image) {
            var image = angular.element('<img/>')[0];
            var texture = new THREE.Texture(image);
            image.onload = function () {
                texture.needsUpdate = true;
            };
            image.src = base64Image;

            return texture;
        }

        function animate() {
            controls.update();
            renderer.render(scene, camera);

            $window.requestAnimationFrame(animate);
        }
    }

    app.module.controller('gamePackshotController', GamePackshotController);
}();
