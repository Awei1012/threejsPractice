import * as THREE from 'three'
// import * as dat from 'lil-gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// 从Threejs中引入字体
// import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
// 引入字体库
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/Addons.js'

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

//DebugUI
// const gui = new dat.GUI()

// 创建场景
const scene = new THREE.Scene()

// 轴辅助工具，即坐标轴
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// 创建相机
const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
camera.position.z = 3
scene.add(camera)

// 控制器
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// 纹理
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/src/static/textures/matcaps/3.png')

// 字体加载器
const fontLoader = new FontLoader();
// fontLoader.load('/fonts/helvetiker_regular.typeface.json', 
//   (font) => {
//   // 加载成功后的逻辑
//   console.log('字体加载完成', font);
// });
// 加载字体（带错误处理！）
// 解决方案：在src同级添加Public，然后将node_modules中的font文件夹添加进去
fontLoader.load(
  '/fonts/FangSong_Regular.json',
  // 成功
  (font) => {
    console.log('✅ 字体加载成功', font);
    // 这里写你的文字生成逻辑
    const textGeometry = new TextGeometry(
      '小马的Threejs练习',
      {
        font: font,
        size: 0.5,
        // height: 0.2, 老版本写法，新版本用：depth
        depth: 0.2,
        curveSegments: 4, // 曲线段，如O，e这种有弧度的字母，减少这个可以提升性能
        bevelEnabled: true, // 斜角启用
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      }
    )
    // threejs默认使用球体边界。即，如果有一个剑的模型，最外层是用一个球体包裹。
    // 现在切换成盒边界
    // textGeometry.computeBoundingBox()
    // 可以显示对应坐标的最大最小值
    // console.log(textGeometry.boundingBox)
    // textGeometry.translate(
    //   - textGeometry.boundingBox?.max.x * 0.5,
    //   - textGeometry.boundingBox?.max.y * 0.5,
    //   - textGeometry.boundingBox?.max.z * 0.5,
    // )

    // textGeometry.computeBoundingBox();
    // 关键：判断包围盒存在
    // - textGeometry.boundingBox?.max.z * 0.5, 会报错说 textGeometry.boundingBox 可能为null
    // if (!textGeometry.boundingBox) {
    //   console.warn("包围盒不存在");
    //   return;
    // }
    // const box = textGeometry.boundingBox;
    // // 文字居中（标准写法）
    // textGeometry.translate(
    //   -(box.max.x + box.min.x) / 2, // X 轴居中
    //   -(box.max.y + box.min.y) / 2, // Y 轴居中
    //   -(box.max.z + box.min.z) / 2  // Z 轴居中
    // );

    // ok，最简单最直接的居中
    textGeometry.center()

    textGeometry.computeBoundingBox();
    const textBounds = textGeometry.boundingBox!; // 一定存在，用 ! 告诉TS

    // 👇 可以调整这个值：文字周围多大范围不生成甜甜圈
    const AVOID_PADDING = 1;


    // const textMaterial = new THREE.MeshBasicMaterial({ wireframe: true  }) // 更新纹理不是网格基本材质
    const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
    const text = new THREE.Mesh(textGeometry, material)
    scene.add(text)

    // 放外面，只创建一个几何体和一个材质，用在100个网格上 来进行优化
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
    // const dountMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
    // 增加装饰物。这里是像甜甜圈，通过随机分布在xyz轴确定位置。使用旋转来调整甜甜圈面向角度

    // for (let i = 0; i < 100; i++) {
    //   const donut = new THREE.Mesh(donutGeometry, material)

    //   const scale = Math.random()

    //   donut.position.x = (Math.random() - 0.5) * 10
    //   donut.position.y = (Math.random() - 0.5) * 10
    //   donut.position.z = (Math.random() - 0.5) * 10

    //   donut.scale.set(scale, scale, scale)

    //   donut.rotation.x = Math.random() * Math.PI
    //   donut.rotation.y = Math.random() * Math.PI

    //   scene.add(donut)
    // }

    for (let i = 0; i < 200; i++) {
      const donut = new THREE.Mesh(donutGeometry, material)

      // 随机位置
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 10

      // ==========================================
      // ✅ 核心：判断是否在文字范围内，如果是，跳过生成
      if (
        x > textBounds.min.x - AVOID_PADDING &&
        x < textBounds.max.x + AVOID_PADDING &&
        y > textBounds.min.y - AVOID_PADDING &&
        y < textBounds.max.y + AVOID_PADDING &&
        z > textBounds.min.z - AVOID_PADDING &&
        z < textBounds.max.z + AVOID_PADDING
      ) {
        continue; // 不生成这个甜甜圈
      }
      // ==========================================

      donut.position.x = x
      donut.position.y = y
      donut.position.z = z

      const scale = Math.random()
      donut.scale.set(scale, scale, scale)

      donut.rotation.x = Math.random() * Math.PI
      donut.rotation.y = Math.random() * Math.PI

      scene.add(donut)
    }
  },
  // 进度（可选）
  (xhr) => {
    console.log(`⏳ 加载进度：${(xhr.loaded / xhr.total) * 100}%`);
  },
  // 错误（关键！）
  (err) => {
    console.error('❌ 字体加载失败', err);
  }
);

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