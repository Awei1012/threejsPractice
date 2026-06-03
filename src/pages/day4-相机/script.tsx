import * as THREE from 'three'

// 轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('.webgl') as HTMLCanvasElement

const size = {
  width: 800,
  height: 600
}

/**
 * cursor
 */
const cursor = {
  x:0,
  y:0
}
window.addEventListener('mousemove', (event) => {
  // event.clientX和event.clientY分别是鼠标在浏览器窗口中的水平和垂直位置，单位是像素。
  // event.clientX / size.width和event.clientY / size.height分别是
  // 鼠标在浏览器窗口中的水平和垂直位置，单位是0到1之间的小数。
  // -0.5是为了让鼠标在屏幕中心时，cursor.x和cursor.y的值为0。
  // 这样就可以让物体在鼠标移动时，围绕屏幕中心旋转。
  cursor.x = event.clientX / size.width - 0.5
  cursor.y = -(event.clientY / size.height - 0.5)
})

// 创建场景
const scene = new THREE.Scene()

// 创建正方体
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// 创建相机
// 透视相机，参数分别是：视野、宽高比、近剪裁面、远剪裁面。 分别是：视野（field of view）是相机的垂直视野角度，单位是度；
// 宽高比（aspect ratio）是渲染器的宽度除以高度；
// 近剪裁面（near clipping plane）是相机能够看到的最近距离；
// 远剪裁面（far clipping plane）是相机能够看到的最远距离。
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100)

// 正交相机，参数分别是：左、右、上、下、近剪裁面、远剪裁面。 分别是：左（left）是相机能够看到的最左边的距离；
// 右（right）是相机能够看到的最右边的距离；
// 上（top）是相机能够看到的最上边的距离；
// 下（bottom）是相机能够看到的最下边的距离；
// 近剪裁面（near clipping plane）是相机能够看到的最近距离；
// 远剪裁面（far clipping plane）是相机能够看到的最远距离。
// const acceptRatio = size.width / size.height
// const camera = new THREE.OrthographicCamera(-1 * acceptRatio, 1 * acceptRatio, 1, -1, 0.1, 100)


camera.position.z = 3
// camera.position.x = 2
// camera.position.y = 2
camera.lookAt(mesh.position)
scene.add(camera)

// 控制器
const controls = new OrbitControls(camera, canvas)

// 这个方法可以让控制器更新它的状态，
// 必须在动画循环中调用它。否则，控制器将无法正确地响应用户输入。

// controls.target.y = 1
// controls.update()
// 让控制器有惯性，鼠标松开后，物体会继续旋转一段时间。
// 需要在tick函数中调用controls.update()方法。
controls.enableDamping = true

//创建渲染器
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(size.width, size.height)

// Animations
const tick = () => {
  // mesh.rotation.y += 0.01

  // 更新相机位置
  // camera.position.x = Math.cos(cursor.x * Math.PI * 2) * 3
  // camera.position.z = Math.sin(cursor.x * Math.PI * 2) * 3
  // camera.position.y = cursor.y * 5
  // camera.lookAt(mesh.position)

  // 更新控制器（这里是加了阻尼效果）
  controls.update()

  window.requestAnimationFrame(tick)
  renderer.render(scene, camera)
}
tick()
