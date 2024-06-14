<template>
  <div>
    <div id="su7"></div>
  </div>
</template>
        
<script setup>
import * as THREE from "three";
import { Scene } from "three";
import { reactive, onMounted } from "vue";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";
import Tween from "@tweenjs/tween.js";

import SU7 from "../assets/SU7.glb";
import cizhuan from "../assets/瓷砖.jpg";

const initScence = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    canvas: window.canvas,
    antialias: true,
    precision: "highp",
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  new GLTFLoader().load(SU7, function (gltf) {
    const carModel = gltf.scene;
    carModel.rotation.y = Math.PI;
    scene.add(carModel);
  });

  //   轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.maxDistance = 10;
  controls.minDistance = 4;
  controls.minPolarAngle = (65 / 360) * 2 * Math.PI;
  controls.maxPolarAngle = (80 / 360) * 2 * Math.PI;

  //   灯光
  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  const light = new THREE.SpotLight("#ffffff", 20);
  light.angle = Math.PI / 2;
  light.penumbra = 0;

  light.distance = 0;
  light.shadow.radius = 10;
  light.power = 300;
  light.shadow.mapSize.set(4096, 4096);
  light.position.set(0, 4, 0);
  light.target.position.set(0, 0, 0);
  light.castShadow = true;
  scene.add(light);

  const width = 2;
  const height = 4;
  const intensity = 2;
  const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
  rectLight.position.set(0, 2.6, 0);
  rectLight.lookAt(0, 0, 0);
  scene.add(rectLight);

  const rectLightHelper = new RectAreaLightHelper(rectLight);
  scene.add(rectLightHelper);

  //地板
  let textureLoader = new THREE.TextureLoader();
  let texture = textureLoader.load(cizhuan);
  // THREE.RepeatWrapping：平铺重复。
  texture.wrapS = texture.wrap = THREE.RepeatWrapping;
  texture.wrapT = texture.wrap = THREE.RepeatWrapping;
  // 设置重复次数
  texture.repeat.set(6, 6);

  const floorGeometry = new THREE.PlaneGeometry(20, 20);
  const material = new THREE.MeshPhysicalMaterial({
    side: THREE.DoubleSide,
    map: texture,
    color: 0x808080,
    metalness: 0.1,
    roughness: 0.4,
  });
  const floor = new THREE.Mesh(floorGeometry, material);
  floor.rotation.x = Math.PI / 2;
  scene.add(floor);

  camera.position.z = 5;
  camera.position.y = 2;

  const animate = (time) => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update()
    Tween.update(time);
  };
  animate();
};

onMounted(() => {
  initScence();
});
</script>
        
