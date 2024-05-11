const http = require("http");

// 创建 AbortController 实例
const controller = new AbortController();
const { signal } = controller;

// 发起 HTTP 请求
const req = http.get("http://www.baidu.com", { signal }, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  res.on("data", (chunk) => {
    console.log(`响应主体: ${chunk}`);
  });
});

// 如果请求被中止，则打印错误信息
req.on("error", (err) => {
  console.log('err: ', err);
  if (err.name === "AbortError") {
    console.log("请求被取消");
  } else {
    console.error("请求失败", err);
  }
});

// 例如，用户变更了请求，取消请求
setTimeout(() => {
  controller.abort("用户取消请求");
}, 10);
