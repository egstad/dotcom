export const state = () => ({
  width: null,
  height: null,
  isTouch: null,
  isCursor: null,
  isMobile: null,
})

export const mutations = {
  /**
   * Dimensions
   */
  setDimensions(state, val) {
    state.width = val.width
    // window height
    state.height = val.height
  },

  /**
   * Dimensions
   */
  setDevice(state, val) {
    state.deviceIsTouch = val.isTouch
    state.deviceIsCursor = val.isCursor
    state.deviceIsMobile = val.isMobile
  },
}
