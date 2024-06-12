export default class Viewes{
    

    constructor(id) {
        Cache.enabled = true // 开启缓存
        this.id = id
        this.renderer = undefined
        this.scene = undefined
        this.camera = undefined
        this.controls = undefined
        this.animateEventList = []
        this.#initViewer()
      }
      #initViewer() {
        this.#initRenderer()
        this.#initCamera()
        this.#initScene()
        this.#initControl()
        this.#initSkybox()
        this.#initLight()
    
        const animate = () => {
          requestAnimationFrame(animate)
          this.#updateDom()
          this.#renderDom()
          // 全局的公共动画函数，添加函数可同步执行
          this.animateEventList.forEach(
            event => {
              event.fun && event.content && event.fun(event.content)
            })
        }
    
        animate()
      }
      /**
       * 创建初始化场景界面
       */
      #initRenderer() {
        // 获取画布dom
        this.viewerDom = document.getElementById(this.id)
        // 初始化渲染器
        this.renderer = new WebGLRenderer({
          // logarithmicDepthBuffer: true, // true/false 表示是否使用对数深度缓冲，true性能不好
          antialias: true, // true/false表示是否开启反锯齿
          alpha: true, // true/false 表示是否可以设置背景色透明
          precision: "highp", // highp/mediump/lowp 表示着色精度选择
          premultipliedAlpha: true, // true/false 表示是否可以设置像素深度（用来度量图像的分辨率）
        })
        this.renderer.clearDepth(); // 设置深度缓冲区
        this.renderer.shadowMap.enabled = true // 场景中的阴影自动更新
        this.viewerDom.appendChild(this.renderer.domElement) // 将渲染器添加到画布中
        // 二维标签
        this.labelRenderer = new CSS2DRenderer() // 标签渲染器
        this.labelRenderer.domElement.style.zIndex = 2
        this.labelRenderer.domElement.style.position = 'absolute'
        this.labelRenderer.domElement.style.top = '0px'
        this.labelRenderer.domElement.style.left = '0px'
        this.labelRenderer.domElement.style.pointerEvents = 'none'// 避免HTML标签遮挡三维场景的鼠标事件
        this.viewerDom.appendChild(this.labelRenderer.domElement)
    
        // 三维标签
        this.css3DRenderer = new CSS3DRenderer() // 标签渲染器
        this.css3DRenderer.domElement.style.zIndex = 0
        this.css3DRenderer.domElement.style.position = 'absolute'
        this.css3DRenderer.domElement.style.top = '0px'
        this.css3DRenderer.domElement.style.left = '0px'
        this.css3DRenderer.domElement.style.pointerEvents = 'none'// 避免HTML标签遮挡三维场景的鼠标事件
        this.viewerDom.appendChild(this.css3DRenderer.domElement)
      }
      /**
       * 渲染相机
       */
      #initCamera() {
        this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500000) // 透视相机
        this.camera.position.set(50, 0, 50) // 相机位置
        this.camera.lookAt(0, 0, 0) // 设置相机方向
      }
      /**
       * 渲染场景
       */
      #initScene() {
        this.scene = new Scene()
        this.css3dScene = new Scene()
        this.scene.background = new Color('rgb(5,24,38)')
      }

      
}