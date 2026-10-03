# Xun Zhao Personal Homepage

Homepage:
`https://zx2002430.github.io/Personal-Homepage/`

这是一个基于纯静态页面构建的个人研究主页项目，当前包含以下内容：

- 个人主页：首页展示个人简介、研究方向、Sim-to-Real、VLA 与项目入口
- DM-NAV / Dual_Arm_UR5 专题：展示双臂动态避障的元多智能体强化学习方法、仿真结果与真机部署
- 智慧农业专题：围绕项目总览、可视化看板、设备清单、合同对应与调研材料形成一组专题页面
- VLA-MoE 研究专题：展示多任务动作末端专门化、四套件实验结果、学习路由和后续验证计划

项目不依赖前端框架，直接通过 `HTML + CSS + JavaScript` 组织页面与内容，适合本地直接打开，也适合部署到 GitHub Pages、Vercel 或 Netlify。

## 最新更新

- DM-NAV 专题页新增两段仿真与两段真机部署视频，含预览封面和下载入口（2026-10-03）。
- 双臂专题页已依据当前 DM-NAV AAMAS 在投稿件更新（2026-10-02），包含三阶段方法、六种基线对比及 14 种真机条件；论文 PDF 继续通过密码阅读页访问。
- VLA 研究专题与首页中英文入口已同步至 2026-10-02 研究快照，论文计划标为“计划在投”。
- 主页导航中 `Sim-to-Real` 入口已直接跳转到 `dual-ur5.html`，不再单独保留 `Dual_Arm_UR5` 二级入口。
- 首页 Dual_Arm_UR5 项目可视化模块改为直接展示 MuJoCo、ROS 2 / RViz、末端轨迹和 MoveIt 部署 GIF。
- `研究方向概览` 模块调整为更紧凑的三列概览卡片，减少空白区域。
- `智慧农业` 首页模块改为更偏农业场景的绿色视觉体系，并保留原有专题页入口。

## 项目结构

```text
.
├─ index.html                           # 个人主页首页
├─ styles.css                           # 全站共享样式
├─ script.js                            # 首页中英文文案、数据与渲染逻辑
├─ vla-research.html                    # VLA-MoE 方法、阶段结果与实验路线
├─ vla-research.css                     # VLA 专题指标卡、结果表和响应式样式
├─ dual-ur5.html                        # DM-NAV 双臂动态避障与真机验证专题
├─ dual-ur5.css                         # DM-NAV 专题局部样式与结果表
├─ dual-ur5.js                          # Dual_Arm_UR5 页面交互与滚动动画
├─ smart-agriculture.html               # 智慧农业专题总览页
├─ smart-agriculture-dashboard.html     # 智慧农业可视化看板
├─ smart-agriculture-inventory.html     # 智慧农业设备清单页
├─ smart-agriculture-contracts.html     # 智慧农业合同/来源对应页
├─ smart-agriculture-research.html      # 智慧农业调研与论证材料页
├─ smart-agriculture-data.js            # 智慧农业专题数据源
├─ smart-agriculture-pages.js           # 智慧农业专题页面渲染逻辑
└─ assets
   ├─ images                            # 首页展示图、GIF、照片
   ├─ videos                            # DM-NAV 仿真与真机演示视频
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

### 2. Dual_Arm_UR5 项目页

入口文件：`dual-ur5.html`

该页面依据桌面的 `DM_NAV_Deployable_Meta_M.pdf` 在投稿件整理，重点覆盖：

- MuJoCo 跨任务元训练、二阶 support / query 更新、目标任务适应与验证选定的冻结策略
- 48D 全局观测、每臂 24D 局部观测与 6D 关节速度动作
- 四种运动任务的 SR 对比、六种 MARL 基线的系统比较，以及 14 种物理运动条件
- 50 Hz 真机策略、100 Hz 命令看门狗、RGB-D 定位、命令整形与 MuJoCo 影子模型
- 稿件 Figure 1–3 的平台、方法与连续真机执行图
- 独立训练种子、基线预算匹配、重复物理测试及当前控制边界
- Base / RL-Algorithm / Sim-To-Real 平台代码与早期演示资源

维护结果时分别报告严格成功指标 SR、软成功指标 SSR 与软碰撞指标 SCR。保留种子数量、预算内验证选择规则及连续记录统计口径；正弦物理测试的速度列是条件标签。仿真正式测试 20,000 步约 80 s，真机 20,000 步约 400 s。投稿状态保持为“AAMAS 在投”。

相关静态资源主要位于：

- `assets/images/dual-ur5-ppt/`
- `assets/images/dm-nav/`
- `assets/videos/dm-nav/`（仿真与真机部署演示）

保持“研究问题、方法、实验结果、真机部署、平台基础”的内容结构。全文只通过 `dm-nav-paper.html` 密码阅读页访问；不把明文稿件、密码或解密密钥加入仓库。

### 3. 智慧农业专题

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

### 4. VLA 研究专题

`vla-research.html` 展示当前 VLA-MoE 动作末端专门化主线，`vla-research.css` 维护专题局部样式，首页入口与中英文论文计划由 `script.js` 管理。更新时同时维护这三个入口，并同步 `index.html` 的静态标签和脚本缓存版本。

当前结果依据本地 VLA_Moe 的 2026-10-02 周报、2026-10-01 研究路线和 2026-09-25 V17 实验报告。补入新结果时应标明训练协议与快照日期；保留有效低成绩，区分训练种子与测评种子，缺失结果使用“待完成”，按协议分别统计。

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

## 发布与部署

这个项目适合直接部署到静态托管平台：

- GitHub Pages
- Vercel
- Netlify

当前仓库使用 GitHub Pages 自动部署：本地修改完成后提交到 `main`，推送到 `zx2002430/Personal-Homepage`，GitHub Actions 会自动发布到：

```text
https://zx2002430.github.io/Personal-Homepage/
```

常用更新流程：

```powershell
git add .
git commit -m "Update homepage"
git push origin main
```

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

### 本项目当前发布流程

当前仓库采用“本地 Git 仓库 + SSH over 443 + GitHub Pages 自动部署”的方式发布。

最简更新流程：

```powershell
git status
git add .
git commit -m "Update homepage"
git push origin main
```

推送成功后，GitHub Actions 会自动构建并发布 GitHub Pages。站点会更新到：

```text
https://zx2002430.github.io/Personal-Homepage/
```

当前远端仓库：

```text
git@github.com:zx2002430/Personal-Homepage.git
```

### SSH over 443 说明

如果普通 HTTPS 推送或默认 SSH 端口不稳定，可以使用 SSH over 443。该方式通过 `ssh.github.com:443` 访问 GitHub，适合某些网络环境下维护项目。

本机 SSH 配置文件位置：

```text
C:\Users\赵汛\.ssh\config
```

推荐配置形式：

```sshconfig
Host github.com
  HostName ssh.github.com
  User git
  Port 443
  IdentityFile ~/.ssh/<your_github_key>
```

配置完成后，将对应公钥添加到 GitHub 账号的 SSH Keys 中，再确认远端地址为：

```powershell
git remote set-url origin git@github.com:zx2002430/Personal-Homepage.git
```

后续维护时，只需要正常 `commit + push`，不需要重复配置 SSH 或 GitHub Pages。

## 后续维护建议

- 首页结构变更时，同时检查 `index.html` 和 `script.js` 是否一致
- 智慧农业专题新增页面时，同时补充导航入口和数据文件映射
- 文案统一使用 UTF-8 编码保存
- 如果要继续扩展专题模块，优先沿用“数据文件 + 页面渲染脚本”的组织方式，后续维护会轻很多
