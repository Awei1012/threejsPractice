// import * as THREE from 'three'

// const canvas = document.querySelector('.webgl') as HTMLCanvasElement

// const size = {
//   width: 800,
//   height: 600
// }

// // 创建场景
// const scene = new THREE.Scene()

// // 创建正方体
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// // 创建相机
// const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
// camera.position.z = 3
// scene.add(camera)

// //创建渲染器
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas
// })
// renderer.setSize(size.width, size.height)
// renderer.render(scene, camera)


import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('.webgl') as HTMLCanvasElement

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

// 创建场景
const scene = new THREE.Scene()

// 创建正方体
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
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