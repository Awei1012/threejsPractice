import * as THREE from 'three'
import './style.css' // 不知道为什么会报错，但是在src文件夹下引入style.css就不会报错，可能是因为vite的配置问题，反正有效果，暂时先这样引入吧

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import gsap from 'gsap'
import * as dat from 'lil-gui'

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

// 监听全屏事件
window.addEventListener('dblclick', () => {
  // 判断当前是否已经全屏，如果已经全屏，就退出全屏，否则就进入全屏
  const fullscreenElement = document.fullscreenElement || (document as any).webkitFullscreenElement
  // 不能作用在safari上，因为safari不支持全屏API，所以需要判断一下，如果不支持全屏API，就不执行全屏操作。safari是苹果浏览器，遇到了再百度吧
  if (!fullscreenElement) {
    // 进入全屏，需要在canvas上请求全屏，而不是在document上请求全屏 ，否则会导致全屏后无法退出全屏
    canvas.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
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

// 1.创建坐标轴，参数=轴线长度
// const axesHelper = new THREE.AxesHelper(10) 
// // 2.必须加入场景才会渲染
// scene.add(axesHelper)

/**
 *  Debug-UI
 */
const gui = new dat.GUI()
gui.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('X轴位置')
gui.add(mesh.position, 'y', -3, 3, 0.01).name('Y轴位置')
gui.add(mesh.position, 'z', -3, 3, 0.01).name('Z轴位置')
gui.add(mesh, 'visible').name('是否显示')
gui.add(material, 'wireframe').name('线框模式')
gui.addColor(material, 'color').name('颜色')

const parameters = {
  spin: () => {
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2, duration: 1 })
  }
}
gui.add(parameters, 'spin').name('旋转')

// const params = { showAxis: true }
// const axes = new THREE.AxesHelper(10)
// scene.add(axes)
// gui.add(params, 'showAxis').name('显示坐标轴').onChange((v: any) => {
//   axes.visible = v
// })

//创建渲染器
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(size.width, size.height)
// 适配设备像素比，防止模糊。在高像素设备上，window.devicePixelRatio会大于1，但过高的像素比可能会导致性能问题，所以限制在2以内。
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// 创建轨道控制器
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Animating
const trick = () => {
  window.requestAnimationFrame(trick)

  controls.update()
  renderer.render(scene, camera)
}
trick()