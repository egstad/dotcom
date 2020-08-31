<template>
  <main class="site">
    <section>
      <header class="header">
        <Logo class="logo" />
        <Bio class="bio" />
      </header>
    </section>
    <Details />
    <Egg />
  </main>
</template>

<style lang="scss" scoped>
.site {
  display: flex;
  height: 100%;
  padding: $space;
  justify-content: flex-end;
  flex-direction: column;
}

.header {
  margin-top: 21vmax;
}

.bio {
  position: relative;
  margin-top: $space;
  z-index: 1;
}

.logo {
  position: relative;
  margin-top: $space;
  z-index: 1;
}
</style>

<script>
import Logo from '@/components/molecules/info/logo'
import Egg from '@/components/molecules/info/egg'
import Bio from '@/components/molecules/info/bio'
import Details from '@/components/molecules/info/details'

export default {
  components: {
    Logo,
    Egg,
    Bio,
    Details,
  },
}
</script>
