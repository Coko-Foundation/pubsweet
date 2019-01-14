import config from 'config'

export default class FactoryLibrary {
  constructor() {
    this.path =
      config['pubsweet-component-xpub-simple-formbuilder'] || '../ui/UiAdapter'
    this.instance = this.load()
  }

  load() {
    return import(this.path)
  }

  static create() {
    const library = new FactoryLibrary()
    const NewInstance = library.instance
    return new NewInstance()
  }
}
