import * as THREE from 'three'
// import './style.css' // 不知道为什么会报错，但是在src文件夹下引入style.css就不会报错，可能是因为vite的配置问题，反正有效果，暂时先这样引入吧

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('.webgl') as HTMLCanvasElement

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

/**
 *  材质
 */

// const image = new Image()
// const texture = new THREE.Texture(image)
// // 如果直接使用TextureLoader加载纹理，可能会遇到跨域问题，尤其是在本地开发环境中。
// // 使用Image对象加载纹理可以绕过这个问题，因为它会遵循浏览器的同源策略。
// image.onload = () => {
//   texture.needsUpdate = true
//   // console.log('image loaded')
// }

// image.src = '/src/static/textures/door/color.jpg'
// const textureLoader = new THREE.TextureLoader()

// 纹理加载器，使用纹理加载器加载纹理时，浏览器会自动处理跨域问题，尤其是在本地开发环境中。
const loadingManager = new THREE.LoadingManager()
// loadingManager.onStart = () => {
//   console.log('开始加载')
// }
// loadingManager.onLoad = () => {
//   console.log('加载完成')
// }
// loadingManager.onProgress = () => {
//   console.log('加载中')
// }
// 纹理加载器，一个纹理加载器可以加载多个纹理
const textureLoader = new THREE.TextureLoader(loadingManager)

// 加载门板基础颜色贴图，决定物体本身固有色
const texture = textureLoader.load('/src/static/textures/minecraft.png')
// 加载透明通道贴图，黑白控制模型透明与镂空区域
// const alphaTexture = textureLoader.load('/src/static/textures/door/alpha.jpg')
// // 加载高度凹凸贴图，配合位移修改模型表面凸起凹陷细节
// const heightTexture = textureLoader.load('/src/static/textures/door/height.jpg')
// // 加载法线贴图，在不增加面数前提下模拟表面细微凹凸光影
// const normalTexture = textureLoader.load('/src/static/textures/door/normal.jpg')
// // 加载环境光遮蔽贴图，模拟缝隙角落阴暗阴影，增强立体感
// const ambientOcclusionTexture = textureLoader.load('/src/static/textures/door/ambientOcclusion.jpg')
// // 加载金属度贴图，黑白区分材质金属/非金属属性
// const metalnessTexture = textureLoader.load('/src/static/textures/door/metalness.jpg')
// // 加载粗糙度贴图，控制表面光滑/粗糙程度，影响反光强弱
// const roughnessTexture = textureLoader.load('/src/static/textures/door/roughness.jpg')

// 设置纹理重复和包裹模式，默认情况下，纹理坐标在0到1之间，如果超出这个范围，纹理会被拉伸或者截断。
// 通过设置重复和包裹模式，可以让纹理在超出范围时重复或者镜像。

// 重复
// texture.repeat.x = 2
// texture.repeat.y = 3
// S代表水平轴，T代表垂直轴，设置纹理在水平和垂直方向上的包裹模式为重复
// texture.wrapS = THREE.RepeatWrapping
// texture.wrapT = THREE.RepeatWrapping
// 镜像 
// texture.wrapS = THREE.MirroredRepeatWrapping
// texture.wrapT = THREE.MirroredRepeatWrapping
// 设置纹理偏移，默认情况下，纹理坐标的原点在左下角，通过设置偏移可以改变纹理坐标的原点位置。
// texture.offset.x = 0.5
// texture.offset.y = 0.5
// 设置纹理旋转，默认情况下，纹理坐标的旋转中心在左下角，通过设置旋转可以改变纹理坐标的旋转中心位置。
// texture.rotation = Math.PI / 4
// texture.center.x = 0.5
// texture.center.y = 0.5

// 设置纹理过滤，默认情况下，纹理在缩小或者放大时会使用线性过滤，这会导致纹理模糊，
// 通过设置纹理过滤可以让纹理在缩小或者放大时使用最近点过滤，这样可以保持纹理的清晰度。(反正就是保证纹理图的清晰度 )
texture.minFilter = THREE.NearestFilter
texture.magFilter = THREE.NearestFilter
// 关闭纹理的mipmap生成，mipmap是一种多级渐远纹理，可以在不同距离下使用不同分辨率的纹理来提高性能和视觉效果，
// 但是对于像素风格的纹理来说，mipmap会导致模糊，所以需要关闭。关闭了也会对GPU好点 
texture.generateMipmaps = false

window.addEventListener('resize', () => {
  // 更新尺寸
  size.width = window.innerWidth
  size.height = window.innerHeight

  // 更新相机
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()

  renderer.setSize(size.width, size.height)
})

// 创建场景
const scene = new THREE.Scene()

// 创建正方体
const geometry = new THREE.BoxGeometry(1, 1, 1) 
console.log(geometry.attributes.uv )
// 创建球体
// const geometry = new THREE.SphereGeometry(1, 32, 32)
// 创建圆锥
// const geometry = new THREE.ConeGeometry(1, 2, 32)
// 创建环面
// const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100)

// const material = new THREE.MeshBasicMaterial({  color: 0xff0000 })
const material = new THREE.MeshBasicMaterial({  map: texture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// 创建相机
const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 3
scene.add(camera)

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
  // 更新控制器（这里是加了阻尼效果）
  controls.update()

  window.requestAnimationFrame(tick)
  renderer.render(scene, camera)
}
tick()