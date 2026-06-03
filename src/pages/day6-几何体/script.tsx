import * as THREE from 'three'
import './style.css' // 不知道为什么会报错，但是在src文件夹下引入style.css就不会报错，可能是因为vite的配置问题，反正有效果，暂时先这样引入吧

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('.webgl') as HTMLCanvasElement

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

// 监听窗口变化
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
// BoxGeometry：长，宽，高，宽分段数，高分段数，深分段数
// 这里的分段数是为了让线框模式下的正方体更细致一些，
// 如果不设置分段数，默认是1，那么线框模式下的正方体就只有12条边，看起来比较粗糙
// const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4)

// 创建一个三角形，下面每三个一组，分别是一个顶点的x、y、z坐标
// const positionsArray = new Float32Array(9)

// positionsArray[0] = 0
// positionsArray[1] = 0
// positionsArray[2] = 0

// positionsArray[3] = 0
// positionsArray[4] = 1
// positionsArray[5] = 0

// positionsArray[6] = 1
// positionsArray[7] = 0
// positionsArray[8] = 0



// const positionsArray = new Float32Array([
//   0, 0, 0,
//   0, 1, 0,
//   1, 0, 0
// ])

// // 创建一个BufferGeometry，使用上面定义的顶点数据
// const positionAttribute = new THREE.BufferAttribute(positionsArray, 3)

// // 将顶点数据添加到几何体中，属性名为'position'，这是一个约定俗成的名字，后续在着色器中会用到
// geometry.setAttribute('position', positionAttribute)

// 创建多个三角形
const count = 50
const positionsArray = new Float32Array(count * 3 * 3) // 每个三角形有3个顶点，每个顶点有3个坐标

for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) *  4 // 随机生成顶点坐标，范围在-2到2之间
}

const positionAttribute = new THREE.BufferAttribute(positionsArray, 3)



// 这是一个缓冲属性
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', positionAttribute)

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true
})
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