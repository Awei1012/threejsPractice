import * as THREE from 'three'
// GreenSock Animation Platform，简称GSAP，
// 是一个功能强大的JavaScript动画库，提供了丰富的动画功能和高性能的动画引擎，
// 可以用于创建复杂的动画效果。GSAP支持多种动画类型，
// 包括属性动画、时间轴动画、缓动函数等，
// 可以轻松实现元素的移动、旋转、缩放、颜色变化等动画效果。
// GSAP还提供了丰富的插件和工具，使得动画的创建和管理更加方便和高效。
// 无论是简单的过渡动画还是复杂的交互式动画，GSAP都能满足开发者的需求，
// 并且在性能方面表现出色。
import gsap from 'gsap'

const canvas = document.querySelector('.webgl') as HTMLCanvasElement

// 创建场景
const scene = new THREE.Scene()

// 创建正方体
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// 创建相机
const camera = new THREE.PerspectiveCamera(75, 800 / 600)
camera.position.z = 3
scene.add(camera)

//创建渲染器
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(800, 600)

// let time = Date.now()
// const clock = new THREE.Clock()

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })

// Animations
// 每台电脑的刷新率不一样，所以动画效果会不一样。用当前时间减去之前的时间，
// 得到两次调用之间的时间差。
// 用这个时间差乘以一个系数，就可以让动画在不同刷新率的电脑上看起来一样。
const tick = () => {

    // const curTime = Date.now()
    // const deltaTime = curTime - time
    // time = curTime

    // clock.getElapsedTime()方法返回自从创建clock对象以来的时间，单位是秒。
    // const elapsedTime = clock.getElapsedTime()

    // mesh.rotation.y += 0.001 * deltaTime


    // mesh.rotation.y = 1 * elapsedTime
    //每秒转一圈
    // mesh.rotation.y = 1 * elapsedTime * Math.PI * 2
    // 正弦函数转圈
    // mesh.rotation.y = Math.sin(elapsedTime)
    // 正弦+余弦函画圆
    // mesh.position.y = Math.sin(elapsedTime)
    // mesh.position.x = Math.cos(elapsedTime)

    // 用相机实现画圆
    // camera.position.y = Math.sin(elapsedTime)
    // camera.position.x = Math.cos(elapsedTime)
    // camera.lookAt(mesh.position)

    // window.requestAnimationFrame()方法告诉浏览器你希望执行动画，并且要求浏览器在下次重绘之前调用指定的函数来更新动画。
    window.requestAnimationFrame(tick)
    renderer.render(scene, camera)
}
tick()