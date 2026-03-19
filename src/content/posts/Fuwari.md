---
title: Fuwari
published: 2026-03-11
description: "如何使用此博客模板"
image: "https://img.lunamyth.love/2026/03/7c9dcb2fd79973c729ee5d8582b84743.jpg"
tags: ["Fuwari", "Blog", "主题配置"]
category: 指南
draft: false
---

> 封面图片来源：[私を喰べたい、ひとでなし](https://wata-tabe.com/special/endcard/)

此博客模板基于 [Astro](https://astro.build/) 构建。本指南中未提及的内容，你可以在 [Astro 文档](https://docs.astro.build/) 中找到答案。

# Fuwari 入门指南

## 文章的 Front-matter 

```yaml
---
title: 我的第一篇博客文章
published: 2023-09-09
description: 这是我新的 Astro 博客的第一篇文章。
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
---
```

| 属性          | 描述                                                                                                                                                                                                        |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `title`       | 文章的标题。                                                                                                                                                                                                |
| `published`   | 文章发布的日期。                                                                                                                                                                                            |
| `description` | 文章的简短描述。将显示在主页上。                                                                                                                                                                            |
| `image`       | 文章封面图片的路径。<br/>1. 以 `http://` 或 `https://` 开头：使用网络图片<br/>2. 以 `/` 开头：用于 `public` 目录下的图片<br/>3. 不带以上前缀：相对于当前 markdown 文件的路径                                |
| `tags`        | 文章的标签。                                                                                                                                                                                                |
| `category`    | 文章的分类。                                                                                                                                                                                                |
| `draft`       | 如果此文章仍是草稿，它将不会被显示。                                                                                                                                                                        |

## 将文章文件放在哪里

你的文章文件应该放在 `src/content/posts/` 目录中。你也可以创建子目录，以便更好地组织你的文章和资源。

```text
src/content/posts/
├── post-1.md
└── post-2/
    ├── cover.png
    └── index.md
```

# Markdown 扩展功能

## 脚注

你可以在正文需要标注的地方加上 `[^数字或文本]`，然后在文章的任意位置（通常是末尾）对这个标记进行解释定义。解析器会自动把脚注定义归拢到页面的最底部，并生成双向跳转的链接。

这是一个测试脚注的句子[^1]。你还可以添加第二个脚注[^2]。

```markdown
这是一个测试脚注的句子[^1]。你还可以添加第二个脚注[^2]。

[^1]: 这里是第一个脚注的补充说明文本。
[^2]: 脚注里也支持使用 [超链接](https://github.com/saicaca/fuwari) 等其他 Markdown 格式。
```

## GitHub 仓库卡片
你可以添加链接到 GitHub 仓库的动态卡片。在页面加载时，该仓库的信息会直接从 GitHub API 获取并展示。

::github{repo="Fabrizz/MMM-OnSpotify"}

使用代码 `::github{repo="<owner>/<repo>"}` 即可创建一个 GitHub 仓库卡片。

```markdown
::github{repo="saicaca/fuwari"}
```

## 提示块

Fuwari 支持以下类型的提示块：`note`（笔记）、`tip`（提示）、`important`（重要）、`warning`（警告）、`caution`（注意）。

:::note
强调用户即使在快速略读时也应注意的信息。
:::

:::tip
帮助用户更好完成任务或操作的可选建议。
:::

:::important
用户成功完成操作所必不可少的关键信息。
:::

:::warning
由于存在潜在风险，需要用户立即引起重视的关键内容。
:::

:::caution
执行某项操作可能带来的负面后果。
:::

### 基础语法

```markdown
:::note
强调用户即使在快速略读时也应注意的信息。
:::

:::tip
帮助用户更好完成任务或操作的可选建议。
:::
```

### 自定义标题

你可以自定义提示块的标题。

:::note[我的自定义标题]
这是一个带有自定义标题的 note 提示块。
:::

```markdown
:::note[我的自定义标题]
这是一个带有自定义标题的 note 提示块。
:::
```

### GitHub 语法

> [!TIP]
> 同样支持 [GitHub 语法](https://github.com/orgs/community/discussions/16925) 写法的提示块。

```markdown
> [!NOTE]
> 同样支持 GitHub 语法写法的提示块。

> [!TIP]
> 同样支持 GitHub 语法写法的提示块。
```

### 剧透遮挡

你可以在文本中添加剧透遮挡效果（黑条掩盖，点击或悬停显示）。被遮挡的文本内部依然支持 **Markdown** 语法。

这段内容 :spoiler[被隐藏起来了 **哎呀**]！

```markdown
这段内容 :spoiler[被隐藏起来了 **哎呀**]！
```

[^1]: 这里是第一个脚注的补充说明文本。
[^2]: 脚注里也支持使用 [超链接](https://github.com/saicaca/fuwari) 等其他 Markdown 格式。

# Expressive Code 示例

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

# 在文章中嵌入视频

只需从 YouTube 或其他视频平台复制嵌入代码，然后直接粘贴到 Markdown 文件中即可。

```yaml
---
title: 在文章中嵌入视频
published: 2023-10-19
// ...
---

<iframe width="100%" height="468" src="https://www.youtube.com/embed/356MRZ6P5h0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
```

## YouTube

[**【Official MV】ray 超かぐや姫！Version**](https://www.youtube.com/watch?v=356MRZ6P5h0)

<iframe width="100%" height="468" src="https://www.youtube.com/embed/356MRZ6P5h0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Bilibili

[**【魔裁&橘远/填词MAD】妄想感伤代偿联盟（填词cover）「2026魔裁新春会单品」**](https://www.bilibili.com/video/BV13JfGBNE1z)

<iframe width="100%" height="468" src="//player.bilibili.com/player.html?bvid=BV13JfGBNE1z&p=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

# 这是一篇草稿

这篇文章目前处于草稿状态，尚未发布，因此普通读者无法在博客前台看到它。文章内容仍在完善中，可能还需要进一步的编辑和校对。

当文章准备好正式发布时，你只需在 Frontmatter 中将 `draft` 字段修改为 `false` 即可：

```yaml
---
title: 草稿示例
published: 2024-01-11T04:40:26.381Z
tags: [Markdown, Blog, Demo]
category: 示例
draft: false
---
```