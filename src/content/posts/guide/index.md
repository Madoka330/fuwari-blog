---
title: Fuwari 入门指南
published: 2026-03-11
description: "如何使用此博客模板"
image: "cover.jpg"
tags: ["Fuwari", "Blog", "主题配置"]
category: 指南
draft: false
---

> 封面图片来源：[私を喰べたい、ひとでなし](https://wata-tabe.com/special/endcard/)

此博客模板基于 [Astro](https://astro.build/) 构建。本指南中未提及的内容，你可以在 [Astro 文档](https://docs.astro.build/) 中找到答案。

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