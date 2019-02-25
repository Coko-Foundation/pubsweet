const componentStore = {
  /**
   * Generic component store
   * All the components in here will be updated whenever the
   * theme is changed. For now just a list of components.
   */
  components: [],
  addComponent(component) {
    /**
     * Adds react component to store
     * @param {object} component - component to store
     */
    this.components.push(component)
  },
  removeComponent(component) {
    /**
     * Removes react component from store
     * @param {object} component - component to be removed from store
     */
    this.components.splice(this.components.indexOf(component), 1)
  },
  getComponents() {
    /**
     * Returns list of components in store
     * @returns {object} - list of components in store
     */
    return this.components
  },
}

export default componentStore
