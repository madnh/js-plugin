class Plugin {
  constructor(target = null) {
    this.target = target;
    this._mixins = [];
    this._installedPlugins = [];

    this.mixin = this.mixin.bind(this);
    this.applyMixins = this.applyMixins.bind(this);
    this.use = this.use.bind(this);
  }

  /**
   * @param {function} callback
   * @param {{}} [options={}]
   * @returns {Plugin}
   */
  mixin(callback, options = {}) {
    const mixin = {
      func: callback,
      options: options
    };

    this._mixins.push(mixin);

    return this;
  };

  /**
   * @param {*} instance
   * @returns {Plugin}
   */
  applyMixins(instance) {
    for (const mixin of this._mixins) {
      const func = mixin.func;
      const options = mixin.options;

      func.apply(instance, [instance, options]);
    }

    return this;
  }

  /**
   * @param {function|{install: function}} plugin An function or object with `install` function
   * @returns {Plugin}
   */
  use(plugin) {
    const installedPlugins = this._installedPlugins;

    if (installedPlugins.indexOf(plugin) !== -1) {
      return this;
    }

    const target = this.target;

    let args = Array.from(arguments);
    args.shift();
    args.unshift(target);


    if (typeof plugin.install === 'function') {
      plugin.install.apply(target, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(target, args);
    }

    installedPlugins.push(plugin);

    return this;
  };
}

module.exports = Plugin;
