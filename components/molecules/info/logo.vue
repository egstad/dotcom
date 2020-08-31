<template>
  <h1 ref="text" class="logo" @click="reanimate($event)">
    <span class="char">E</span>
    <span class="char">G</span>
    <span class="char">S</span>
    <span class="char">T</span>
    <span class="char">A</span>
    <span class="char">D</span>
  </h1>
</template>

<script>
import gsap from 'gsap'

export default {
  data() {
    return {
      timeline: null,
      animations: [
        {
          duration: 0.8,
          opacity: 0,
          scaleX: '0%',
          transformOrigin: '0% 50% -100%',
          ease: 'Power2.easeOut',
          stagger: 0.15,
        },
      ],
      chars: null,
    }
  },
  mounted() {
    this.gsapInit()
    this.observerInit()
  },
  beforeDestroy() {
    this.observerDestroy()
  },
  methods: {
    observerInit() {
      this.observer = new IntersectionObserver(this.onObserverChange)
      this.observer.observe(this.$refs.text)
    },
    observerDestroy() {
      this.observer.unobserve(this.$refs.text)
    },
    gsapInit() {
      // create gsap timeline
      this.timeline = gsap.timeline()
      // cache a reference to each character
      this.chars = this.$refs.text.querySelectorAll('.char')
      // add a data-prop for accessing
      this.chars.forEach((el, index) => {
        el.setAttribute('data-index', index)
      })
    },
    onObserverChange(entry, observer) {
      if (entry[0].isIntersecting) {
        this.animateText()
        this.observer.unobserve(this.$refs.text)
      }
    },
    animateText(animationIndex) {
      const index = animationIndex || 0

      this.timeline.from(this.chars, this.animations[index])
    },
    reanimate(ev) {
      // which character is clicked? start there
      const startIndex = ev.target.dataset.index
      // number of animations
      const shuffleNum = Math.round(Math.random() * 4)

      switch (shuffleNum) {
        case 1:
          this.animWave(startIndex)
          break
        case 2:
          this.animSqueeze(startIndex)
          break
        case 3:
          this.animBold(startIndex)
          break
        case 4:
          this.animSqueeze(startIndex)
          break
        default:
          break
      }
    },
    animWave(startIndex) {
      const multiplier = (parseInt(startIndex) + 1) * 0.01
      const yMin = 10

      this.timeline.to(this.chars, {
        duration: 0.2 + multiplier,
        y: `-${multiplier * 50 * yMin}%`,
        ease: 'Power3.inOut',
        stagger: {
          grid: [1, 6],
          yoyo: true,
          repeat: 1,
          from: startIndex,
          axis: 'x',
          each: multiplier + 0.05,
        },
      })
    },
    animRotate(startIndex) {
      const rotation = Math.round(Math.random() * 360)
      const plusOrMinus = Math.random() < 0.5 ? -1 : 1

      this.timeline.to(this.chars, {
        duration: 0.5,
        scaleX: 0.65,
        rotation: plusOrMinus * rotation,
        transformOrigin: 'center center',
        ease: 'Power2.easeInOut',
        stagger: {
          grid: [1, 6],
          yoyo: true,
          repeat: 1,
          repeatDelay: 0.25,
          from: startIndex,
          axis: 'x',
          each: 0.025,
        },
      })
    },
    animSqueeze(startIndex) {
      const multiplier = parseInt(startIndex) * 0.01

      this.timeline.to(this.chars, {
        duration: 0.5,
        scaleY: 0.1,
        transformOrigin: 'center center',
        // scaleX: 0.1 * multiplier,
        // scaleY: 0.3,
        ease: 'expo.inOut',
        stagger: {
          grid: [1, 6],
          yoyo: true,
          repeat: 1,
          from: startIndex,
          axis: 'x',

          each: multiplier + 0.05,
        },
      })
    },
    animBold(startIndex) {
      this.timeline.to(this.chars, {
        duration: 0.2,
        fontWeight: 800,
        ease: 'expo.inOut',
        stagger: {
          grid: [1, 6],
          yoyo: true,
          repeat: 1,
          from: startIndex,
          axis: 'x',
          each: 0.1,
          onUpdate() {
            this._targets[0].style.fontVariationSettings =
              "'wght' " + this._targets[0].style.fontWeight
          },
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.logo {
  color: rgba(var(--color-foreground), 0.2);
  font-size: calc(28.7vw);
  line-height: 0.45;
  white-space: nowrap;
  transform: translate3d(-0.09em, 0, 0);
  font-variation-settings: 'wght' 400;
  cursor: pointer;

  .char {
    display: table-cell;
    letter-spacing: normal;
    letter-spacing: -0.08em;

    &[data-index='3'] {
      letter-spacing: -0.15em;
    }
  }
}
</style>
