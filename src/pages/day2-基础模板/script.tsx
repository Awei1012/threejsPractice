import * as THREE from 'three'

const canvas = document.querySelector('.webgl') as HTMLCanvasElement

const size = {
  width: 800,
  height: 600
}

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

//创建渲染器
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(size.width, size.height)
renderer.render(scene, camera)
