<template>
  <h2 ref="text" class="para js-animate animate">{{ text }}</h2>
</template>

<script>
import gsap from 'gsap'
import { SplitText } from '@/plugins/gsap/SplitText'

export default {
  data() {
    return {
      timeline: null,
      splitText: null,
      splitWrap: null,
      chars: null,
      lines: null,
      text:
        'Hello world, I’m Jordan Egstad. I’m a graphic designer and web developer creating expressive and enduring brand identities, websites, apps, typefaces, and more.',
    }
  },
  mounted() {
    this.timeline = gsap.timeline()
    this.splitText = new SplitText(this.$refs.text, {
      type: 'lines',
      linesClass: 'line-child',
    })
    this.splitWrap = new SplitText(this.$refs.text, {
      type: 'lines',
      linesClass: 'line-parent hidden',
    })
    this.lines = this.splitText.lines
    // watch if in view
    this.observer = new IntersectionObserver(this.onObserverChange)
    this.observer.observe(this.$refs.text)
  },
  beforeDestroy() {
    this.observer.unobserve(this.$refs.text)
  },
  methods: {
    onObserverChange(entry, observer) {
      if (entry[0].isIntersecting) {
        this.animateText()
        this.observer.unobserve(this.$refs.text)
      }
    },
    animateText() {
      this.timeline.from(
        '.line-child',
        {
          duration: 0.8,
          opacity: 0,
          y: '100%',
          ease: 'Power2.easeOut',
          stagger: 0.15,
          onComplete: () => {
            // split in reverse order of initialization
            this.splitWrap.revert()
            this.splitText.revert()
          },
        },
        '+=0'
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.para {
  font-family: 'TimesNow-Light';
  font-variation-settings: 'wght' 500;
  line-height: 1;
  font-size: 6.8vw;
  letter-spacing: -0.04em;
  padding-bottom: 0.5em;

  @media (min-width: $vp-md) {
    line-height: 1;
    font-size: 4.74vw;
  }
}
</style>
