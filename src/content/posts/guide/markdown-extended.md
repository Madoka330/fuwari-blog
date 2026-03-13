---
title: Markdown 扩展功能
published: 2026-03-11
description: '了解 Fuwari 中更多的 Markdown 扩展功能'
tags: [Markdown, Fuwari]
category: '示例'
draft: false 
---

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