---
title: Windows 链接指南：快捷方式、硬链接、目录联接与符号链接
published: 2026-04-14
updated: 2026-04-15
description: '介绍各种链接的使用方法'
image: 'https://img.lunamyth.love/2026/04/1776102725-艾希.jpg'
tags: [CMD, Windows]
category: '指南'
draft: false 
---

> 封面图片来源：[魔法少女ノ魔女裁判：プルリア](https://x.com/pururia_/status/2043531691365671307)

## 快捷方式（.lnk）

最常见的链接方式，双击执行，可以指向各种文件，文件夹，网页。

### 属性

我们可以设置快捷方式的属性：

- **目标**：快捷方式指向的位置
- **起始位置**：程序依赖的相对位置
- **快捷键**：快速启动快捷方式
- **运行方式**：设置运行时窗口大小
- **备注**：鼠标悬浮在快捷方式时出现的备注语
- **打开文件所在位置**：在文件资源管理器中打开指向文件所在的位置
- **更改图标**：更换快捷方式的图标
- **高级**：设置默认以管理员身份运行此快捷方式

![](https://img.lunamyth.love/2026/04/1776100410-快捷方式属性.jpg)

比如对于 WizTree，只有用管理员模式打开它才能加快扫描速度，这时候把快捷方式的属性修改为默认用管理员身份运行就会方便很多。

### 指向网页

对于指向网页的快捷方式，推荐使用浏览器自带的**将网页作为应用安装**，因为这种方式可以用网页的图标作为快捷方式的图标。

![](https://img.lunamyth.love/2026/04/1776101006-将网页作为应用安装.jpg)

![](https://img.lunamyth.love/2026/04/1776101180-网页应用LunaMyth.jpg)


当然我们也可以自己选择快捷方式的图标，注意可能需要预处理图片将格式转为 `.ico`，这里提供一个 **Pillow** 库的实现方法。

```py
from PIL import Image

file_name = "比恋爱更青涩"
ext_name = "jpg"

img = Image.open(f"{file_name}.{ext_name}")

icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
img.save(f"{file_name}.ico", sizes=icon_sizes)
```

![](https://img.lunamyth.love/2026/04/1776101774-比恋爱更青涩快捷方式.jpg)

## 硬链接（Hard Link）

硬链接的文件只占用一份空间，可以实现所有链接在一起的文件同步修改。这些文件拥有**相同**的地位，但**不能**跨盘符创建。

打开 cmd，输入 `mklink /H "新入口路径" "真实目标路径"` 创建硬链接。

![](https://img.lunamyth.love/2026/04/1776099788-硬链接-创建.jpg)

![](https://img.lunamyth.love/2026/04/1776099878-硬链接-VSCode.jpg)

在当前目录打开终端, 输入 `fsutil hardlink list "文件名"` 查看所有指向这块数据的路径。

![](https://img.lunamyth.love/2026/04/1776099794-硬链接-检测.jpg)

## 目录联接（Junction）

目录联接可以把大文件夹从一个位置移动到另一个位置，能够保证原本的依赖关系不会在文件夹移动位置后发生改变。与硬链接不同，目录联接可以跨盘符。我们以移动 Chrome 浏览器的缓存文件为例：

1. 彻底关闭要移动的程序，可以用任务管理器查看后台还有没有相关程序在运行。

2. 打开路径 `C:\Users\25322\AppData\Local\Google`，剪切当前目录下的 `Chrome` 文件夹到一个新的位置。这里我把 `Chrome` 文件夹剪切到 `D:\Cache` 中。
  
![](https://img.lunamyth.love/2026/04/1776094598-目录联接-剪切.jpg)

3. 打开 cmd 执行创建目录联接的命令。 

```cmd
mklink /J "C:\Users\25322\AppData\Local\Google\Chrome" "D:\Cache\Chrome"
```

![](https://img.lunamyth.love/2026/04/1776094604-目录联接-命令行.jpg)

4. 原本的文件夹多了一个箭头，打开 Chrome 浏览器一切正常。

![](https://img.lunamyth.love/2026/04/1776094698-目录联接-Chrome文件信息.jpg)

![](https://img.lunamyth.love/2026/04/1776094793-目录联接-Chrome正常打开.jpg)

5. 在当前目录打开 cmd，输入 `dir`，文件夹类型变成了 `<JUNCTION>`，成功！

![](https://img.lunamyth.love/2026/04/1776094611-目录联接-命令行确认.jpg)

## 符号链接（Symlink）

与硬链接不同，符号链接可以**跨盘符**链接文件。但是如果将源文件删除，链接将会失效。

以管理员模式打开 cmd 输入 `mklink "新入口路径" "真实目标路径"` 即可创建文件符号链接

- 链接到不同分区的文件

![](https://img.lunamyth.love/2026/04/1776100267-符号链接-创建.jpg)

![](https://img.lunamyth.love/2026/04/1776098127-符号链接-跨盘符.jpg)

- VSCode 中识别符号链接

![](https://img.lunamyth.love/2026/04/1776098124-符号链接-VSCode识别.jpg)

同样的，我们也可以用 `mklink /D "新入口路径" "真实目标路径"` 创建文件夹符号链接，效果和目录联接差不多。

## 添加创建链接到右键菜单

使用 [Link Shell Extension](https://schinagl.priv.at/nt/hardlinkshellext/linkshellextension.html)，它会把创建链接集成到鼠标右键菜单里面，不用记忆命令行就能实现轻松创建链接。

### 安装

确保你的电脑里面已经安装了必要的 `runtime dlls`，然后下载 `Link Shell Extension` 安装程序根据指引安装即可。

![](https://img.lunamyth.love/2026/04/1776216456-安装页面.jpg)

### 演示

我们下面演示如何使用 Link Shell Extension 完成用户开始菜单和公共开始菜单的转移。最终我们会把它们放在 `D:\StartMenu\User` 和 `D:\StartMenu\Public` 里面，简化开始菜单管理。

1. 进行用户开始菜单的转移，进入 `%AppData%\Microsoft\Windows\Start Menu`（对应绝对路径  `C:\Users\25322\AppData\Roaming\Microsoft\Windows\Start Menu`）中，把 `Programs` 里面的所有文件移动到 `D:\StartMenu\User` 中。

![](https://img.lunamyth.love/2026/04/1776216504-用户-移动.jpg)

![](https://img.lunamyth.love/2026/04/1776216492-用户-快捷方式.jpg)

2. 右键 `User`，找到 `选择源连接点`

![](https://img.lunamyth.love/2026/04/1776216500-用户-选择源连接点.jpg)

3. 回到用户开始菜单位置，确保原 ·、`Programs` 文件夹里的所有文件都已成功剪切到 D 盘后，删除原有的 `Programs` 文件夹。右键当前目录，创建为 `目录链接点`

![](https://img.lunamyth.love/2026/04/1776216496-用户-目录连接点.jpg)

4. 生成了一个带有快捷方式小箭头图标的文件夹，名字为 `User`，将其更名为 `Programs`

![](https://img.lunamyth.love/2026/04/1776216488-用户-更名.jpg)

5. 对于公共的 `C:\ProgramData\Microsoft\Windows\Start Menu` 的转移也是同理，不过需要注意权限问题。

![](https://img.lunamyth.love/2026/04/1776232944-公共-用户菜单.jpg)

6. 当我们完成转移之后，可能需要重启一下资源管理器或者电脑。可以发现开始菜单的应用图标都还在，也能正常通过这些图标跳转到对应应用程序。

![](https://img.lunamyth.love/2026/04/1776216479-所有图标都在.jpg)

7. 我们尝试新增一个快捷方式到 `D:\StartMenu\User` 中，发现可以使用搜索轻松查找到对应的程序。

![](https://img.lunamyth.love/2026/04/1776216483-新增一个快捷方式.jpg)

![](https://img.lunamyth.love/2026/04/1776216462-成功找到快捷方式.jpg)

8. 在搜索界面右键打开文件位置，会发现这个位置定位到了用户开始菜单的默认位置。至此，成功实现之前需要命令行才能做到的目录联接。

![](https://img.lunamyth.love/2026/04/1776216467-定位到C盘.jpg)

## 总结

### 不同链接方式对比

| 链接类型 | 作用对象 | 可不可以跨盘符 | 删除源文件后果 | 创建权限 | 
| :--- | :--- | :--- | :--- | :--- |
| 快捷方式（.lnk）| 文件 & 文件夹 | 可以 | 链接失效 | 普通用户 |
| 硬链接（Hard Link）| 文件 | 不可以 | 链接依然有效 | 普通用户 |
| 目录联接（Junction）| 文件夹 | 可以 | 链接失效 | 普通用户 | 
| 符号链接（Symlink）| 文件 & 文件夹 | 可以 | 链接失效 | 管理员 | 

### 命令速查

* **创建硬链接**：`mklink /H "新入口路径" "真实目标路径"`
* **创建目录联接**：`mklink /J "新入口路径" "真实目标路径"`
* **创建文件符号链接**：`mklink "新入口路径" "真实目标路径"`
* **创建文件夹符号链接**：`mklink /D "新入口路径" "真实目标路径"`

### 图形化界面

[Link Shell Extension](https://schinagl.priv.at/nt/hardlinkshellext/linkshellextension.html)
