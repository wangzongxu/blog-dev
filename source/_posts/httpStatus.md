---
title: http 状态码
categories:
- 剪切板
tags:
- 网络
---
整理一些http状态码。
<!-- more -->

### 1xx信息 Informational
状态码 | 说明 | 原文
---|---
100 | 继续 | Continue
101 | 交换协议 | Switching Protocols
102 | 加工 | Processing

### 2××成功 Success
状态码 | 说明 | 原文
---|---
200 | 成功 | OK
201 | 创建 | Created
202 | 接受 | Accepted
203 | 非权威信息 | Non-authoritative Information
204 | 无内容 | No Content
205 | 重置内容 | Reset Content
206 | 部分内容 | artial Content
207 | 多状态 | Multi-Status
208 | 已报告 | Already Reported
226 | IM使用 | IM Used

### 3××重定向 Redirection
状态码 | 说明 | 原文
---|---
300 | 多项选择 | Multiple Choices
301 | 永久移动 | Moved Permanently
302 | 找到 | Found
303 | 见其他 | See Other
304 | 未修改 | Not Modified
305 | 使用代理 | Use Proxy
307 | 临时重定向 | emporary Redirect
308 | 永久重定向 | Permanent Redirect

### 4××客户端错误 Client Error
状态码 | 说明 | 原文
---|---
400 | 错误请求 | Bad Request
401 | 未经授权 | Unauthorized
402 | 付款需要 | Payment Required
403 | 禁止 | Forbidden
404 | 未找到 | Not Found
405 | 方法不允许 | Method Not Allowed
406 | 不可接受 | Not Acceptable
407 | 代理验证需要 | Proxy Authentication Required
408 | 请求超时 | Request Timeout
409 | 冲突 | Conflict
410 | 过时 | Gone
411 | 需要长度字段 | Length Required
412 | 前提条件失败 | Precondition Failed
413 | 有效负载太大 | Payload Too Large
414 | 请求URI太长 | Request-URI Too Long
415 | 不支持的介质类型 | Unsupported Media Type
416 | 请求范围不满意 | Requested Range Not Satisfiable
417 | 未满足期望值 | Expectation Failed
418 | 我是一个茶壶 | I'm a teapot
421 | 错误请求 | Misdirected Request
422 | 不可处理的实体 | Unprocessable Entity
423 | 锁定 | Locked
424 | 失败的依赖关系 | Failed Dependency
426 | 需要升级 | Upgrade Required
428 | 需要前提条件 | Precondition Required
429 | 太多请求 | Too Many Requests
431 | 请求标题字段太大 | Request Header Fields Too Large
444 | 连接没有响应关闭 | Connection Closed Without Response
451 | 不适用于法律理由 | Unavailable For Legal Reasons
499 | 客户关闭请求 | Client Closed Request

### 5××服务器错误 Server Error
状态码 | 说明 | 原文
---|---
500 | 内部服务器错误 | Internal Server Error
501 | 未实施 | Not Implemented
502 | 错误的网关 | Bad Gateway
503 | 服务不可用 | Service Unavailable
504 | 网关超时 | Gateway Timeout
505 | HTTP版本不受支持 | HTTP Version Not Supported
506 | 变种也谈判 | Variant Also Negotiates
507 | 存储不足 | Insufficient Storage
508 | 检测到回路 | Loop Detected
510 | 未扩展 | Not Extended
511 | 网络认证需要 | Network Authentication Required
599 | 网络连接超时错误 | Network Connect Timeout Error
