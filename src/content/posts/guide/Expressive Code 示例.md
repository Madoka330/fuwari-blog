---
title: Expressive Code 示例
published: 2026-03-11
description: 在 Markdown 中使用 Expressive Code 渲染代码块的效果展示。
tags: [Markdown, Fuwari]
category: 示例
draft: false
---

在这里，我们将探索使用 [Expressive Code](https://expressive-code.com/) 渲染代码块的效果。以下示例基于官方文档，您可以参考官方文档了解更多详情。

## 语法高亮

[语法高亮官方文档](https://expressive-code.com/key-features/syntax-highlighting/)

### 常规语法高亮

```js
console.log('这段代码应用了语法高亮！')
```

### 渲染 ANSI 转义序列

```ansi
ANSI 颜色：
- 常规: [31mRed[0m [32mGreen[0m [33mYellow[0m [34mBlue[0m [35mMagenta[0m [36mCyan[0m
- 加粗: [1;31mRed[0m [1;32mGreen[0m [1;33mYellow[0m [1;34mBlue[0m [1;35mMagenta[0m [1;36mCyan[0m
- 变暗: [2;31mRed[0m [2;32mGreen[0m [2;33mYellow[0m [2;34mBlue[0m [2;35mMagenta[0m [2;36mCyan[0m

256 色 (展示 160-177 号颜色):
[38;5;160m160 [38;5;161m161 [38;5;162m162 [38;5;163m163 [38;5;164m164 [38;5;165m165[0m
[38;5;166m166 [38;5;167m167 [38;5;168m168 [38;5;169m169 [38;5;170m170 [38;5;171m171[0m
[38;5;172m172 [38;5;173m173 [38;5;174m174 [38;5;175m175 [38;5;176m176 [38;5;177m177[0m

完整 RGB 颜色:
[38;2;34;139;34m森林绿 - RGB(34, 139, 34)[0m

文本格式: [1m加粗[0m [2m变暗[0m [3m斜体[0m [4m下划线[0m
```

## 编辑器与终端外框 

[编辑器与终端外框官方文档](https://expressive-code.com/key-features/frames/)

### 代码编辑器外框

```js title="my-test-file.js"
console.log('标题属性示例')
```

---

```html
<div>文件名注释示例</div>
```

### 终端外框

```bash
echo "这个终端外框没有标题"
```

---

```powershell title="PowerShell 终端示例"
Write-Output "这一个有标题！"
```

### 覆盖外框类型

```sh frame="none"
echo "看啊，没有外框了！"
```

---

```ps frame="code" title="PowerShell Profile.ps1"
# 如果不覆盖外框类型，这原本会是一个终端外框
function Watch-Tail { Get-Content -Tail 20 -Wait $args }
New-Alias tail Watch-Tail
```

## 文本与行标记

[文本与行标记官方文档](https://expressive-code.com/key-features/text-markers/)

### 标记整行与行范围

```js {1, 4, 7-8}
// 第 1 行 - 通过行号选中
// 第 2 行
// 第 3 行
// 第 4 行 - 通过行号选中
// 第 5 行
// 第 6 行
// 第 7 行 - 通过范围 "7-8" 选中
// 第 8 行 - 通过范围 "7-8" 选中
```

### 选择行标记类型 (高亮 mark, 插入 ins, 删除 del)

```js title="line-markers.js" del={2} ins={3-4} {6}
function demo() {
  console.log('这行被标记为删除')
  // 这行和下一行被标记为插入
  console.log('这是第二行插入的代码')

  return '这行使用默认的中性高亮标记类型'
}
```

### 为行标记添加标签


http://googleusercontent.com/immersive_entry_chip/0

### 将长标签独立成行显示


http://googleusercontent.com/immersive_entry_chip/1