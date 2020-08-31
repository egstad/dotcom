<template>
  <div class="grid">
    <p class="ts1">
      My many-sided practice is informed by a decade of brand design and product
      development. I’ve served plumbers, political organizations, restaurants,
      magazines, musicians, fashion designers, retailers, banks, non-profits,
      social media networks, tech giants, and design companies alike.
    </p>
    <p class="ts1">
      I’ve found that a playful and generative approach leads to the most
      discerning and individual solutions for brands. It’s also fucking fun (for
      me/clients/users). We need more of that in this world. If you’re looking
      for a hand on your next project, lmk. Portfolio available on request.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: $space;

  @media (min-width: $vp-md) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: $vp-md) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
