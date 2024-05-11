'use strict';

const {
  ReflectApply,
} = primordials;

class FreeList { // 实现对象的缓存机制，减少因频繁创建和销毁对象带来的性能开销
  constructor(name, max, ctor) { // 初始化时传入的构造函数 ctor
    this.name = name;
    this.ctor = ctor; // 构造函数
    this.max = max;
    this.list = [];
  }

  alloc() {
    return this.list.length > 0 ?
      this.list.pop() :
      // 在指定上下文 this 中，调用任何函数 this.ctor，并传递一个参数数组
      // 相较于直接调用 this.ctor(...arguments) 的好处是更加灵活和安全，尤其是在涉及动态上下文和参数处理时
      ReflectApply(this.ctor, this, arguments);
  }

  free(obj) {
    if (this.list.length < this.max) {
      this.list.push(obj);
      return true;
    }
    return false;
  }
}

module.exports = FreeList;
