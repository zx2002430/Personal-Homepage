const STORAGE_KEY = "homepage-language";
const DEFAULT_LANGUAGE = "zh";
const SITE_URL = "https://zx2002430.github.io/Personal-Homepage/";

const uiText = {
  zh: {
    meta: {
      title: "赵汛 | 湖北大学个人研究主页",
      description: "湖北大学赵汛的个人研究主页，聚焦 VLA、具身智能、强化学习与机械臂操作。"
    },
    trail: {
      homeLabel: "首页",
      homeCurrent: "个人研究主页"
    },
    nav: {
      skip: "跳转到主要内容",
      about: "简介",
      vla: "VLA方向",
      simtoreal: "Sim-to-Real方向",
      agriculture: "智慧农业专题",
      news: "研究动态",
      publications: "代表研究",
      directions: "研究方向",
      projects: "系统项目",
      experience: "教育背景",
      contact: "联系方式"
    },
    hero: {
      eyebrow: "个人研究主页",
      subtitle: "湖北大学人工智能学院研究生｜研究方向：VLA、智慧农业、具身智能、强化学习与机械臂控制",
      text:
        '我目前在湖北大学人工智能学院开展研究训练，依托 <a href="https://eilab-wanghong.eu.cc/" target="_blank" rel="noopener noreferrer">EILab</a>，主要关注视觉语言行动模型、智慧农业、具身智能与强化学习机械臂控制。当前工作集中于双臂操作系统、仿真到真实部署，以及面向真实场景和农业场景的感知与控制闭环。',
      viewResearch: "查看研究",
      getInTouch: "联系我",
      lab: "实验室",
      github: "GitHub",
      cv: "仓库",
      email: "邮箱",
      identityRole: "研究生，EILab",
      identitySchool: "湖北大学人工智能学院",
      focusLabel: "研究焦点",
      focusValue: "VLA / 智慧农业 / 具身智能 / 强化学习操作",
      nowLabel: "当前工作",
      nowValue: "研究具身智能体与机器人学习",
      locationLabel: "所在地",
      locationValue: "中国，武汉"
    },
    about: {
      eyebrow: "关于",
      title: "简介",
      p1:
        "我的研究围绕 <strong>Vision-Language-Action</strong>、<strong>智慧农业</strong>、<strong>具身智能</strong> 与 <strong>强化学习和机械臂控制</strong> 展开，重点关注视觉理解、动作生成、策略学习与机器人执行之间的衔接。",
      p2:
        "目前的工作重点包括双臂操作、多模态感知、语言条件决策、智慧农业场景中的智能系统，以及 Sim-to-Real 部署。我希望持续积累可复现、可扩展、面向真实系统的研究成果。",
      interestsTitle: "研究兴趣",
      tags: {
        vla: "视觉语言行动",
        embodied: "具身智能",
        rl: "强化学习",
        robot: "机器人操作",
        cv: "计算机视觉",
        policy: "策略学习",
        agriculture: "智慧农业"
      }
    },
    dualArm: {
      eyebrow: "代表项目",
      note: "当前最具代表性的研究项目，集中体现双臂操作、学习控制与真实系统部署能力。",
      badge: "核心研究",
      overviewTitle: "从 MuJoCo 仿真到真实双臂 UR5 部署的完整研究链路",
      snapshotTitle: "项目概览",
      pipelineTitle: "研究链路",
      highlightsTitle: "核心亮点",
      focusLabel: "系统聚焦",
      focusItem1: "Dual-Arm UR5",
      focusItem2: "MuJoCo + PPO",
      focusItem3: "ROS 2 + MoveIt",
      focusItem4: "真实部署",
      galleryTitle: "项目可视化",
      galleryNote: "以下展示覆盖真实平台、仿真环境、控制实验与部署过程，均来自当前项目的实际实验记录。",
      media: {
        realKicker: "真实系统",
        realType: "实验室照片",
        realTitle: "真实双臂 UR5 实验平台实拍图",
        realDesc: "展示双臂本体、工作台与相机安装布局，是主页里最直观的真实系统入口。",
        simKicker: "仿真",
        simType: "MuJoCo",
        simTitle: "MuJoCo 双臂仿真交互演示",
        simDesc: "突出仿真环境中的双臂协作行为与基础控制效果。",
        vizKicker: "可视化",
        vizType: "ROS 2 + RViz",
        vizTitle: "ROS 2 + RViz 双臂仿真演示",
        vizDesc: "体现机器人描述、可视化与控制链路在 ROS 2 环境中的联动。",
        ctrlKicker: "控制",
        ctrlType: "轨迹跟踪",
        ctrlTitle: "双臂末端轨迹跟踪演示",
        ctrlDesc: "对应任务空间控制与末端跟踪效果，是控制模块的重要展示。",
        deployKicker: "MoveIt",
        deployType: "真机",
        deployTitle: "MoveIt 真机部署演示",
        deployDesc: "展示双臂平台上的规划与执行过程。"
      }
    },
    smartAgri: {
      eyebrow: "展示模块",
      title: "智慧农业",
      subtitle: "Smart Agriculture Suite",
      note: "面向农田场景的感知、控制与数字化系统展示，涵盖总览、可视化看板、设备清单与论证材料。",
      badge: "场景模块",
      repo: "300 亩核心农田 / 四情监测 / 灌溉控制",
      overviewTitle: "从农田感知到平台联动的智慧农业系统展示",
      showcaseKicker: "Field Sensing to Platform Coordination",
      showcaseTitle: "智慧农业专题入口",
      showcaseText: "将农田感知、传输控制、可视化看板和研究材料整合为一组连续页面，适合在首页直接展示项目结构与当前推进重点。",
      showcasePill1: "四情监测",
      showcasePill2: "灌溉控制",
      showcasePill3: "数字化看板",
      entryOverviewKicker: "Overview",
      entryOverviewTitle: "专题总览",
      entryDashboardKicker: "Dashboard",
      entryDashboardTitle: "可视化看板",
      entryInventoryKicker: "Inventory",
      entryInventoryTitle: "设备清单",
      entryResearchKicker: "Research",
      entryResearchTitle: "论证材料",
      snapshotTitle: "模块概览",
      pipelineTitle: "系统层级",
      highlightsTitle: "重点内容"
    },
    vla: {
      eyebrow: "研究方向",
      title: "Vision-Language-Action",
      note: "当前更聚焦 OpenVLA-OFT / AdaMoE 基础上的层级式 speculative VLA，首页展示主线判断，专题页展开工程与实验路线。",
      badge: "研究方向",
      repo: "OpenVLA-OFT / AdaMoE / Speculative VLA",
      overviewTitle: "当前主线：层级式 Speculative VLA",
      snapshotTitle: "当前快照",
      pipelineTitle: "推进路线",
      highlightsTitle: "研究判断",
      focusLabel: "当前聚焦",
      focusItem1: "OpenVLA-OFT",
      focusItem2: "AdaMoE",
      focusItem3: "层级式 Speculative VLA",
      focusItem4: "长时程评测"
    },
    updates: {
      eyebrow: "动态",
      title: "研究动态",
      note: "保留少量近期更新，用于呈现持续推进中的研究脉络。"
    },
    research: {
      eyebrow: "方向概览",
      title: "研究方向概览",
      note: "在详细模块展开之前，先用更紧凑的方式概览当前正在推进的研究主题与方法重点。"
    },
    futurePapersSection: {
      eyebrow: "未来论文",
      title: "未来可能发布的文章"
    },
    systems: {
      eyebrow: "系统",
      title: "系统项目",
      note: "展示当前研究所依托的系统实现与实验基础设施。"
    },
    modules: {
      eyebrow: "研究方向",
      title: "研究方向",
      note: "以下内容分别展示当前最核心的双臂 Sim-to-Real 研究方向，以及并行推进中的 Vision-Language-Action 研究方向。"
    },
    background: {
      eyebrow: "背景",
      title: "教育背景"
    },
    community: {
      eyebrow: "能力",
      title: "奖项、服务与技能",
      honorsTitle: "代表荣誉",
      honorsText: "国家奖学金、优秀毕业生、竞赛奖项等。",
      serviceTitle: "学术与公共服务",
      serviceText: "主要担任《Python》和《人工智能基础》两门课程助教，系统参与实验教学支持、作业管理、考试组织与阅卷等工作。",
      stackTitle: "技术栈",
      stackText: "Python、PyTorch、CUDA、ROS、Docker、Linux、LaTeX、Hugging Face 等。"
    },
    contact: {
      eyebrow: "联系",
      title: "联系方式",
      text: "欢迎就 VLA、具身智能、强化学习与机器人操作等方向交流合作。我也将持续在此更新研究项目与阶段性进展。",
      visitLab: "访问实验室"
    },
    filters: {
      all: "全部",
      deployment: "Sim-to-Real",
      vla: "VLA",
      agriculture: "智慧农业"
    }
  },
  en: {
    meta: {
      title: "Xun Zhao | Academic Homepage",
      description: "Academic homepage of Xun Zhao at Hubei University, focusing on VLA, embodied AI, reinforcement learning, and robot manipulation."
    },
    trail: {
      homeLabel: "Home",
      homeCurrent: "Academic Homepage"
    },
    nav: {
      skip: "Skip to Main Content",
      about: "Profile",
      paperPlans: "Paper Plans",
      vla: "VLA Track",
      simtoreal: "Sim-to-Real Track",
      agriculture: "Smart Agriculture Suite",
      news: "Updates",
      publications: "Research",
      directions: "Research Directions",
      projects: "Systems",
      experience: "Background",
      contact: "Contact"
    },
    hero: {
      eyebrow: "Academic Homepage",
      subtitle: "Graduate Student, School of Artificial Intelligence, Hubei University | Research: VLA, smart agriculture, embodied AI, reinforcement learning, and robot manipulation",
      text:
        'I am currently a graduate student at Hubei University, working with <a href="https://eilab-wanghong.eu.cc/" target="_blank" rel="noopener noreferrer">EILab</a>. My research focuses on vision-language-action models, smart agriculture, embodied intelligence, and reinforcement-learning-based robot control. My current work centers on dual-arm manipulation systems, Sim-to-Real deployment, and perception-control loops for both real-world and agricultural environments.',
      viewResearch: "View Research",
      getInTouch: "Get in Touch",
      lab: "Lab",
      github: "GitHub",
      cv: "Repository",
      email: "Email",
      identityRole: "Graduate Student, EILab",
      identitySchool: "School of Artificial Intelligence, Hubei University",
      focusLabel: "Focus",
      focusValue: "VLA / Smart Agriculture / Embodied AI / RL Manipulation",
      nowLabel: "Now",
      nowValue: "Studying embodied agents and robot learning",
      locationLabel: "Based In",
      locationValue: "Wuhan, China"
    },
    about: {
      eyebrow: "About",
      title: "Profile",
      p1:
        "My research centers on <strong>Vision-Language-Action</strong>, <strong>smart agriculture</strong>, <strong>embodied intelligence</strong>, and <strong>reinforcement learning for robot control</strong>, with a focus on connecting visual understanding, action generation, policy learning, and robot execution.",
      p2:
        "My current work emphasizes dual-arm manipulation, multimodal perception, language-conditioned decision making, intelligent systems for agricultural settings, and Sim-to-Real deployment. I aim to build reproducible and extensible research outputs grounded in real systems.",
      interestsTitle: "Research Interests",
      tags: {
        vla: "Vision-Language-Action",
        embodied: "Embodied Intelligence",
        rl: "Reinforcement Learning",
        robot: "Robot Manipulation",
        cv: "Computer Vision",
        policy: "Policy Learning",
        agriculture: "Smart Agriculture"
      }
    },
    dualArm: {
      eyebrow: "Featured Project",
      note: "My most representative current project, highlighting dual-arm manipulation, learning-based control, and real-system deployment.",
      badge: "Featured Research",
      overviewTitle: "A full research pipeline from MuJoCo simulation to real dual-arm UR5 deployment",
      snapshotTitle: "Project Snapshot",
      pipelineTitle: "Research Pipeline",
      highlightsTitle: "Key Highlights",
      focusLabel: "System Focus",
      focusItem1: "Dual-Arm UR5",
      focusItem2: "MuJoCo + PPO",
      focusItem3: "ROS 2 + MoveIt",
      focusItem4: "Real Deployment",
      galleryTitle: "Project Visuals",
      galleryNote: "The visuals below cover the real platform, simulation environment, control experiments, and deployment process, all taken from actual project records.",
      media: {
        realKicker: "Real System",
        realType: "Lab Photo",
        realTitle: "Real dual-arm UR5 platform",
        realDesc: "Shows the robot arms, workbench, and camera setup as the most direct real-system entry point on the homepage.",
        simKicker: "Simulation",
        simType: "MuJoCo",
        simTitle: "MuJoCo dual-arm interaction demo",
        simDesc: "Highlights collaborative dual-arm behavior and basic control performance in simulation.",
        vizKicker: "Visualization",
        vizType: "ROS 2 + RViz",
        vizTitle: "ROS 2 + RViz simulation demo",
        vizDesc: "Shows the integration of robot description, visualization, and control in a ROS 2 environment.",
        ctrlKicker: "Control",
        ctrlType: "Trajectory Tracking",
        ctrlTitle: "Dual-arm end-effector tracking demo",
        ctrlDesc: "Illustrates task-space control and end-effector tracking as a key control result.",
        deployKicker: "MoveIt",
        deployType: "Real Robot",
        deployTitle: "MoveIt deployment demo",
        deployDesc: "Shows planning and execution on the real dual-arm platform."
      }
    },
    smartAgri: {
      eyebrow: "Featured Module",
      title: "Smart Agriculture",
      subtitle: "Smart Agriculture Suite",
      note: "A homepage module for farmland sensing, control, and digital systems, covering the overview, dashboard, inventory, and supporting materials.",
      badge: "Scenario Module",
      repo: "300-mu core farmland / monitoring / irrigation control",
      overviewTitle: "A smart agriculture system view from field sensing to platform coordination",
      showcaseKicker: "Field Sensing to Platform Coordination",
      showcaseTitle: "Smart Agriculture Entry Panel",
      showcaseText: "This module bundles field sensing, control paths, dashboard views, and research materials into one browsable page suite, making the agricultural direction readable at a glance from the homepage.",
      showcasePill1: "Four-condition Monitoring",
      showcasePill2: "Irrigation Control",
      showcasePill3: "Digital Dashboard",
      entryOverviewKicker: "Overview",
      entryOverviewTitle: "Project Overview",
      entryDashboardKicker: "Dashboard",
      entryDashboardTitle: "Visual Dashboard",
      entryInventoryKicker: "Inventory",
      entryInventoryTitle: "Device Inventory",
      entryResearchKicker: "Research",
      entryResearchTitle: "Supporting Notes",
      snapshotTitle: "Module Snapshot",
      pipelineTitle: "System Layers",
      highlightsTitle: "Key Highlights"
    },
    vla: {
      eyebrow: "Featured Direction",
      title: "Vision-Language-Action",
      note: "The current focus is a hierarchical speculative VLA track built on OpenVLA-OFT and AdaMoE, with the homepage showing the thesis and the dedicated page expanding the engineering and experiment plan.",
      badge: "Research Direction",
      repo: "OpenVLA-OFT / AdaMoE / Speculative VLA",
      overviewTitle: "Current Thesis: Hierarchical Speculative VLA",
      snapshotTitle: "Current Snapshot",
      pipelineTitle: "Current Path",
      highlightsTitle: "Research Judgments",
      focusLabel: "Current Focus",
      focusItem1: "OpenVLA-OFT",
      focusItem2: "AdaMoE",
      focusItem3: "Hierarchical Speculative VLA",
      focusItem4: "Long-Horizon Eval"
    },
    updates: {
      eyebrow: "Updates",
      title: "Research Updates",
      note: "A compact list of recent activities that reflects the current research trajectory."
    },
    research: {
      eyebrow: "Overview",
      title: "Research Direction Overview",
      note: "A compact overview of the research themes and methodological focus before the detailed direction modules."
    },
    futurePapersSection: {
      eyebrow: "Paper Plans",
      title: "Planned Papers"
    },
    systems: {
      eyebrow: "Systems",
      title: "System Projects",
      note: "System implementations and experimental infrastructure that support the current research agenda."
    },
    modules: {
      eyebrow: "Directions",
      title: "Research Directions",
      note: "The following sections present my core Sim-to-Real dual-arm research direction and a parallel Vision-Language-Action track."
    },
    background: {
      eyebrow: "Background",
      title: "Background"
    },
    community: {
      eyebrow: "Community",
      title: "Honors, Service & Skills",
      honorsTitle: "Selected Honors",
      honorsText: "National Scholarship, outstanding student honors, competition awards, and related distinctions.",
      serviceTitle: "Academic Service",
      serviceText: "Served as a teaching assistant for Python and Fundamentals of Artificial Intelligence, with sustained responsibilities in lab instruction support, homework management, exam organization, and marking.",
      stackTitle: "Technical Stack",
      stackText: "Python, PyTorch, CUDA, ROS, Docker, Linux, LaTeX, Hugging Face, and related tooling."
    },
    contact: {
      eyebrow: "Contact",
      title: "Contact",
      text: "I welcome discussion and collaboration on VLA, embodied AI, reinforcement learning, and robot manipulation. I will continue to update this page with project progress and research outputs.",
      visitLab: "Visit EILab"
    },
    filters: {
      all: "All",
      deployment: "Sim-to-Real",
      vla: "VLA",
      agriculture: "Smart Agriculture"
    }
  }
};

const localeData = {
  zh: {
    newsItems: [
      {
        date: "2026.04",
        title: "VLA 专题页与首页入口完成联动",
        description: "将首页 VLA 模块收敛为“当前主线 + 推进路线”的入口，并单独整理层级式 speculative VLA 专题页。"
      },
      {
        date: "2026.03",
        title: "VLA 主线收敛到层级式 speculative 框架",
        description: "当前判断聚焦高层语义推理加速，优先验证 latency、replan 次数与长时程成功率。"
      },
      {
        date: "2026.02",
        title: "AdaMoE 与 OpenVLA-OFT 工程链路跑通",
        description: "完成基础接入、mix4 训练链路和恢复逻辑整理，为后续 action-head 与 speculative 主线提供工程基座。"
      },
      {
        date: "2026.01",
        title: "双臂 Sim-to-Real 平台继续完善",
        description: "围绕 Dual_Arm_UR5 持续推进 MuJoCo、PPO、ROS 2 / MoveIt 与感知部署链路，作为后续具身研究的系统基础。"
      }
    ],
    featuredProject: {
      summary:
        "Dual_Arm_UR5 是我当前研究组合中的核心项目，围绕双臂 UR5 建立了从物理建模、任务空间控制，到 PPO 学习、ROS 2 / MoveIt 集成、感知模块接入与真实系统部署的完整实验平台。该平台也为后续面向 VLA 的机器人操作研究提供了稳定的系统基础。",
      links: [
        { label: "项目仓库", url: "https://github.com/zx2002430/Dual_Arm_UR5" },
        { label: "Base 分支", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/Base" },
        { label: "RL-Algorithm", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/RL-Algorithm" },
        { label: "Sim-To-Real", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/Sim-To-Real" }
      ],
      metrics: [
        { label: "机器人平台", value: "双臂 UR5" },
        { label: "学习方法", value: "PPO" },
        { label: "仿真环境", value: "MuJoCo" },
        { label: "部署框架", value: "ROS 2 + MoveIt" }
      ],
      pipeline: [
        {
          stage: "仿真",
          detail: "建立双臂 UR5 的 MuJoCo XML 与 ROS 2 URDF，完成动力学建模、任务空间 PID 与轨迹跟踪。"
        },
        {
          stage: "学习",
          detail: "构建自定义 Gymnasium 环境，设计状态表示、动作空间与奖励函数，并使用 Stable-Baselines3 PPO 训练。"
        },
        {
          stage: "部署",
          detail: "连接策略推理、安全状态机、MoveIt、控制器与真实双臂 UR5 平台，推进 Sim-to-Real 实验。"
        },
        {
          stage: "感知",
          detail: "集成 RGB-D 感知、YOLO 目标检测、2D 到 3D 定位与手眼标定，支撑感知驱动任务。"
        }
      ],
      highlights: [
        "围绕真实双臂 UR5 平台组织研究，而不是单一算法演示。",
        "在同一系统中打通经典控制、强化学习与真实部署。",
        "兼顾仿真验证与真实机器人执行链路。",
        "为后续语言条件操作和 VLA 扩展提供系统基础。"
      ]
    },
    smartAgriFeature: {
      summary:
        "智慧农业模块聚焦 300 亩核心农田场景，围绕四情监测、灌溉控制、设备部署与数字化平台联动进行展示。我把项目总览、可视化看板、设备清单和论证材料整理为一组可直接浏览的页面，便于在首页快速说明农业方向的系统能力与推进状态。",
      links: [
        { label: "专题总览", url: "smart-agriculture.html" },
        { label: "可视化看板", url: "smart-agriculture-dashboard.html" },
        { label: "设备清单", url: "smart-agriculture-inventory.html" },
        { label: "论证材料", url: "smart-agriculture-research.html" }
      ],
      metrics: [
        { label: "核心场景", value: "300 亩农田" },
        { label: "系统主题", value: "四情监测" },
        { label: "控制链路", value: "灌溉与闸门" },
        { label: "展示方式", value: "专题页面组" }
      ],
      pipeline: [
        {
          stage: "现场感知",
          detail: "围绕虫情、气象、土壤与水质等农田数据入口，构建面向真实环境的持续采集基础。"
        },
        {
          stage: "传输联动",
          detail: "结合 RS485 / Modbus、4G 采集器与边缘接入路线，打通设备侧到平台侧的数据链路。"
        },
        {
          stage: "平台展示",
          detail: "通过总览页、看板页和清单页集中呈现项目金额、进度、结构与关键判断。"
        },
        {
          stage: "研究延展",
          detail: "为后续农业机器人、数字孪生和农业场景智能决策研究预留系统接口与展示入口。"
        }
      ],
      highlights: [
        "首页直接展示智慧农业方向，不再只通过导航入口访问。",
        "总览、看板、清单和调研材料已经形成一组可连续浏览的专题页面。",
        "内容覆盖感知、控制、平台和研究延展，适合对外展示系统性工作。",
        "与 Sim-to-Real 双臂方向并列，形成更完整的个人研究结构。"
      ]
    },
    vlaDirection: {
      summary:
        "当前这条方向已经从通用 VLA 介绍收敛到更具体的主线：基于 OpenVLA-OFT 与 AdaMoE，优先推进层级式 speculative VLA，目标是在高层语义推理上加速，同时保持低层闭环执行的稳定性。",
      links: [
        { label: "EILab", url: "https://eilab-wanghong.eu.cc/" },
        { label: "GitHub 主页", url: "https://github.com/zx2002430" },
        { label: "联系方式", url: "#contact" }
      ],
      metrics: [
        { label: "当前主线", value: "Hierarchical Speculative VLA" },
        { label: "工程基座", value: "OpenVLA-OFT + AdaMoE" },
        { label: "执行层", value: "闭环动作执行" },
        { label: "下一步", value: "Long-Horizon Eval" }
      ],
      pipeline: [
        {
          stage: "工程接入",
          detail: "完成 AdaMoE 接入、mix4 训练链路和基础恢复逻辑。"
        },
        {
          stage: "主线收敛",
          detail: "从 backbone-tail MoE 收敛到高层 speculative + 低层保守执行。"
        },
        {
          stage: "实验推进",
          detail: "优先验证 latency、replan 次数与长时程成功率。"
        }
      ],
      highlights: [
        "首页只保留主线判断，细节进入专题页展开。",
        "先验证高层加速，再讨论低层连续动作 speculative。",
        "与双臂 Sim-to-Real 系统可以自然衔接。",
        "适合作为当前论文主线，而不是泛泛的 VLA 展示。"
      ]
    },
    overviewPublications: [
      {
        title: "融合 RGB-D 感知的双臂 Sim-to-Real 控制",
        authors: "赵汛",
        venue: "研究主线 | Sim-to-Real",
        type: "Deployment",
        highlight: "ROS 2 + MoveIt + YOLO + 手眼标定",
        summary: "围绕双臂 UR5 平台组织的一条完整 Sim-to-Real 研究主线，覆盖 Base 建模、强化学习、真实部署与感知标定。",
        links: [
          { label: "仓库", url: "https://github.com/zx2002430/Dual_Arm_UR5" },
          { label: "Sim-To-Real", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/Sim-To-Real" }
        ]
      },
      {
        title: "面向具身操作的 Vision-Language-Action",
        authors: "赵汛",
        venue: "进行中的研究方向",
        type: "VLA",
        highlight: "多模态对齐 + 动作生成",
        summary: "探索将视觉观测与语言指令映射到机器人动作的 VLA 风格策略，用于具身操作与任务执行。",
        links: [
          { label: "实验室", url: "https://eilab-wanghong.eu.cc/" },
          { label: "GitHub", url: "https://github.com/zx2002430" }
        ]
      },
      {
        title: "面向农业场景的智能系统",
        authors: "赵汛",
        venue: "进行中的研究方向",
        type: "Agriculture",
        highlight: "农业机器人 + 多模态感知 + 智能决策",
        summary: "关注智慧农业场景中的感知、决策与自动化执行问题，探索将具身智能和多模态方法用于农业环境中的任务理解与操作。",
        links: [
          { label: "实验室", url: "https://eilab-wanghong.eu.cc/" },
          { label: "联系我", url: "#contact" }
        ]
      }
    ],
    simToRealBreakdown: [
      {
        title: "Base：双臂 UR5 建模与控制基础",
        authors: "赵汛",
        venue: "Sim-to-Real 组成部分 | Base",
        type: "Deployment",
        highlight: "MuJoCo + ROS 2 + 任务空间控制",
        summary: "负责双臂 UR5 的系统建模、MuJoCo 环境搭建、ROS 2 描述与任务空间控制，是整条链路的系统基础。",
        links: [
          { label: "仓库", url: "https://github.com/zx2002430/Dual_Arm_UR5" },
          { label: "Base 分支", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/Base" }
        ]
      },
      {
        title: "RL：双臂强化学习训练链路",
        authors: "赵汛",
        venue: "Sim-to-Real 组成部分 | RL",
        type: "Deployment",
        highlight: "PPO + Gymnasium + Stable-Baselines3",
        summary: "基于自定义环境构建 PPO 训练、评估与轨迹分析流程，为双臂协同任务提供学习策略。",
        links: [
          { label: "仓库", url: "https://github.com/zx2002430/Dual_Arm_UR5" },
          { label: "RL 分支", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/RL-Algorithm" }
        ]
      },
      {
        title: "Deployment：真实双臂部署链路",
        authors: "赵汛",
        venue: "Sim-to-Real 组成部分 | Deployment",
        type: "Deployment",
        highlight: "MoveIt + 控制器 + 状态机",
        summary: "连接策略推理、MoveIt、控制器与真实双臂平台，形成从仿真到真机执行的部署闭环。",
        links: [
          { label: "Sim-To-Real", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/Sim-To-Real" }
        ]
      },
      {
        title: "Perception：感知与标定模块",
        authors: "赵汛",
        venue: "Sim-to-Real 组成部分 | Perception",
        type: "Deployment",
        highlight: "RGB-D + YOLO + 手眼标定",
        summary: "集成 RGB-D 感知、YOLO 检测、2D-3D 定位与手眼标定，为真实环境中的感知驱动操作做准备。",
        links: [
          { label: "Sim-To-Real", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/Sim-To-Real" }
        ]
      }
    ],
    vlaPublication: {
      title: "面向具身操作的 Vision-Language-Action",
      authors: "赵汛",
      venue: "进行中的研究方向",
      type: "VLA",
      highlight: "多模态对齐 + 动作生成",
      summary: "探索将视觉观测与语言指令映射到机器人动作的 VLA 风格策略，用于具身操作与任务执行。",
      links: [
        { label: "实验室", url: "https://eilab-wanghong.eu.cc/" },
        { label: "GitHub", url: "https://github.com/zx2002430" }
      ]
    },
    agriculturePublication: {
      title: "面向农业场景的智能系统",
      authors: "赵汛",
      venue: "进行中的研究方向",
      type: "Agriculture",
      highlight: "农业机器人 + 多模态感知 + 智能决策",
      summary: "关注智慧农业场景中的感知、决策与自动化执行问题，探索将具身智能和多模态方法用于农业环境中的任务理解与操作。",
      links: [
        { label: "项目网页", url: "smart-agriculture.html" },
        { label: "实验室", url: "https://eilab-wanghong.eu.cc/" }
      ]
    },
    futurePapers: [
      {
        title: "面向双臂 UR5 的感知驱动 Sim-to-Real 操作系统与真实部署验证",
        status: "方向成型",
        track: "Sim-to-Real",
        venue: "IROS / IEEE RA-L",
        summary: "拟围绕 Dual_Arm_UR5 平台整理一篇系统型论文，把 MuJoCo 建模、PPO 训练、ROS 2 / MoveIt 部署、RGB-D 感知与真机执行整合为同一条双臂 Sim-to-Real 研究链路。",
        contribution: "预计贡献包括一个可复现的双臂操作系统基座、一套感知驱动的真实部署流程，以及面向双臂任务的真机实验验证。",
        links: [
          { label: "Dual_Arm_UR5", url: "https://github.com/zx2002430/Dual_Arm_UR5" },
          { label: "Sim-To-Real", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/Sim-To-Real" }
        ]
      },
      {
        title: "层级式 Speculative Vision-Language-Action 用于具身双臂操作",
        status: "主线收敛",
        track: "VLA",
        venue: "CoRL / ICRA",
        summary: "拟围绕当前已经收敛的层级式 speculative VLA 主线，研究如何在高层语义子任务空间提升推理与重规划效率，同时保持低层连续动作执行的稳定性。",
        contribution: "预计贡献包括面向 VLA 的层级式 speculative 框架、高层 verification 与 acceptance 设计，以及 latency、replan 频率和长时程成功率的实验验证。",
        links: [
          { label: "专题页面", url: "vla-research.html" },
          { label: "Research", url: "#publications" }
        ]
      },
      {
        title: "面向真实农田场景的智慧农业感知-控制-平台一体化系统",
        status: "系统整理",
        track: "Agriculture",
        venue: "Computers and Electronics in Agriculture / Smart Agricultural Technology",
        summary: "拟基于 300 亩核心农田场景，将四情监测、灌溉控制、设备接入、数据展示与专题化平台组织为一篇面向真实应用场景的系统论文。",
        contribution: "预计贡献包括农田多源数据接入框架、控制与平台联动流程，以及面向后续农业机器人与智能决策研究的系统接口组织方式。",
        links: [
          { label: "专题总览", url: "smart-agriculture.html" },
          { label: "可视化看板", url: "smart-agriculture-dashboard.html" }
        ]
      }
    ],
    projects: [
      {
        title: "Dual_Arm_UR5",
        meta: "双臂操作 | MuJoCo | ROS 2 | 强化学习",
        description: "主研究系统，覆盖建模、控制、学习与部署的完整双臂 UR5 操作链路。",
        links: [
          { label: "GitHub 仓库", url: "https://github.com/zx2002430/Dual_Arm_UR5" },
          { label: "README", url: "https://github.com/zx2002430/Dual_Arm_UR5" }
        ]
      },
      {
        title: "RL-Algorithm 分支",
        meta: "PPO | Gymnasium | Stable-Baselines3",
        description: "面向双臂协同任务的强化学习训练与评估分支。",
        links: [
          { label: "分支链接", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/RL-Algorithm" }
        ]
      },
      {
        title: "Sim-To-Real 分支",
        meta: "真机 | MoveIt | RGB-D | YOLO",
        description: "面向真实双臂平台的感知、规划与执行部署分支。",
        links: [
          { label: "分支链接", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/Sim-To-Real" }
        ]
      },
      {
        title: "VLA Policy Prototyping",
        meta: "Vision-Language-Action | 具身策略 | 机器人执行",
        description: "面向语言条件操作与未来真实部署的 VLA 风格具身策略原型方向。",
        links: [
          { label: "实验室主页", url: "https://eilab-wanghong.eu.cc/" },
          { label: "GitHub 主页", url: "https://github.com/zx2002430" }
        ]
      },
      {
        title: "智慧农业专题",
        meta: "数字孪生 | 四情监测 | 灌溉控制 | 无人农机",
        description: "基于建设方案、采购清单、现场考察和技术路线讨论整理的智慧农业专题页面。",
        links: [
          { label: "总览页", url: "smart-agriculture.html" },
          { label: "可视化看板", url: "smart-agriculture-dashboard.html" },
          { label: "设备清单", url: "smart-agriculture-inventory.html" },
          { label: "来源附录", url: "smart-agriculture-contracts.html" }
        ]
      }
    ],
    experiences: [
      {
        title: "湖北大学",
        subtitle: "人工智能专业研究生，2024 - 至今",
        detail: "在 EILab 开展 VLA、具身智能、强化学习与机械臂操作相关研究。"
      },
      {
        title: "研究兴趣",
        subtitle: "VLA / 具身智能 / 强化学习 / 机器人学习",
        detail: "关注多模态感知、语言对齐、策略学习与稳健的机器人执行。"
      },
      {
        title: "当前重点",
        subtitle: "系统平台与研究组合",
        detail: "围绕双臂操作系统与 VLA 具身策略方向构建可复现的研究成果。"
      }
    ]
  },
  en: {
    newsItems: [
      {
        date: "2026.04",
        title: "Homepage and VLA research page now work as one entry flow",
        description: "The homepage VLA block now serves as a thesis-level entry, while a dedicated page expands the hierarchical speculative VLA plan."
      },
      {
        date: "2026.03",
        title: "VLA mainline converged to a hierarchical speculative frame",
        description: "The current focus is high-level semantic acceleration, with evaluation centered on latency, replanning frequency, and long-horizon success rate."
      },
      {
        date: "2026.02",
        title: "AdaMoE and OpenVLA-OFT engineering path completed",
        description: "Finished the core integration, mix4 training flow, and recovery logic as the engineering base for later action-head and speculative experiments."
      },
      {
        date: "2026.01",
        title: "Dual-arm Sim-to-Real platform kept expanding",
        description: "Continued improving the Dual_Arm_UR5 stack across MuJoCo, PPO, ROS 2 / MoveIt, and perception-driven deployment as the systems base for future embodied work."
      }
    ],
    featuredProject: {
      summary:
        "Dual_Arm_UR5 is the core project in my current research portfolio. It covers the full path from physical modeling and task-space control to PPO learning, ROS 2 / MoveIt integration, perception modules, and real-system deployment. The platform also serves as a stable systems foundation for future VLA-oriented manipulation research.",
      links: [
        { label: "GitHub Repo", url: "https://github.com/zx2002430/Dual_Arm_UR5" },
        { label: "Base", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/Base" },
        { label: "RL-Algorithm", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/RL-Algorithm" },
        { label: "Sim-To-Real", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/Sim-To-Real" }
      ],
      metrics: [
        { label: "Robot Setup", value: "Dual UR5" },
        { label: "Learning Method", value: "PPO" },
        { label: "Simulation", value: "MuJoCo" },
        { label: "Deployment Stack", value: "ROS 2 + MoveIt" }
      ],
      pipeline: [
        {
          stage: "Simulation",
          detail: "Built dual-arm UR5 models in MuJoCo XML and ROS 2 URDF, including dynamics modeling, task-space PID, and trajectory tracking."
        },
        {
          stage: "Learning",
          detail: "Designed a custom Gymnasium environment, state representation, action space, and reward function, then trained with Stable-Baselines3 PPO."
        },
        {
          stage: "Deployment",
          detail: "Connected policy inference, safety state machines, MoveIt, controllers, and the real dual-arm UR5 platform for Sim-to-Real experiments."
        },
        {
          stage: "Perception",
          detail: "Integrated RGB-D sensing, YOLO-based object detection, 2D-to-3D localization, and hand-eye calibration for perception-guided tasks."
        }
      ],
      highlights: [
        "Organized around a real dual-arm UR5 platform rather than a single algorithm demo.",
        "Bridges classical control, reinforcement learning, and real-world deployment in one system.",
        "Supports both simulation validation and real robot execution.",
        "Provides a strong foundation for future language-conditioned and VLA-style manipulation."
      ]
    },
    smartAgriFeature: {
      summary:
        "The smart agriculture module focuses on a 300-mu farmland scenario, covering multi-source monitoring, irrigation control, deployment progress, and platform-level presentation. I organized the overview, dashboard, inventory, and supporting materials into a browsable suite so the agricultural research direction is visible directly from the homepage.",
      links: [
        { label: "Overview", url: "smart-agriculture.html" },
        { label: "Dashboard", url: "smart-agriculture-dashboard.html" },
        { label: "Inventory", url: "smart-agriculture-inventory.html" },
        { label: "Research Notes", url: "smart-agriculture-research.html" }
      ],
      metrics: [
        { label: "Core Scene", value: "300-mu Farmland" },
        { label: "Monitoring", value: "Four-condition Sensing" },
        { label: "Control", value: "Irrigation + Gates" },
        { label: "Format", value: "Page Suite" }
      ],
      pipeline: [
        {
          stage: "Field Sensing",
          detail: "Build a real-world monitoring base around insect, weather, soil, and water-quality inputs."
        },
        {
          stage: "Connectivity",
          detail: "Link field devices and platform services through RS485 / Modbus, 4G collectors, and edge access paths."
        },
        {
          stage: "Presentation",
          detail: "Use overview, dashboard, and inventory pages to present project status, structure, and key judgments."
        },
        {
          stage: "Research Extension",
          detail: "Leave room for future agricultural robotics, digital twin, and intelligent decision-making studies."
        }
      ],
      highlights: [
        "Makes the smart agriculture direction visible on the homepage instead of only through navigation.",
        "Bundles the overview, dashboard, inventory, and research materials into one coherent module.",
        "Covers sensing, control, platform presentation, and future research extension in one section.",
        "Sits under the Sim-to-Real module to present a broader personal research portfolio."
      ]
    },
    vlaDirection: {
      summary:
        "This track is no longer presented as a generic VLA overview. It is now framed around a more specific thesis: building a hierarchical speculative VLA pipeline on top of OpenVLA-OFT and AdaMoE, aiming to speed up high-level semantic reasoning while preserving stable low-level closed-loop execution.",
      links: [
        { label: "EILab", url: "https://eilab-wanghong.eu.cc/" },
        { label: "GitHub Profile", url: "https://github.com/zx2002430" },
        { label: "Contact", url: "#contact" }
      ],
      metrics: [
        { label: "Current Thesis", value: "Hierarchical Speculative VLA" },
        { label: "Engineering Base", value: "OpenVLA-OFT + AdaMoE" },
        { label: "Execution Layer", value: "Closed-loop Control" },
        { label: "Next Step", value: "Long-Horizon Eval" }
      ],
      pipeline: [
        {
          stage: "Engineering",
          detail: "Finish AdaMoE integration, mix4 training flow, and recovery logic on OpenVLA-OFT."
        },
        {
          stage: "Convergence",
          detail: "Move from backbone-tail MoE toward high-level speculative reasoning with conservative low-level execution."
        },
        {
          stage: "Evaluation",
          detail: "Prioritize latency, replanning frequency, and long-horizon success rate."
        }
      ],
      highlights: [
        "The homepage only keeps the thesis-level judgment, while the research page expands the details.",
        "High-level acceleration comes first; low-level speculative control stays as a follow-up topic.",
        "The track connects naturally with the existing dual-arm Sim-to-Real system work.",
        "This is framed as a paper-ready mainline rather than a generic VLA showcase."
      ]
    },
    overviewPublications: [
      {
        title: "Sim-to-Real Dual-Arm Control with RGB-D Perception",
        authors: "Xun Zhao",
        venue: "Research Track | Sim-to-Real",
        type: "Deployment",
        highlight: "ROS 2 + MoveIt + YOLO + Hand-Eye",
        summary: "A complete Sim-to-Real research track organized around the dual-arm UR5 platform, covering Base modeling, reinforcement learning, real-world deployment, and perception calibration.",
        links: [
          { label: "Repo", url: "https://github.com/zx2002430/Dual_Arm_UR5" },
          { label: "Sim-To-Real", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/Sim-To-Real" }
        ]
      },
      {
        title: "Vision-Language-Action for Embodied Manipulation",
        authors: "Xun Zhao",
        venue: "Ongoing Research Direction",
        type: "VLA",
        highlight: "Multimodal grounding + action generation",
        summary: "Exploring VLA-style embodied policies that map visual observations and language instructions to robot actions for manipulation and task execution.",
        links: [
          { label: "Lab", url: "https://eilab-wanghong.eu.cc/" },
          { label: "GitHub", url: "https://github.com/zx2002430" }
        ]
      },
      {
        title: "Intelligent Systems for Smart Agriculture",
        authors: "Xun Zhao",
        venue: "Ongoing Research Direction",
        type: "Agriculture",
        highlight: "Agricultural robotics + multimodal sensing + intelligent decision making",
        summary: "Studying perception, decision making, and autonomous execution in smart agriculture, with an interest in applying embodied and multimodal methods to agricultural environments.",
        links: [
          { label: "Lab", url: "https://eilab-wanghong.eu.cc/" },
          { label: "Contact", url: "#contact" }
        ]
      }
    ],
    simToRealBreakdown: [
      {
        title: "Base: Dual-Arm UR5 Modeling and Control Foundation",
        authors: "Xun Zhao",
        venue: "Sim-to-Real Component | Base",
        type: "Deployment",
        highlight: "MuJoCo + ROS 2 + Task-Space Control",
        summary: "Builds the system foundation with dual-arm UR5 modeling, MuJoCo environment setup, ROS 2 descriptions, and task-space control.",
        links: [
          { label: "Repo", url: "https://github.com/zx2002430/Dual_Arm_UR5" },
          { label: "Base Branch", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/Base" }
        ]
      },
      {
        title: "RL: Dual-Arm Reinforcement Learning Pipeline",
        authors: "Xun Zhao",
        venue: "Sim-to-Real Component | RL",
        type: "Deployment",
        highlight: "PPO + Gymnasium + Stable-Baselines3",
        summary: "Provides PPO-based training, evaluation, and trajectory analysis for coordinated dual-arm tasks.",
        links: [
          { label: "Repo", url: "https://github.com/zx2002430/Dual_Arm_UR5" },
          { label: "RL Branch", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/RL-Algorithm" }
        ]
      },
      {
        title: "Deployment: Real-Robot Execution Stack",
        authors: "Xun Zhao",
        venue: "Sim-to-Real Component | Deployment",
        type: "Deployment",
        highlight: "MoveIt + Controllers + Safety Logic",
        summary: "Connects policy inference, MoveIt, controllers, and the real dual-arm platform for execution beyond simulation.",
        links: [
          { label: "Sim-To-Real", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/Sim-To-Real" }
        ]
      },
      {
        title: "Perception: Sensing and Calibration Modules",
        authors: "Xun Zhao",
        venue: "Sim-to-Real Component | Perception",
        type: "Deployment",
        highlight: "RGB-D + YOLO + Hand-Eye",
        summary: "Integrates RGB-D sensing, YOLO detection, 2D-to-3D localization, and hand-eye calibration for perception-driven manipulation.",
        links: [
          { label: "Sim-To-Real", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/Sim-To-Real" }
        ]
      }
    ],
    vlaPublication: {
      title: "Vision-Language-Action for Embodied Manipulation",
      authors: "Xun Zhao",
      venue: "Ongoing Research Direction",
      type: "VLA",
      highlight: "Multimodal grounding + action generation",
      summary: "Exploring VLA-style embodied policies that map visual observations and language instructions to robot actions for manipulation and task execution.",
      links: [
        { label: "Lab", url: "https://eilab-wanghong.eu.cc/" },
        { label: "GitHub", url: "https://github.com/zx2002430" }
      ]
    },
    agriculturePublication: {
      title: "Intelligent Systems for Smart Agriculture",
      authors: "Xun Zhao",
      venue: "Ongoing Research Direction",
      type: "Agriculture",
      highlight: "Agricultural robotics + multimodal sensing + intelligent decision making",
      summary: "Studying perception, decision making, and autonomous execution in smart agriculture, with an interest in applying embodied and multimodal methods to agricultural environments.",
      links: [
        { label: "Project Page", url: "smart-agriculture.html" },
        { label: "Lab", url: "https://eilab-wanghong.eu.cc/" }
      ]
    },
    futurePapers: [
      {
        title: "Perception-Driven Sim-to-Real Bimanual Manipulation and Real Deployment with Dual-Arm UR5",
        status: "Concept Framed",
        track: "Sim-to-Real",
        venue: "IROS / IEEE RA-L",
        summary: "This paper is planned around the Dual_Arm_UR5 platform and aims to present a coherent Sim-to-Real story spanning MuJoCo modeling, PPO training, ROS 2 / MoveIt deployment, RGB-D perception, and real-robot execution.",
        contribution: "Expected contributions include a reproducible bimanual system stack, a perception-grounded real deployment workflow, and real-robot validation on dual-arm manipulation tasks.",
        links: [
          { label: "Dual_Arm_UR5", url: "https://github.com/zx2002430/Dual_Arm_UR5" },
          { label: "Sim-To-Real", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/Sim-To-Real" }
        ]
      },
      {
        title: "Hierarchical Speculative Vision-Language-Action for Embodied Bimanual Manipulation",
        status: "Main Direction",
        track: "VLA",
        venue: "CoRL / ICRA",
        summary: "This paper would build on the current hierarchical speculative VLA thesis, studying how to accelerate high-level semantic reasoning and replanning while preserving stable low-level continuous execution.",
        contribution: "Expected contributions include a hierarchical speculative framework for VLA, verification and acceptance design at the high-level semantic layer, and evaluation on latency, replanning frequency, and long-horizon success rate.",
        links: [
          { label: "Research Page", url: "vla-research.html" },
          { label: "Research", url: "#publications" }
        ]
      },
      {
        title: "An Integrated Sensing-Control-Platform System for Real Smart Agriculture Scenarios",
        status: "System Consolidation",
        track: "Agriculture",
        venue: "Computers and Electronics in Agriculture / Smart Agricultural Technology",
        summary: "This planned paper is built around the 300-mu farmland scenario, organizing sensing, irrigation control, device integration, and platform presentation into one applied system paper.",
        contribution: "Expected contributions include a multi-source field data pipeline, a control-and-platform coordination workflow, and a systems interface design for future agricultural robotics and intelligent decision-making research.",
        links: [
          { label: "Overview", url: "smart-agriculture.html" },
          { label: "Dashboard", url: "smart-agriculture-dashboard.html" }
        ]
      }
    ],
    projects: [
      {
        title: "Dual_Arm_UR5",
        meta: "Dual-arm manipulation | MuJoCo | ROS 2 | Reinforcement Learning",
        description: "A main research system covering modeling, control, learning, and deployment for dual-arm UR5 manipulation.",
        links: [
          { label: "GitHub Repo", url: "https://github.com/zx2002430/Dual_Arm_UR5" },
          { label: "README", url: "https://github.com/zx2002430/Dual_Arm_UR5" }
        ]
      },
      {
        title: "RL-Algorithm Branch",
        meta: "PPO | Gymnasium | Stable-Baselines3",
        description: "A training and evaluation branch for reinforcement learning on coordinated dual-arm tasks.",
        links: [
          { label: "Branch Link", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/RL-Algorithm" }
        ]
      },
      {
        title: "Sim-To-Real Branch",
        meta: "Real Robot | MoveIt | RGB-D | YOLO",
        description: "A deployment-oriented branch for perception, planning, and execution on the real dual-arm robot platform.",
        links: [
          { label: "Branch Link", url: "https://github.com/zx2002430/Dual_Arm_UR5/tree/Sim-To-Real" }
        ]
      },
      {
        title: "VLA Policy Prototyping",
        meta: "Vision-Language-Action | Embodied Policy | Robot Execution",
        description: "A parallel research direction focused on instruction-conditioned embodied policies for manipulation and future real-world execution.",
        links: [
          { label: "Lab Homepage", url: "https://eilab-wanghong.eu.cc/" },
          { label: "GitHub Profile", url: "https://github.com/zx2002430" }
        ]
      },
      {
        title: "Smart Agriculture Suite",
        meta: "Digital twin | four-condition monitoring | irrigation control | unmanned machinery",
        description: "A dedicated smart agriculture suite covering the project overview, dashboard, inventory, and supporting appendices.",
        links: [
          { label: "Overview", url: "smart-agriculture.html" },
          { label: "Dashboard", url: "smart-agriculture-dashboard.html" },
          { label: "Inventory", url: "smart-agriculture-inventory.html" },
          { label: "Appendix", url: "smart-agriculture-contracts.html" }
        ]
      }
    ],
    experiences: [
      {
        title: "Hubei University",
        subtitle: "Graduate Student in Artificial Intelligence, 2024 - Present",
        detail: "Working in EILab on VLA, embodied intelligence, reinforcement learning, and robot manipulation."
      },
      {
        title: "Research Interests",
        subtitle: "VLA / Embodied AI / RL / Robot Learning",
        detail: "Interested in multimodal perception, language grounding, policy learning, and robust robot execution."
      },
      {
        title: "Current Focus",
        subtitle: "Systems and Research Portfolio",
        detail: "Developing reproducible systems and research outputs around dual-arm manipulation and VLA-oriented embodied policies."
      }
    ]
  }
};

const filterDefinitions = [
  { key: "All", labelKey: "filters.all" },
  { key: "Deployment", labelKey: "filters.deployment" },
  { key: "VLA", labelKey: "filters.vla" },
  { key: "Agriculture", labelKey: "filters.agriculture" }
];

let currentLanguage = getStoredLanguage();
let currentFilter = "All";

function getStoredLanguage() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored && localeData[stored] ? stored : DEFAULT_LANGUAGE;
}

function getByPath(object, path) {
  return path.split(".").reduce((result, segment) => result?.[segment], object);
}

function renderLink(link) {
  const isInternal = link.url.startsWith("#");
  const target = isInternal ? "_self" : "_blank";
  const rel = isInternal ? "" : ' rel="noopener noreferrer"';
  return `<a href="${link.url}" target="${target}"${rel}>${link.label}</a>`;
}

function renderActionLink(link, variant = "secondary") {
  const isInternal = link.url.startsWith("#") || !/^https?:\/\//.test(link.url);
  const target = isInternal ? "_self" : "_blank";
  const rel = isInternal ? "" : ' rel="noopener noreferrer"';
  return `<a class="action-link action-link-${variant}" href="${link.url}" target="${target}"${rel}>${link.label}</a>`;
}

function getPublicationState(language, item) {
  const map = {
    zh: {
      Deployment: "系统主线",
      VLA: "进行中",
      Agriculture: "专题整理"
    },
    en: {
      Deployment: "System Track",
      VLA: "Ongoing",
      Agriculture: "Suite Track"
    }
  };
  return map[language]?.[item.type] || (language === "zh" ? "研究条目" : "Research Entry");
}

function getProjectState(language, item) {
  const title = item.title.toLowerCase();
  if (title.includes("dual_arm_ur5")) {
    return language === "zh" ? "主系统" : "Main System";
  }
  if (title.includes("branch") || title.includes("分支")) {
    return language === "zh" ? "工作分支" : "Working Branch";
  }
  if (title.includes("vla")) {
    return language === "zh" ? "研究原型" : "Research Prototype";
  }
  if (title.includes("智慧农业") || title.includes("agriculture")) {
    return language === "zh" ? "专题套页" : "Suite";
  }
  return language === "zh" ? "系统条目" : "System Entry";
}

function applyStaticText(language) {
  const dict = uiText[language];
  const locale = language === "zh" ? "zh_CN" : "en_US";

  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = dict.meta.title;
  document.getElementById("meta-description").setAttribute("content", dict.meta.description);
  document.getElementById("canonical-link")?.setAttribute("href", SITE_URL);
  document.getElementById("og-title")?.setAttribute("content", dict.meta.title);
  document.getElementById("og-description")?.setAttribute("content", dict.meta.description);
  document.getElementById("og-url")?.setAttribute("content", SITE_URL);
  document.getElementById("og-locale")?.setAttribute("content", locale);
  document.getElementById("twitter-title")?.setAttribute("content", dict.meta.title);
  document.getElementById("twitter-description")?.setAttribute("content", dict.meta.description);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = getByPath(dict, element.dataset.i18n);
    if (typeof value === "string") {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const value = getByPath(dict, element.dataset.i18nHtml);
    if (typeof value === "string") {
      element.innerHTML = value;
    }
  });
}

function renderNews(language) {
  const container = document.getElementById("news-list");
  container.innerHTML = localeData[language].newsItems
    .map(
      (item) => `
        <article class="timeline-item">
          <div class="timeline-date">${item.date}</div>
          <div>
            <h3 class="timeline-title">${item.title}</h3>
            <p class="timeline-text">${item.description}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderFeaturedProject(language) {
  const data = localeData[language].featuredProject;
  document.getElementById("featured-summary").textContent = data.summary;
  document.getElementById("featured-links").innerHTML = data.links.map(renderLink).join("");
  document.getElementById("featured-metrics").innerHTML = data.metrics
    .map(
      (item) => `
        <article class="metric-card">
          <span class="metric-label">${item.label}</span>
          <strong>${item.value}</strong>
        </article>
      `
    )
    .join("");
  document.getElementById("featured-pipeline").innerHTML = data.pipeline
    .map(
      (item, index) => `
        <article class="pipeline-step system-home-pipeline-step">
          <div class="pipeline-marker">${index + 1}</div>
          <div>
            <h4>${item.stage}</h4>
            <p>${item.detail}</p>
          </div>
        </article>
      `
    )
    .join("");
  document.getElementById("featured-highlights").innerHTML = data.highlights
    .map((item) => `<article class="highlight-item system-home-highlight-item"><p>${item}</p></article>`)
    .join("");
}

function renderVlaDirection(language) {
  const data = localeData[language].vlaDirection;
  document.getElementById("vla-summary").textContent = data.summary;
  document.getElementById("vla-links").innerHTML =
    renderLink({
      label: language === "zh" ? "专题页面" : "Research Page",
      url: "vla-research.html"
    }) +
    data.links.map(renderLink).join("");
  document.getElementById("vla-metrics").innerHTML = data.metrics
    .map(
      (item) => `
        <article class="metric-card">
          <span class="metric-label">${item.label}</span>
          <strong>${item.value}</strong>
        </article>
      `
    )
    .join("");
  document.getElementById("vla-pipeline").innerHTML = data.pipeline
    .map(
      (item, index) => `
        <article class="pipeline-step vla-home-pipeline-step">
          <div class="pipeline-marker">${index + 1}</div>
          <div>
            <h4>${item.stage}</h4>
            <p>${item.detail}</p>
          </div>
        </article>
      `
    )
    .join("");
  document.getElementById("vla-highlights").innerHTML = data.highlights
    .map((item) => `<article class="highlight-item vla-home-highlight-item"><p>${item}</p></article>`)
    .join("");
}

function renderSmartAgricultureFeature(language) {
  const data = localeData[language].smartAgriFeature;
  document.getElementById("agri-summary").textContent = data.summary;
  document.getElementById("agri-links").innerHTML = data.links.map(renderLink).join("");
  document.getElementById("agri-metrics").innerHTML = data.metrics
    .map(
      (item) => `
        <article class="metric-card">
          <span class="metric-label">${item.label}</span>
          <strong>${item.value}</strong>
        </article>
      `
    )
    .join("");
  document.getElementById("agri-pipeline").innerHTML = data.pipeline
    .map(
      (item, index) => `
        <article class="pipeline-step">
          <div class="pipeline-marker">${index + 1}</div>
          <div>
            <h4>${item.stage}</h4>
            <p>${item.detail}</p>
          </div>
        </article>
      `
    )
    .join("");
  document.getElementById("agri-highlights").innerHTML = data.highlights
    .map((item) => `<article class="highlight-item"><p>${item}</p></article>`)
    .join("");
}

function renderFilters(language) {
  const container = document.getElementById("pub-filters");
  const dict = uiText[language];
  container.innerHTML = filterDefinitions
    .map(
      (item) => `
        <button
          class="filter-chip ${item.key === currentFilter ? "is-active" : ""}"
          type="button"
          data-filter="${item.key}"
        >
          ${getByPath(dict, item.labelKey)}
        </button>
      `
    )
    .join("");

  container.onclick = (event) => {
    const target = event.target.closest("[data-filter]");
    if (!target) {
      return;
    }
    currentFilter = target.dataset.filter;
    renderFilters(currentLanguage);
    renderPublications(currentLanguage);
  };
}

function renderPublications(language) {
  const container = document.getElementById("publication-list");
  const locale = localeData[language];
  let items = [];

  if (currentFilter === "All") {
    items = locale.overviewPublications;
  } else if (currentFilter === "Deployment") {
    items = locale.simToRealBreakdown;
  } else if (currentFilter === "VLA") {
    items = [locale.vlaPublication];
  } else if (currentFilter === "Agriculture") {
    items = [locale.agriculturePublication];
  }

  container.innerHTML = items
    .map(
      (item) => {
        const primaryLink = item.links?.[0];
        const secondaryLinks = item.links?.slice(1) ?? [];
        return `
        <article class="publication-card">
          <div class="card-state-row">
            <span class="card-state-badge">${getPublicationState(language, item)}</span>
            <span class="card-state-track">${item.type}</span>
          </div>
          <div class="publication-head">
            <h3 class="publication-title">${item.title}</h3>
            <p class="publication-meta">${item.authors}</p>
          </div>
          <p class="publication-meta publication-meta-strong"><strong>${item.venue}</strong></p>
          <p class="publication-summary">${item.summary}</p>
          <p class="publication-tagline">${item.highlight}</p>
          <div class="card-action-stack">
            <div class="card-action-primary">
              ${primaryLink ? renderActionLink(primaryLink, "primary") : ""}
            </div>
            <div class="card-action-secondary">
              ${secondaryLinks.map((link) => renderActionLink(link, "secondary")).join("")}
            ${item.type === "VLA"
              ? renderActionLink({
                  label: language === "zh" ? "专题页面" : "Research Page",
                  url: "vla-research.html"
                }, "secondary")
              : ""}
            </div>
          </div>
        </article>
      `;
      }
    )
    .join("");
}

function renderFuturePapers(language) {
  const container = document.getElementById("future-paper-list");
  const venueLabel = language === "zh" ? "目标投稿" : "Target Venue";
  const contributionLabel = language === "zh" ? "预计贡献" : "Expected Contribution";
  container.innerHTML = localeData[language].futurePapers
    .map(
      (item) => {
        const primaryLink = item.links?.[0];
        const secondaryLinks = item.links?.slice(1) ?? [];
        return `
        <article class="future-paper-card">
          <div class="future-paper-head">
            <div class="future-paper-meta-row">
              <span class="future-paper-status">${item.status}</span>
              <span class="future-paper-track">${item.track}</span>
            </div>
            <h3 class="publication-title">${item.title}</h3>
            <p class="future-paper-target"><strong>${venueLabel}:</strong> ${item.venue}</p>
          </div>
          <p class="future-paper-summary">${item.summary}</p>
          <div class="future-paper-focus">
            <strong>${contributionLabel}</strong>
            <p>${item.contribution}</p>
          </div>
          <div class="card-action-stack">
            <div class="card-action-primary">
              ${primaryLink ? renderActionLink(primaryLink, "primary") : ""}
            </div>
            <div class="card-action-secondary">
              ${secondaryLinks.map((link) => renderActionLink(link, "secondary")).join("")}
            </div>
          </div>
        </article>
      `;
      }
    )
    .join("");
}

function renderProjects(language) {
  const container = document.getElementById("project-list");
  container.innerHTML = localeData[language].projects
    .map(
      (item) => {
        const primaryLink = item.links?.[0];
        const secondaryLinks = item.links?.slice(1) ?? [];
        return `
        <article class="project-card">
          <div class="card-state-row">
            <span class="card-state-badge">${getProjectState(language, item)}</span>
          </div>
          <div class="project-head">
            <h3>${item.title}</h3>
            <p class="project-meta">${item.meta}</p>
          </div>
          <p class="project-summary">${item.description}</p>
          <div class="card-action-stack">
            <div class="card-action-primary">
              ${primaryLink ? renderActionLink(primaryLink, "primary") : ""}
            </div>
            <div class="card-action-secondary">
              ${secondaryLinks.map((link) => renderActionLink(link, "secondary")).join("")}
            </div>
          </div>
        </article>
      `;
      }
    )
    .join("");
}

function renderExperience(language) {
  const container = document.getElementById("experience-list");
  const experienceCards = {
    zh: [
      {
        label: "教育背景",
        period: "2024 - 至今",
        title: "湖北大学",
        subtitle: "人工智能专业研究生 / EILab",
        detail: "围绕 VLA、具身智能、强化学习与机械臂操作开展研究，并持续积累系统实现与实验复现经验。",
        tags: ["Artificial Intelligence", "EILab", "Graduate Research"]
      }
    ],
    en: [
      {
        label: "Education",
        period: "2024 - Present",
        title: "Hubei University",
        subtitle: "Graduate Student in Artificial Intelligence / EILab",
        detail: "Conducting research on VLA, embodied intelligence, reinforcement learning, and robot manipulation with an emphasis on system building and reproducible experimentation.",
        tags: ["Artificial Intelligence", "EILab", "Graduate Research"]
      }
    ]
  };

  container.innerHTML = experienceCards[language]
    .map(
      (item) => `
        <article class="experience-card">
          <div class="experience-card-head">
            <span class="experience-card-label">${item.label}</span>
            <span class="experience-card-period">${item.period}</span>
          </div>
          <div class="experience-card-body">
            <h3>${item.title}</h3>
            <p class="experience-card-subtitle">${item.subtitle}</p>
            <p class="experience-card-detail">${item.detail}</p>
          </div>
          <div class="experience-card-tags">
            ${item.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function updateLanguageButtons() {
  document.querySelectorAll(".lang-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === currentLanguage);
  });
}

function renderPage(language) {
  applyStaticText(language);
  renderNews(language);
  renderFeaturedProject(language);
  renderSmartAgricultureFeature(language);
  renderVlaDirection(language);
  renderFilters(language);
  renderPublications(language);
  renderFuturePapers(language);
  renderProjects(language);
  renderExperience(language);
  updateLanguageButtons();
}

function setLanguage(language) {
  currentLanguage = localeData[language] ? language : DEFAULT_LANGUAGE;
  window.localStorage.setItem(STORAGE_KEY, currentLanguage);
  renderPage(currentLanguage);
}

document.querySelectorAll(".lang-button").forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

renderPage(currentLanguage);
