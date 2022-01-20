# popup
一个简单的html弹窗

需要 `jQuery`

## 打开弹窗
```javascript
P.open(width, height, elements, close_callback, callback, options)
```
- `close_callback(rel)` 关闭弹窗后的回调函数`rel`为`close`按钮的`data-rel`值，若返回值为 `true` 则弹窗不会被关闭
- `callback()`  弹窗展示完成后的回调 用于绑定事件

## 关闭弹窗
用户点击带有类名 `close` 且不带有 `disabled` 的元素时关闭弹窗
