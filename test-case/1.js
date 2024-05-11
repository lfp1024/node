const { EventEmitter } = require("node:events");
// 从 Node.js 15.x 版本开始，AbortController 已经被包含在全局作用域中。不需要导入
// const { AbortController } = require("node:abort-controller");
const fs = require('fs');

const emitter = new EventEmitter();
const ac = new AbortController();
const signal = ac.signal;

function eventHandler() {
  console.log("Event fired!");
}

// 当我们不再想监听事件时可以取消监听
ac.abort('主动取消');

emitter.on("myEvent", eventHandler, { signal }); // 添加事件监听并关联中止信号

// 触发事件
emitter.emit("myEvent");

console.log('ac.signal.reason:', ac.signal.reason);
console.log('is aborted:', signal.aborted)

emitter.emit("myEvent");

// Event fired!
// ac.signal.reason: 取消
// is aborted: true
// Event fired!