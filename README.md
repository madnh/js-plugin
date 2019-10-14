# JS-Plugin

```js
const Plugin = require('js-plugin');
const _plugin = new Plugin();

class Foo{
  constructor(){
    this.name = 'Tom';

    _plugin.applyMixins(this);
  }

  sayHi(){
     alert(`Hi, ${this.name}`);
  } 
}

_plugin.target = Foo;
Foo.mixin = _plugin.mixin;
Foo.use = _plugin.use;

Foo.mixin(function(foo){
  foo.name = 'Jerry';
});
Foo.use(function(Foo){
  Foo.prototype.sayHi = function(){
    alert(`Hello, ${this.name}`);
  }
});


var foo = new Foo();

foo.sayHi();
```
