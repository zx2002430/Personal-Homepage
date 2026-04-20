# Xun Zhao Personal Homepage

Homepage:
`https://zx2002430.github.io/Personal-Homepage/`

这是一个基于纯静态页面构建的个人研究主页项目，当前包含两部分内容：

- 个人主页：首页展示个人简介、研究方向、Sim-to-Real、VLA 与项目入口
- 智慧农业专题：围绕项目总览、可视化看板、设备清单、合同对应与调研材料形成一组专题页面

项目不依赖前端框架，直接通过 `HTML + CSS + JavaScript` 组织页面与内容，适合本地直接打开，也适合部署到 GitHub Pages、Vercel 或 Netlify。

## 项目结构

```text
.
├─ index.html                           # 个人主页首页
├─ styles.css                           # 全站共享样式
├─ script.js                            # 首页中英文文案、数据与渲染逻辑
├─ smart-agriculture.html               # 智慧农业专题总览页
├─ smart-agriculture-dashboard.html     # 智慧农业可视化看板
├─ smart-agriculture-inventory.html     # 智慧农业设备清单页
├─ smart-agriculture-contracts.html     # 智慧农业合同/来源对应页
├─ smart-agriculture-research.html      # 智慧农业调研与论证材料页
├─ smart-agriculture-data.js            # 智慧农业专题数据源
├─ smart-agriculture-pages.js           # 智慧农业专题页面渲染逻辑
└─ assets
   ├─ images                            # 首页展示图、GIF、照片
   └─ docs
      ├─ pdf                            # 对外展示或浏览用 PDF
      └─ source                         # 原始 Word / PPT 材料
```

## 页面说明

### 1. 首页

入口文件：`index.html`

当前首页重点展示三块内容：

- `Sim-to-Real` 主模块，副标题为 `Dual_Arm_UR5`
- `智慧农业` 首页展示模块，位于 `Dual_Arm_UR5` 模块下方
- `Vision-Language-Action` 研究方向模块

首页的大部分文案和卡片内容由 `script.js` 动态渲染。

### 2. 智慧农业专题

专题页由以下文件组成：

- `smart-agriculture.html`：总览页
- `smart-agriculture-dashboard.html`：进度与系统结构看板
- `smart-agriculture-inventory.html`：设备与金额清单
- `smart-agriculture-contracts.html`：合同与来源材料映射
- `smart-agriculture-research.html`：调研与论证材料

其中：

- `smart-agriculture-data.js` 负责维护专题数据
- `smart-agriculture-pages.js` 负责把数据渲染到对应页面

如果后续要更新专题内容，优先改 `smart-agriculture-data.js`，而不是逐页手改 HTML。

## 核心文件职责

- `index.html`
  - 定义首页整体结构
  - 放置首页各个模块的容器与锚点

- `script.js`
  - 管理首页中英文文案
  - 管理首页新闻、研究卡片、项目卡片、经历数据
  - 管理语言切换与首页模块渲染

- `styles.css`
  - 管理全站视觉风格、布局、响应式规则
  - 同时覆盖首页和智慧农业专题页样式

- `smart-agriculture-data.js`
  - 集中维护智慧农业专题中的说明文字、指标、时间线、表格内容和入口链接

- `smart-agriculture-pages.js`
  - 将专题数据映射到各个智慧农业页面
  - 控制列表、卡片、表格、PDF 入口等渲染逻辑

## 如何更新内容

### 更新首页内容

主要改两个地方：

1. `index.html`
   - 调整首页区块结构
   - 修改静态标题、模块顺序、按钮入口

2. `script.js`
   - 修改首页文案
   - 修改研究方向、项目卡片、经历信息
   - 修改中英文切换内容

### 更新智慧农业专题

优先修改：

- `smart-agriculture-data.js`

通常不建议直接手改：

- `smart-agriculture-dashboard.html`
- `smart-agriculture-inventory.html`
- `smart-agriculture-contracts.html`
- `smart-agriculture-research.html`

因为这些页面很多内容是依赖数据文件自动渲染的。

### 更新图片与材料

- 首页图片放在 `assets/images/`
- 智慧农业文档材料放在 `assets/docs/pdf/` 与 `assets/docs/source/`

建议：

- 对外展示优先放 PDF
- 原始可编辑文件保存在 `source/`
- 文件命名尽量保持统一，方便后续在数据文件中引用

## 本地预览

最简单的方式：

- 直接用浏览器打开 `index.html`

如果想避免某些本地路径或脚本加载差异，也可以在当前目录启动一个静态服务器，例如：

```powershell
python -m http.server 8000
```

然后访问：

```text
http://localhost:8000
```

## 部署建议

这个项目适合直接部署到静态托管平台：

- GitHub Pages
- Vercel
- Netlify

### GitHub Pages

仓库已补充 GitHub Actions 工作流：

- `.github/workflows/pages.yml`

默认会在 `main` 分支有新提交时自动部署当前静态站点。

如果仓库 Pages 还没有启用，可在 GitHub 仓库中进入：

`Settings` -> `Pages` -> `Build and deployment`

将 `Source` 设为 `GitHub Actions`。

启用后，站点访问地址通常为：

`https://zx2002430.github.io/Personal-Homepage/`

部署时确保以下文件一起上传：

- 根目录下所有 `html / css / js` 文件
- `assets/` 目录

## 后续维护建议

- 首页结构变更时，同时检查 `index.html` 和 `script.js` 是否一致
- 智慧农业专题新增页面时，同时补充导航入口和数据文件映射
- 文案统一使用 UTF-8 编码保存
- 如果要继续扩展专题模块，优先沿用“数据文件 + 页面渲染脚本”的组织方式，后续维护会轻很多
