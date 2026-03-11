import type {
    ExpressiveCodeConfig,
    LicenseConfig,
    NavBarConfig,
    ProfileConfig,
    SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
    title: "LunaMyth",
    subtitle: "I love the world and everything in it.",
    lang: "zh_CN",     // 语言代码，例如 'en'、'zh_CN'、'ja' 等
    themeColor: {
        hue: 200,      // 主题色的默认色相，范围从 0 到 360。例如 红色: 0, 青色: 200, 蓝绿色: 250, 粉色: 345
        fixed: false,  // 是否向访客隐藏主题取色器（设为 true 则访客无法自行换色）
    },
    banner: {
        enable: true,
        src: "assets/images/banner.jpg",       // 相对于 /src 目录。如果以 '/' 开头，则相对于 /public 目录
        position: "top",                       // 等同于 CSS 的 object-position 属性，仅支持 'top'、'center'、'bottom'。默认为 'center'
        credit: {
            enable: true,                      // 是否显示顶部横幅图片的版权/来源文字
            text: "超かぐや姫！：松仁小果",      // 要显示的版权/来源文字
            url: "https://www.bilibili.com/video/BV1iVFCzYEJR",                  // (可选) 指向原创作品或艺术家主页的 URL 链接
        },
    },
    toc: {
        enable: true,   // 在文章右侧显示目录
        depth: 3,       // 目录中显示的最大标题层级，范围从 1 到 3
    },
    favicon: [
        // 保持此数组为空以使用默认的网站图标 (favicon)
        // {
        //   src: '/favicon/icon.png',    // 网站图标的路径，相对于 /public 目录
        //   theme: 'light',              // (可选) 'light' 或 'dark'，仅当你有适用于亮色和暗色模式的不同图标时才设置
        //   sizes: '32x32',              // (可选) 网站图标的尺寸，仅当你拥有不同尺寸的图标时才设置
        // }
    ],
};

export const navBarConfig: NavBarConfig = {
    links: [
        LinkPreset.Home,
        LinkPreset.Archive,
        LinkPreset.About,
        {
            name: "GitHub",
            url: "https://github.com/saicaca/fuwari", // 内部链接不应包含基础路径 (base path)，因为它会自动添加
            external: true,                           // 显示外部链接图标，并在新标签页中打开
        },
    ],
};

export const profileConfig: ProfileConfig = {
    avatar: "assets/images/avatar.jpg",          // 相对于 /src 目录。如果以 '/' 开头，则相对于 /public 目录
    name: "LunaMyth",
    bio: "ACM | 百合 | 现代折纸 | 日麻",
    links: [
        {
            name: "Bilibili",
            icon: "ri:bilibili-fill", // 访问 https://icones.js.org/ 获取图标代码
            // 如果尚未包含该图标集，你需要自行安装相应的图标集
            // 命令为：`pnpm add @iconify-json/<图标集名称>`
            url: "https://space.bilibili.com/1693462852",
        },
        {
            name: "Steam",
            icon: "fa6-brands:steam",
            url: "https://steamcommunity.com/profiles/76561198991867589/",
        },
        {
            name: "GitHub",
            icon: "fa6-brands:github",
            url: "https://github.com/Madoka330",
        },
        {
            name: "Codeforces",
            icon: "simple-icons:codeforces", 
            url: "https://codeforces.com/profile/sumuyuri",
        },
    ],
};

export const licenseConfig: LicenseConfig = {
    enable: false,
    name: "CC BY-NC-SA 4.0",
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
    // 注意：某些样式（如背景颜色）正被覆盖，请查看 astro.config.mjs 文件。
    // 请选择一个暗色主题，因为此博客主题目前仅支持暗色背景。
    theme: "tokyo-night",
};