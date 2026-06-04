import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('.webgl') as HTMLCanvasElement
const clock = new THREE.Clock()

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // 更新尺寸
  size.width = window.innerWidth
  size.height = window.innerHeight

  // 更新相机
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()

  renderer.setSize(size.width, size.height)
})


// 创建纹理
// const texture = new THREE.TextureLoader()
// const doorColorTexture = texture.load('/src/static/textures/door/color.jpg')
// const doorAlphaTexture = texture.load('/src/static/textures/door/alpha.jpg')
// const doorHeightTexture = texture.load('/src/static/textures/door/height.jpg')
// const doorNormalTexture = texture.load('/src/static/textures/door/normal.jpg')
// const doorAmbientOcclusionTexture = texture.load('/src/static/textures/door/ambientOcclusion.jpg')
// const doorMetalnessTexture = texture.load('/src/static/textures/door/metalness.jpg')
// const doorRoughnessTexture = texture.load('/src/static/textures/door/roughness.jpg')
// const matcapTexture = texture.load('/src/static/textures/matcaps/3.png')
// const gradientTexture = texture.load('/src/static/textures/gradients/3.jpg')

// 创建场景
const scene = new THREE.Scene()

// 创建正方体
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)


// 材质
// const material = new THREE.MeshBasicMaterial({})
// material.map = doorColorTexture
// material.color = new THREE.Color('purple')
// material.wireframe = true
// material.opacity = 0.5

// 设置透明度，0.5 就是半透明，灰色。1是完全不透明,白色。
// 0是完全透明，黑色。
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// 显示两面
// material.side = THREE.DoubleSide

// 这个材质会根据光照的情况显示不同的颜色，
// 适合做金属或者塑料材质
// 一般用于调试法线
// const material = new THREE.MeshNormalMaterial()
// material.wireframe = true

// 网格材质球-可以在无光照前提下模拟光照下的阴影等。
// https://github.com/nidorx/matcaps 可下载材质球
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// 网格深度材质
// 隔远了什么都看不到，拉近了可以看到灰色/白色，适用于做大雾效果
// const material = new THREE.MeshDepthMaterial()

// 受光照影响。Lambert：无高光，漫反射，哑光效果
// 适合做：墙壁、石头、砖块、布料、木头、哑光物体。
// const material = new THREE.MeshLambertMaterial()

// MeshPhong。Phong：有高光，反光效果，亮面 / 光滑效果。
// 类似上面，但是没有光线反射。性能不如上面那个。
// 适合做：塑料玩具、陶瓷、亮面物体、油漆、玻璃框、门、金属（简单金属）。
// const material = new THREE.MeshPhongMaterial()
// // 材质光滑度
// material.shininess = 100
// // 特定颜色的光线反射
// material.specular = new THREE.Color(0x1188ff)

// 网格材质(默认为卡通)
const material = new THREE.MeshToonMaterial()

// 创建球体
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material)
// 创建平面
const plane = new THREE.Mesh( new THREE.PlaneGeometry(1, 1), material)
plane.position.x = 1.5
// 创建圆环
const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), material)
torus.position.x = -1.5
// scene.add(sphere)
// scene.add(plane)
scene.add(sphere, plane, torus)

// 创建相机
const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 3
scene.add(camera)

// 创建灯光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 100)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// 控制器
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//创建渲染器
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(size.width, size.height)

// Animations
const tick = () => {

  const elapsedTime = clock.getElapsedTime()

  // update objects
  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  // 更新控制器（这里是加了阻尼效果）
  controls.update()

  window.requestAnimationFrame(tick)
  renderer.render(scene, camera)
}
tick()