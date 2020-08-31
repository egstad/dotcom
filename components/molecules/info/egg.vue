<template>
  <div
    ref="eggcarton"
    class="eggcarton"
    @mousedown="relocateEggball"
    @touchstart="relocateEggball"
  >
    <div class="eggball" ref="eggball">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import gsap from 'gsap'

export default {
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      mesh: null,
      raf: null,
      meshMoveInterval: null,
      meshMoveDuration: 1700,
      eggBallCoords: null,
      filmLocation: null,
      themeCurrentIndex: 0,
    }
  },
  mounted() {
    this.init()
    this.animate()
    window.addEventListener('resize', this.onWindowResize)

    this.meshMoveInterval = setInterval(
      this.relocateEggball,
      this.meshMoveDuration
    )
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize)
    // kill the animation loop
    cancelAnimationFrame(this.raf)
    // teardown resize event
    window.removeEventListener('resize', this.onWindowResize)
    // window.removeEventListener('mousemove', this.onMouseMove)
    // this.$app.$off('updatePosition')
    clearInterval(this.meshMoveInterval)
  },
  methods: {
    init() {
      this.camera = new THREE.PerspectiveCamera(
        24,
        this.$refs.eggball.clientWidth / this.$refs.eggball.clientWidth,
        1,
        1000
      )
      this.camera.position.z = 500
      this.mouse = new THREE.Vector2()
      this.target = new THREE.Vector2()
      this.scene = new THREE.Scene()
      const texture = new THREE.TextureLoader().load('images/egg/default.jpg')
      const radius = 100
      const widthSegments = 64
      const heightSegments = 64
      const geometry = new THREE.SphereBufferGeometry(
        radius,
        widthSegments,
        heightSegments
      )
      const material = new THREE.MeshBasicMaterial({ map: texture })

      this.mesh = new THREE.Mesh(geometry, material)
      this.mesh.rotation.y = 0.35
      this.scene.add(this.mesh)

      const bgColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--color-background')

      this.scene.fog = new THREE.Fog(`rgb(${bgColor})`, 400, 540)

      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        canvas: this.$refs.canvas,
        antialias: true,
      })
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(
        this.$refs.eggball.clientWidth,
        this.$refs.eggball.clientWidth
      )
    },
    animate() {
      this.raf = requestAnimationFrame(this.animate)
      this.renderer.render(this.scene, this.camera)
    },
    onWindowResize() {
      // update camera
      this.camera.aspect =
        this.$refs.eggball.clientWidth / this.$refs.eggball.clientWidth
      this.camera.updateProjectionMatrix()

      // update renderer
      this.renderer.setSize(
        this.$refs.eggball.clientWidth,
        this.$refs.eggball.clientWidth
      )
    },
    updateEggballCoords() {
      this.eggBallCoords = {
        // if eggBallCoords don't exist yet, start from zero
        // otherwise, cache the old xNew and yNew before they update
        x: !this.eggBallCoords ? 300 : this.eggBallCoords.xNew,
        y: !this.eggBallCoords ? 300 : this.eggBallCoords.yNew,
        xNew: Math.round(
          this.getRandomInt(
            0,
            window.innerWidth - this.$refs.eggcarton.clientWidth
          )
        ),
        yNew: Math.round(
          this.getRandomInt(
            0,
            window.innerHeight - this.$refs.eggcarton.clientHeight
          )
        ),
      }
    },
    setEggballRollVelocity() {
      // x difference
      const xd = this.eggBallCoords.xNew - this.eggBallCoords.x
      // x planes in window
      const xp = window.innerWidth / 24
      // y difference
      const yd = this.eggBallCoords.yNew - this.eggBallCoords.y
      // y planes in document
      const yp = window.innerHeight / 12

      // i fuqd up. somehow these are backwards. but it works. so wutever.
      gsap.to(this.mesh.rotation, 1.5, {
        ease: 'Power4.easeOut',
        y: Math.round((xd / xp) * 0.2),
        x: Math.round((yd / yp) * 0.6),
      })
    },
    relocateEggball() {
      clearInterval(this.meshMoveInterval)
      this.updateEggballCoords()
      this.setEggballRollVelocity()

      gsap.to(this.$refs.eggcarton, 1.5, {
        ease: 'Power4.easeOut',
        x: this.eggBallCoords.xNew,
        y: this.eggBallCoords.yNew,
      })
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * max) + min
    },
  },
}
</script>

<style lang="scss" scoped>
$width: 22vw;
$max-width: 600px;

.eggball {
  height: 100%;
  cursor: pointer;

  canvas {
    width: 100%;
    height: 100%;
  }
}

.eggcarton {
  min-width: 150px;
  min-height: 150px;
  max-width: $max-width;
  max-height: $max-width;
  width: $width;
  height: $width;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  transform: translate3d(40%, -200%, 0);

  &:after {
    content: '';
    display: block;
    min-width: 150px;
    min-height: 150px;
    max-width: $max-width;
    max-height: $max-width;
    width: $width;
    height: $width;
    position: absolute;
    top: 0;
    left: 20%;
    background: black;
    border-radius: 100vw;
    transform-origin: center bottom;
    mix-blend-mode: multiply;
    filter: blur(5px);
    transform: matrix(1, -0.2, 0, 0.8, 0, 0);
    z-index: -1;
    opacity: 0.5;
  }
}
</style>
