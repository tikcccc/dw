# DWSS-BIM 产品需求文档 (PRD)

## 一、文档信息 (Cover & Meta)

| 字段 | 内容 |
| --- | --- |
| 项目名称 | DWSS-BIM 资源管理系统 |
| 文档版本 | V1.0.0 |
| 版本历史 | 见修订记录 |
| 更新时间 | 2025-07-07 |
| 产品经理 | XXX |
| 参与人员 | 开发 / 测试 / 设计 / 运营 |

## 二、修订记录

| 版本号 | 日期 | 内容描述 | 作者 | 状态 |
| --- | --- | --- | --- | --- |
| V1.0.0 | 2025-07-07 | 初稿创建 | 产品经理 | 待评审 |

## 三、背景与目标

### 3.1 业务背景

建筑施工现场日常安全检查、质量监督依赖 DWSS (Digital Works Supervision System) 系统进行记录和追踪。而 BIM (Building Information Modeling) 作为施工全周期三维数据模型，具备构件层级的精细管理能力。

将 BIM ([Autodesk Docs](https://www.autodesk.com.cn/products/autodesk-docs/overview)) 与 DWSS 系统打通，可实现**"模型即表单入口"**，提升检查效率、定位精度和资料一致性。

### 3.2 问题陈述

当前系统存在以下问题：
- BIM模型与DWSS表单数据孤立，缺乏有效关联
- 构件检查记录难以快速定位到具体模型位置
- 文件版本管理混乱，缺乏与构件的精确绑定关系
- 历史版本追溯困难，无法有效对比构件变更前后状态
- 缺乏统一的资源管理视图和权限控制体系

### 3.3 产品目标 & 成功指标

**核心目标**：
- 构建 BIM 模型与 DWSS 表单的强关联视图
- 实现基于 HyD Code 的构件绑定与高亮显示系统
- 提供基于构件的表单与附件快速检索与预览功能
- 建立完整的版本管理和历史追溯机制

**成功指标**：
- 构件定位效率提升 60%（从模型点击到表单查看 ≤ 3步操作）
- 资源检索准确率 ≥ 95%
- 用户操作响应时间 ≤ 2秒
- 系统稳定性 ≥ 99.5%

## 四、竞品 & 用户分析

### 4.1 用户画像

**主要用户群体**：
- **管理员**：项目管理和资源绑定操作，系统配置和用户管理，负责数据维护具备最高权限
- **授权用户**：日常检查和资源查看，具备基本操作权限
- **访客用户**：仅查看权限，用于外部合作方或临时访问

**使用环境**：
- 建筑施工现场移动端访问
- 办公室桌面端管理操作
- 跨地域协作和远程检查

### 4.2 竞品分析

**现有解决方案局限性**：
- 传统BIM软件缺乏与业务系统的深度集成
- 现有DWSS系统无法提供三维可视化定位
- 市场上缺乏专门针对建筑检查流程的集成解决方案

**差异化优势**：
- 基于HyD Code的精确构件识别和追溯系统
- 智能绑定关系管理和版本控制
- 深度集成的DWSS表单关联功能

## 五、产品整体设计

### 5.1 产品定位

DWSS-BIM是一个专为建筑施工现场设计的资源管理和检查系统，通过BIM模型与DWSS表单的深度集成，提供基于构件的可视化管理平台。

### 5.2 价值主张 (Value Proposition)

**对于管理员**：
- 提供统一的资源管理视图，简化复杂绑定关系维护
- 基于HyD Code的智能追溯，快速定位问题根源
- 可视化的批量操作，大幅提升数据维护效率

**对于现场人员**：
- 点击模型直达相关表单和文件，操作流程简化80%
- 三维可视化定位，减少现场查找时间
- 移动端友好的交互设计，适应现场作业环境

**对于质检人员**：
- 历史版本对比功能，快速识别构件变更影响
- 多维度筛选和检索，精确定位检查目标
- 完整的操作审计，确保检查记录可追溯

### 5.3 用户流程/用户旅程

**主流程**：登录认证 → 项目选择 → 模型加载 → 构件筛选/选择 → 资源查看/绑定 → 表单操作/文件预览

**支流程**：
- 历史版本查看：构件选择 → 版本切换 → 对比分析 
- 批量绑定操作：多构件选择 → 文件批量关联 → 绑定确认 → 结果反馈
- 权限管理：用户导入 → 角色分配 → 权限验证 → 操作授权

## 六、功能需求

### 6.1 用户故事点

### 认证与用户管理 (User Authentication & Management)

#### 基础认证流程
1. **作为未授权用户**，我想要通过 ACC 三步认证登录系统，以便安全访问资源管理系统
2. **作为首次登录用户**，我想要系统自动识别我的邮箱并分配对应的预设角色，以便立即获得相应权限
3. **作为用户**，我想要在登录后看到基于我角色的定制化界面，以便快速理解我的操作权限

#### 权限管理和用户邀请
4. **作为管理员**，我想要通过邮箱邀请用户并分配角色（普通用户/授权用户/管理员），以便快速配置团队权限
5. **作为管理员**，我想要在管理后台查看所有用户的角色和活动状态，以便进行用户管理
6. **作为管理员**，我想要实时修改用户角色并立即生效，以便灵活调整权限结构

#### 权限验证机制
7. **作为系统**，我需要在每个操作前验证用户权限，确保普通用户只能查看、授权用户只能操作自己的文件、管理员可以操作所有内容
8. **作为用户**，当我尝试超出权限范围的操作时，我想要收到明确的权限提示，以便了解操作限制

### 联动交互操作 (Interactive Operations)

#### 基础联动交互
9. **作为任何角色用户**，我想要点击RISC表单或文件列表中的条目时自动高亮关联构件，以便快速定位问题位置
10. **作为任何角色用户**，我想要点击条目时自动筛选另一个列表显示相关项目，以便查看关联资源
11. **作为任何角色用户**，我想要点击BIM构件时自动筛选两侧列表显示相关条目，以便查看构件绑定的文件和表单
12. **作为任何角色用户**，我想要通过双向联动交互快速在模型与资源间切换，以便提高工作效率

#### 权限控制的交互差异
13. **作为普通用户**，我想要在联动交互中只看到"查看"选项，以便了解我的权限限制
14. **作为授权用户**，我想要在联动交互中看到针对我上传文件的"编辑"选项，以便管理自己的内容
15. **作为管理员**，我想要在联动交互中看到完整的"管理"选项，以便执行所有操作

### 高亮系统管理 (Highlighting System)

#### 统一高亮规则
16. **作为任何角色用户**，我想要通过HyD Code筛选产生黄色高亮构件，以便查看筛选结果
17. **作为任何角色用户**，我想要通过手动点击产生蓝色高亮构件，以便精确选择目标
18. **作为任何角色用户**，我想要蓝色高亮优先于黄色高亮进行列表筛选，以便手动选择具有最高优先级
19. **作为任何角色用户**，我想要看到筛选高亮和手动高亮的并集效果，以便全面了解当前状态

### 模型与构件操作 (Model & Component Operations)

#### 模型管理权限
20. **作为管理员**，我想要关联多个 ACC 模型到项目，以便管理复杂工程结构
21. **作为任何角色用户**，系统自动解析 HyD Code 并缓存索引，以便快速加载筛选器
22. **作为任何角色用户**，我想要通过 7 级联动筛选器精确选择构件，以便定位关键部件
23. **作为任何角色用户**，当点击构件时自动高亮并展示详情，以便直观核查问题
24. **作为任何角色用户**，当构件缺少 HyD Code 时收到明确提示，以便了解无法绑定的原因

### 资源关联管理 (Resource Association Management)

#### 基于角色的绑定权限
25. **作为管理员**，我想要为选定构件绑定任何 ACC 文件，以便管理所有文档版本
26. **作为授权用户**，我想要为选定构件绑定我上传的 ACC 文件，以便管理自己的文档
27. **作为普通用户**，我想要查看构件关联的所有文件和表单，但无法进行绑定操作
28. **作为任何角色用户**，我想要点击文件时在 Viewer 内预览，无需跳转 ACC 平台（基于CDE权限）
29. **作为任何角色用户**，我想要通过表单记录跳转 DWSS 系统，直接处理整改任务

#### 智能删除绑定
30. **作为管理员**，我想要删除任何文件绑定时收到智能提示，以便做出正确决策
31. **作为授权用户**，我想要删除自己上传文件的绑定时收到智能提示，以便了解操作后果
32. **作为系统**，我需要在绑定删除时验证文件所有权，确保授权用户只能删除自己的文件绑定

### 文件管理增强 (Enhanced File Management)

#### 基于所有权的文件操作
33. **作为管理员**，我想要基于蓝色高亮构件添加任何文件，以便确保正确的文件关联
34. **作为授权用户**，我想要基于蓝色高亮构件添加我上传的文件，以便管理自己的文档关联
35. **作为管理员**，我想要在高亮构件上右键选择"管理关联文件"，以便快速进入文件管理页面
36. **作为管理员**，我想要修改任何文件的类型但不能修改文件名，以便维护数据准确性
37. **作为授权用户**，我想要修改自己上传文件的类型但不能修改文件名，以便维护数据准确性

#### 文件所有权验证
38. **作为系统**，我需要在每个文件操作前验证文件所有权，确保授权用户只能操作自己上传的文件
39. **作为用户**，当我尝试操作非自己上传的文件时，我想要收到明确的所有权提示
40. **作为管理员**，我想要在文件列表中看到文件的上传者信息，以便进行所有权管理

### 历史版本追溯 (Historical Version Tracking)

#### 基于权限的历史访问
41. **作为任何角色用户**，我想要基于 HyD Code 快速查找历史版本构件，以便对比变更前后状态
42. **作为管理员**，我想要查看构件变更历史和关联文件变化，以便分析问题影响范围
43. **作为管理员**，我想要追溯特定构件的所有历史绑定记录，以便完成合规检查
44. **作为授权用户**，我想要查看涉及自己上传文件的历史绑定记录，以便了解文件使用情况

### 系统管理 (System Management)

#### 管理员专属功能
45. **作为管理员**，我想要配置 DWSS API 密钥，确保表单跳转准确
46. **作为管理员**，当 ACC 模型更新时收到同步提示，及时处理版本差异
47. **作为管理员**，我想要在回收站恢复误删的绑定关系，防止数据丢失
48. **作为管理员**，我想要导出构件资源覆盖率报表，分析项目进度
49. **作为管理员**，我想要查看所有用户的活动日志，以便进行系统监控

#### 文件类型管理
50. **作为管理员**，我想要在后台管理文件类型定义，以便为系统提供统一的分类标准
51. **作为管理员**，我想要删除文件类型前检查关联文件，以便避免数据不一致

### 高级筛选功能 (Advanced Filtering)

#### 基于权限的筛选
52. **作为任何角色用户**，我想要按请求编号、状态、日期范围筛选RISC表单，以便快速找到目标记录
53. **作为任何角色用户**，我想要按文件名、类型、上传者筛选文件列表，以便快速定位目标文件
54. **作为授权用户**，我想要使用"我上传的文件"筛选器，以便快速找到自己的文件
55. **作为任何角色用户**，我想要只显示与最新模型绑定的表单/文件，以便知道当前版本的关联状态
56. **作为任何角色用户**，我想要一键清除所有筛选条件和高亮选择，以便回到初始状态

### 效率工具 (Efficiency Tools)

#### 权限控制的批量操作
57. **作为管理员**，我想要批量解绑构件与资源，提升数据维护效率
58. **作为授权用户**，我想要批量解绑构件与我上传的文件，提升个人文件管理效率
59. **作为任何角色用户**，我想要全局搜索 HyD Code 和文件，跨项目检索资源（基于权限范围）
60. **作为任何角色用户**，我想要收到绑定成功/失败通知，确认任务执行结果

### 邮箱邀请系统 (Email Invitation System)

#### 邮箱邀请流程
61. **作为管理员**，我想要通过邮箱地址邀请用户进入系统，以便扩展团队
62. **作为被邀请用户**，我想要收到邀请邮件并点击链接直接进入系统，以便快速开始使用
63. **作为管理员**，我想要在邮箱邀请时预设用户角色，以便用户登录后立即获得正确权限
64. **作为管理员**，我想要查看邀请状态（已发送/已接受/已过期），以便管理邀请流程

### 权限实时生效 (Real-time Permission Enforcement)

#### 实时权限更新
65. **作为管理员**，我想要修改用户角色后立即在用户界面生效，以便灵活调整权限
66. **作为用户**，当我的权限被修改时，我想要实时收到通知并看到界面更新，以便了解权限变化
67. **作为系统**，我需要在用户会话中实时验证权限，确保权限变更立即生效

### 6.2 功能列表

#### 模块一：认证与用户管理

| 功能ID | 模块 | 描述 | 目标 | 优先级 | 依赖 | 成功标准 |
| --- | --- | --- | --- | --- | --- | --- |
| **F-001** | 登录认证 | 实现 Autodesk ACC 三步认证流程，获取用户 token 与基本信息（邮箱、ACC ID），重定向至统一认证页面 | 接入 ACC，完成统一登录 | 高 | ACC OAuth API | 成功获取 token 并登录系统 |
| **F-002** | 用户信息存储 | 用户信息持久化存储（邮箱、ACC ID、首次/末次登录时间） | 建立本地用户体系| 高 | 用户表| 用户记录完整写入 |
| **F-003** | 用户角色识别与分配 | 登录后根据邮箱匹配预配置角色（普通用户/授权用户/管理员），管理员可通过邮箱邀请用户并分配角色 | 三级权限控制体系 | 高 | 用户表、角色表、邮箱邀请系统 | 登录后权限实时生效，邮箱邀请成功 |
| **F-004** | 权限继承与分层控制 | 实现高级角色继承低级角色权限：普通用户（查看）→授权用户（自有文件操作）→管理员（全部文件操作+系统管理）。系统自动跟踪文件所有权，记录每个文件的上传者，支持基于文件所有权的权限验证，确保授权用户只能操作自己上传的文件 | 精细化权限控制与文件所有权管理 | 高 | RBAC权限模型、权限继承机制、文件所有权跟踪服务 | 各角色只能访问授权功能，权限继承正确，文件所有权验证准确 |
| **F-005** | 管理后台权限 | 管理员访问独立管理后台，管理用户角色、查看活动日志、邀请用户 | 系统管理能力 | 高 | 管理后台、用户管理模块、日志系统 | 管理员能完整管理系统用户和权限 |

#### 模块二：项目与模型管理

| 功能ID | 模块 | 描述 | 目标 | 优先级 | 依赖 | 成功标准 |
| --- | --- | --- | --- | --- | --- | --- |
| **F-007** | 项目管理 | 管理员创建/编辑/归档项目（名称、描述、时间范围），支持项目状态管理 | 项目为最小管理单元 | 高 | 项目表 | 项目创建后出现在可操作列表 |
| **F-008** | 模型文件关联 | 管理员从 ACC 选择 BIM 文件关联到项目（支持多文件），记录文件元数据 | 建立模型入口 | 高 | ACC 文件接口、项目表 | 模型成功加载且可操作 |
| **F-009** | 多模型管理 | 项目关联多个 ACC 模型，支持模型列表管理、模型间切换浏览、跨模型构件检索和绑定关系保持 | 复杂工程场景支持 | 中 | 模型关系表、模型切换服务 | 模型切换响应≤2s，跨模型检索准确率≥95% |
| **F-010** | 模型更新同步 | 当 ACC 模型更新时，系统自动/手动同步元数据并提示版本差异 | 保持模型数据时效性 | 高 | ACC Webhook、版本比对逻辑 | 变更构件可识别并更新 |

#### 模块三：HyD Code 系统

| 功能ID | 模块 | 描述 | 目标 | 优先级 | 依赖 | 成功标准 |
| --- | --- | --- | --- | --- | --- | --- |
| **F-011** | HyD Code 解析与验证 | 加载模型后自动解析 HyD Code 属性，构建结构化构件索引，验证 HyD Code 完整性 | 构件筛选与绑定的基础 | 高 | Viewer SDK、属性解析逻辑 | ≥95%构件解析成功，无HyD Code构件标记并提示 |
| **F-012** | HyD Code 7级筛选器 | 基于 HyD Code 生成动态 7 级联动筛选器，默认产生黄色高亮和列表筛选，手动点击产生蓝色高亮优先级更高；直接影响BIM视图高亮显示；| 精准定位构件与智能交互，支持灵活的联合筛选模式 | 最高 | 构件索引数据、高亮系统、交互逻辑、F-048双向联合筛选管理 | 筛选响应≤800ms，优先级逻辑准确执行，双向筛选联动准确率100% |
| **F-013** | HyD Code 历史追溯 | 基于 HyD Code 快速查找绑定历史版本的构件，对比更新前后功能变化 | 精确的版本对比和问题追溯 | 高 | 版本比对引擎、HyD Code索引 | 能够快速定位并对比同一构件的历史版本 |
| **F-014** | 无HyD Code构件处理 | 对缺少 HyD Code 的构件进行标识，禁止绑定操作并提供明确错误提示 | 确保绑定操作的数据完整性 | 高 | 构件属性验证、错误提示系统 | 无HyD Code构件100%被正确识别和处理 |
| **F-015** | HyD筛选范围检测与确认 | 检测点击条目的关联构件是否超出当前HyD筛选范围，超出时弹出确认对话框询问用户是否清除筛选条件查看所有关联构件 | 避免用户操作失误，提供用户选择的灵活性 | 最高 | HyD筛选器、构件关联系统、确认对话框组件 | 范围检测准确率100%，用户确认后操作准确执行 |

#### 模块四：视图交互与高亮系统

| 功能ID | 模块 | 描述 | 目标 | 优先级 | 依赖 | 成功标准 |
| --- | --- | --- | --- | --- | --- | --- |
| **F-016** | 构件选择与批量操作 | 支持框选/点选/筛选器多选构件，提供Select All和Clear All功能，支持一键选择/清除所有HyD筛选结果构件，操作区显示已选构件数量 | 提供完整的构件交互能力，提高批量操作效率 | 高 | Viewer SDK、批量操作框架 | 多选准确率100%，批量选择准确率100% |
| **F-017** | 构件高亮与聚焦 | 点击构件或关联资源时，在 Viewer 中高亮构件 | 可视化定位构件 | 高 | Viewer SDK | 高亮响应≤1s，定位精准 |
| **F-018** | BIM视图与列表双向联动 | 点击列表条目自动高亮关联构件并筛选另一个列表显示相关项目；点击BIM构件自动筛选两侧列表显示相关条目；明确区分筛选联动和点击选择联动：主动筛选列表操作（搜索、标签选择等）不影响BIM视图高亮的独立性，保持点击构件/条目的选择联动功能 | 实现数据间的即时双向联动交互，确保筛选和选择行为的独立性 | 最高 | 事件处理服务、高亮系统、构件选择系统、列表筛选系统、F-048双向联合筛选管理 | 点击响应时间≤1s，联动准确率100%，筛选独立性验证通过 |
| **F-019** | 高亮系统统一管理 | 筛选高亮(黄色)与手动高亮(蓝色)的统一管理，蓝色优先级更高 | 明确的高亮状态管理 | 最高 | 高亮状态管理器 | 高亮状态变化实时响应 |
| **F-020** | 清除筛选功能 | 支持分层清除筛选条件单一筛选条件清除和所有筛选条件清除：可以分层点击清除Hydcode或者文件或者RISC列表的筛选条件，也有一键清除所有筛选条件、高亮选择和列表状态的功能 | 快速重置系统状态 | 高 | 状态管理工具类 | 清除操作完整性100% |
| **F-021** | 右键菜单管理 | 在高亮构件上右键选择"管理关联文件"快速进入文件管理 | 提供快捷的操作入口 | 中 | 右键菜单组件 | 右键菜单响应时间≤300ms |

#### 模块五：资源关联与绑定

| 功能ID | 模块 | 描述 | 目标 | 优先级 | 依赖 | 成功标准 |
| --- | --- | --- | --- | --- | --- | --- |
| **F-022** | 构件绑定文件 | 授权用户和管理员可选择构件后关联ACC文件（多选），必须指定文件版本，记录绑定时间，授权用户只能绑定自己上传的文件 | 构件↔文件多对多关系 | 高 | 文件版本接口、构件选择器、F-004权限校验 | 绑定记录含精确版本和时间信息，权限控制准确 |
| **F-023** | 构件绑定表单 | 构件关联到DWSS系统的RISC表单，记录表单ID和跳转URL | 连接模型与业务数据 | 高 | DWSS表单API、权限校验 | 点击可跳转至正确表单页 |
| **F-024** | 构件与资源双向关联查询 | 选择构件时展示所有关联的文件（含版本）和表单列表；点击文件/表单时高亮所有关联构件 | 构件与资源的双向追溯和关联视图 | 高 | 绑定关系表、绑定关系索引、前端展示组件、Viewer SDK | 实时显示完整资源记录，关联构件全部高亮显示 |
| **F-025** | 智能删除绑定 | 删除构件-文件绑定关系时智能判断影响范围，提供不同级别确认提示，授权用户只能删除自有文件绑定 | 防止误操作和数据丢失 | 高 | 绑定关系分析、智能提示系统、F-004权限校验 | 准确识别影响范围，提供清晰警告，权限控制准确 |
| **F-026** | 绑定关系修改 | 授权用户和管理员可修改文件关联的构件集合（增删构件），授权用户仅限自有文件 | 动态调整资源结构 | 高 | 构件选择器、版本管理、F-004权限校验 | 修改后视图实时更新，权限控制准确 |
| **F-027** | 绑定关系可视化管理 | 提供关系图谱界面管理构件↔文件/表单的复杂关联关系，支持拖拽式批量关联/解绑和网络图展示 | 高效维护复杂绑定关系，可视化管理多对多关系 | 中 | 关系图谱组件、拖拽交互组件 | 支持拖拽式批量关联/解绑，关系图谱清晰展示 |
| **F-028** | 基于高亮构件的文件添加 | 只有蓝色高亮构件才能进行文件关联操作，包含状态检查 | 确保文件关联的准确性 | 高 | 构件选择系统、按钮状态管理 | 添加按钮状态准确响应 |

#### 模块六：文件管理

| 功能ID | 模块 | 描述 | 目标 | 优先级 | 依赖 | 成功标准 |
| --- | --- | --- | --- | --- | --- | --- |
| **F-029** | 文件预览 | 在嵌入式 Viewer 中预览文件，基于用户的CDE权限范围 | 无需跳转 ACC 查看文件 | 高 | ACC Viewer SDK、CDE权限校验 | 预览打开成功率≥99%，权限控制准确 |
| **F-032** | 文件时间管理 | 记录文件上传时间（首次关联时间）和更新时间（任何关联变更时间），标识上传者 | 确保绑定时间准确性 | 高 | ACC 版本 API、版本历史表、时间戳记录、用户关联 | 时间记录准确，上传者信息完整 |
| **F-033** | 文件重复检测 | 上传文件前检测文件是否已存在于系统中，阻止重复上传，并向用户明确提示已存在的文件信息（文件名） | 避免文件冗余和管理混乱，提供清晰的重复文件反馈 | 高 | 文件指纹识别、重复检测算法、用户反馈组件 | 重复文件检测准确率100%，用户反馈信息完整准确 |
| **F-034** | 文件列表高级筛选 | 按文件名搜索、类型选择、上传日期范围、个人文件、绑定状态等主动筛选手段进行文件筛选；支持双向联合筛选：可与HyD Code筛选双向联动，筛选结果不直接影响BIM视图高亮 | 快速定位目标文件，支持多维度联合筛选 | 高 | 文件筛选服务、F-048双向联合筛选管理 | 筛选结果准确率≥98%，双向联动响应时间≤1s |
| **F-035** | 文件编辑权限 | 授权用户可新增文件并修改/删除自己上传的文件，可修改自己上传文件的文件类型；管理员可对所有文件执行所有操作；文件名和所有标签均不可修改（完全由F-046统一标签系统自动管理） | 精细化文件管理权限 | 中 | 权限系统、文件编辑组件、文件所有权跟踪、F-046统一标签系统、F-047文件类型管理 | 权限控制准确性100%，文件所有权验证正确，标签修改完全禁止，文件类型修改准确 |

#### 模块七：RISC表单管理

| 功能ID | 模块 | 描述 | 目标 | 优先级 | 依赖 | 成功标准 |
| --- | --- | --- | --- | --- | --- | --- |
| **F-036** | 表单跳转 | 点击表单链接（requesat no.)在新窗口打开 DWSS的RISC表单详情页 | 快速访问原始业务数据 | 高 | DWSS URL 拼接逻辑 | 正确打开目标表单页 |
| **F-037** | DWSS 系统对接配置 | 管理员配置 DWSS API 密钥、表单模板映射规则 | 确保表单跳转准确性 | 高 | 系统配置模块 | 点击表单正确跳转目标系统 |
| **F-038** | RISC表单高级筛选 | 按请求编号搜索、inspection选择、状态选择、日期范围等主动筛选手段进行RISC表单筛选，支持基于F-046统一标签系统自动生成的RISC标签进行筛选；支持双向联合筛选：可独立筛选，可与HyD Code筛选双向联动，保持与BIM视图的独立性 | 精确定位RISC记录，支持多维度联合筛选 | 高 | 筛选组件、模糊搜索、F-046统一标签系统、F-048双向联合筛选管理 | 筛选响应时间≤500ms，标签筛选准确率≥98%，双向联动准确率100% |

#### 模块八：系统管理与工具

| 功能ID | 模块 | 描述 | 目标 | 优先级 | 依赖 | 成功标准 |
| --- | --- | --- | --- | --- | --- | --- |
| **F-039** | 资源详情面板 | 展示构件绑定资源的详细信息：文件版本/上传时间/更新时间、表单状态/创建者等 | 提供完整资源上下文 | 高 | 资源元数据接口 | 关键信息完整展示 |
| **F-040** | 审计日志 | 记录关键操作：用户登录、绑定/解绑、文件关联等（操作者、时间、对象 ID），管理员可查看所有用户和仪表板的活动日志 | 数据变更追踪 | 中 | 日志系统 | 所有操作可追溯 |
| **F-041** | 构件索引缓存 | 缓存解析后的构件数据（HyD Code、属性），支持增量更新 | 提升重复访问性能 | 中 | 缓存服务 | 二次加载时间减少 50% |
| **F-042** | 报表导出 | 导出项目资源报表（构件绑定覆盖率、文件分布等） | 业务数据分析 | 低 | 报表引擎 | 导出 Excel/PDF 格式完整 |
| **F-043** | 全局搜索 | 跨项目检索构件（HyD Code）、文件、表单，基于用户权限范围 | 快速定位资源 | 中 | 全文索引引擎、权限校验 | 搜索结果精准排序，权限控制准确 |
| **F-044** | 资源回收站 | 删除的绑定关系进入回收站，支持恢复或永久清除 | 防止误操作数据丢失 | 低 | 软删除机制 | 数据可恢复，保留操作记录 |
| **F-045** | 通知中心 | 关键操作结果通知（绑定成功/失败、模型更新完成） | 实时反馈系统状态 | 低 | 消息推送服务 | 用户及时感知操作结果 |
| **F-046** | 统一标签系统 | 系统根据文件类型、上传时间、关联构件等信息自动生成文件标签；根据DWSS中的RISC表单属性自动生成RISC标签；为所有标签相关功能提供统一的自动标签生成和管理服务 | 集中化标签管理，确保标签系统的一致性和自动化 | 中 | 标签表、文件-标签关系表、自动标签生成引擎、RISC标签生成引擎、F-047文件类型管理 | 标签自动分配准确率≥98%，标签规则统一管理，系统无人工标签操作 |
| **F-047** | 文件类型管理 | 管理员可在后台添加、修改、删除文件类型，支持文件类型的层级分类和属性定义；删除文件类型时检查是否有关联文件，如有则禁止删除并提示具体文件信息 | 为文件分类和标签系统提供基础数据管理 | 中 | 文件类型表、文件类型关联检查服务、管理后台界面 | 文件类型操作成功率100%，关联检查准确率100%，删除限制有效 |
| **F-048** | 双向联合筛选管理 | 统一管理HyD Code筛选和标签筛选的状态，支持双向筛选：HyD Code筛选→标签筛选 或 标签筛选→HyD Code筛选；明确区分主动筛选操作（搜索、标签选择、下拉筛选器）与点击交互行为；保持标签筛选与BIM视图高亮的独立性 | 实现灵活的多维度联合筛选，提高数据检索效率 | 高 | 筛选状态管理器、筛选链路管理、可视化筛选界面 | 双向筛选响应≤1s，筛选状态管理准确率100%，筛选独立性验证通过 |


## 七、详细需求说明

### 权限模型整合说明

#### 用户角色定义
根据提供的权限参考，系统采用三级用户角色：

1. **普通用户 (View-only User)**
   - 查看所有项目、模型及关联的RISC表单和ACC文件
   - 查看链接到特定BIM构件的文档和表单
   - 使用基础筛选功能
   - 无任何修改或操作权限

2. **授权用户 (Authorized User)**
   - 拥有普通用户的所有权限
   - 可进入"文件管理"页面，新增文件，修改/删除自己上传的文件
   - 可修改自己上传文件的文件类型
   - 可进入"绑定模式"，修改自己上传文件的绑定关系

3. **管理员 (Administrator)**
   - 查看所有项目、模型、RISC表单和ACC文件
   - 查看所有用户和仪表板的活动日志
   - 可对所有文件执行所有操作（新增、删除、编辑）
   - 可进入"绑定模式"，修改任何文件的绑定关系
   - 访问独立的管理后台
   - 管理已通过CDE登录用户的系统内角色及权限
   - 通过邮箱邀请用户进入仪表板
   - 管理文件类型（添加、修改、删除文件类型定义）

#### 权限集成特点
- **权限继承机制**：高级角色继承低级角色的所有权限
- **邮箱邀请机制**：管理员通过邮箱邀请用户授权进入仪表盘并分配角色
- **文件所有权跟踪**：系统自动记录每个文件的上传者信息，实现基于文件所有权的权限验证
- **标签系统自动化**：所有标签（文件标签、RISC标签）完全由系统基于数据特征自动生成和管理

### F-012 HyD Code 7级筛选器

#### 核心功能
- 在左侧栏提供基于HyD Code的多层级（如Project, Contractor, System等）下拉菜单进行联动筛选。

#### 默认效果
选择筛选条件后，匹配的BIM构件将被自动高亮（黄色），同时两侧的RISC和文件列表会默认根据这些黄色构件进行筛选，显示相关联的条目。

#### 优先规则
如果用户在任何时候手动点击了构件（产生蓝色高亮），那么两侧列表的筛选逻辑会立即改变：列表将忽略黄色的筛选结果，转而仅依赖蓝色高亮的构件进行筛选和显示。蓝色高亮（手动选择）在列表筛选上拥有最高优先级。

### F-013 HyD Code 历史追溯

#### 核心功能
基于 HyD Code 作为构件的唯一标识符，实现精确的历史版本追溯和对比功能。

#### 交互流程
1. 用户选择当前版本构件
2. 系统基于 HyD Code 自动查找历史版本中的同一构件
3. 提供版本切换界面，支持对比查看
4. 高亮显示变更内容和关联文件差异

#### 异常处理
- 历史版本中找不到对应 HyD Code 构件时，提示"该构件在历史版本中不存在"
- 构件属性发生重大变更时，标记为"需要人工确认"

### F-014 无HyD Code构件处理

#### 验证机制
系统加载构件时自动检查每个构件的 HyD Code 完整性：
- 检查 HyD Code 7个层级是否完整
- 验证 HyD Code 格式是否符合规范
- 标记无效或缺失的 HyD Code 构件

#### 用户提示
- 在构件列表中以特殊颜色标记无 HyD Code 构件
- 当用户尝试绑定无 HyD Code 构件时，显示错误提示："该构件缺少有效的 HyD Code，无法执行绑定操作。请联系模型管理员完善构件属性。"
- 在绑定操作界面禁用相关按钮

#### 管理员工具
- 提供无 HyD Code 构件的统计报告
- 支持批量导出无效构件列表用于模型修正

### F-015 HyD筛选范围检测与确认

#### 触发条件
当用户已激活HyD Code筛选（视图中已有黄色高亮构件）后，再点击RISC或文件列表中的条目时。

#### 交互逻辑
**情况一：关联构件在筛选范围内**
- 条件：所点击条目关联的所有构件均在当前HyD Code筛选结果之内
- 操作：系统直接将这些构件以蓝色高光显示，覆盖原有的黄色高亮

**情况二：关联构件超出筛选范围**
- 条件：所点击条目关联的构件有任何一个不在当前HyD Code筛选结果之内
- 提示：系统弹窗提示"该条目关联的构件超出了您当前的筛选范围，是否要清除筛选并查看所有关联构件？"
- 选项：
  - 保留筛选：弹窗关闭，界面维持现状，操作中止
  - 清除筛选：系统自动清除所有HyD Code筛选条件，并以蓝色高光显示该条目关联的全部构件

### F-016 批量选择操作

#### Select All 功能
- **显示条件**：仅在激活HyD Code筛选且非绑定模式时显示
- **功能描述**：一键选择所有筛选结果中的构件，进入蓝色高亮状态
- **实时计数**：按钮显示当前筛选结果数量
- **交互反馈**：点击后所有筛选构件立即变为蓝色高亮

#### Clear All 功能
- **显示条件**：仅在激活HyD Code筛选且非绑定模式时显示
- **功能描述**：一键清除所有手动选择的构件（仅清除筛选范围内的蓝色高亮）
- **实时计数**：按钮显示当前可清除的构件数量
- **禁用逻辑**：当没有可清除的手动选择时按钮禁用

### F-018 列表与BIM视图双向联动

#### 核心功能
实现列表与BIM视图间的实时双向联动交互，提供统一的数据视图。

#### 列表到视图联动
- **操作**：在左侧RISC表单列表或右侧文件列表中单击任一条目
- **效果**：系统自动在中太BIM视图中高亮（蓝色）其所有关联的BIM构件
- **同步**：自动筛选另一个列表，仅显示与当前选中条目相关联的项目

#### 视图到列表联动
- **操作**：在BIM视图中手动单击一个或多个构件
- **效果**：构件进入蓝色高亮状态
- **同步**：两侧的RISC表单和文件列表自动筛选，仅显示与高亮构件相关联的条目

### F-019 高亮系统统一管理

#### 高亮类型定义
- **筛选高亮（黄色）**：使用HyD Code筛选后，匹配的构件视图中有筛选聚焦效果和黄色高亮效果
- **手动高亮（蓝色）**：通过单击BIM构件或条目列表项，将构件添加或移出手动高亮集

#### 优先级规则
- **默认效果**：选择HyD Code筛选条件后，匹配构件自动黄色高亮，两侧列表默认根据黄色构件筛选
- **优先规则**：如果用户手动点击了构件（产生蓝色高亮），列表筛选逻辑立即改变：忽略黄色筛选结果，仅依赖蓝色高亮构件进行筛选
- **最终高亮**：视图中最终呈现的高亮效果为两个高亮集的并集

### F-022 构件绑定文件

#### 核心规则
此流程支持所有当前在BIM视图中被高亮的构件。只有是蓝色高亮的构件才可以于发起文件关联。
为了确保操作体验的连贯性，文件管理页面列出的文件列表，应与主仪表盘筛选出的文件列表保持一致。

#### 交互逻辑
具体步骤如下：
1.高亮构件：通过手动点击构件或者条目（产生蓝色高亮），使一个或多个目标构件处于高亮状态。
2.再通过以下方式触发文件管理流程：
• 右键菜单: 在任意一个被蓝色高亮的构件上右键单击，从弹出的菜单中选择"管理关联文件"。
 1. 确认后，进入一个全屏的"文件管理"页面，该页面已预先加载了所选构件的信息。
 2. 确认后，自动进入一个全屏的"文件管理"页面，同时用户跳转页面从集成的ACC平台中选择新文件进行上传。
 3. 确认操作后，系统将回到"文件管理"页面，让用户选择新上传的文件的文件类型，然后点击确认上传。


### F-F-025 智能删除绑定系统

#### 核心机制
删除操作本质上是解除文件与构件的绑定关系，而非删除文件本身。系统需要智能判断删除绑定关系后的影响范围。

#### 单个文件删除逻辑

**情况一：删除绑定后文件仍有其他构件绑定**
- **交互规则**：显示蓝色链接图标，提示"是否解除当前文件和已选择构件的绑定关系？"
- **操作结果**：仅解除与高亮构件的绑定，文件继续存在于文件列表中
- **后置条件**：绑定关系表中对应记录被移除，其他绑定关系保持不变

**情况二：删除绑定后文件无任何构件绑定**
- **交互规则**：显示红色警告图标（AlertCircle），提示"因为解除这组绑定关系后，这个文件将无任何绑定的构件，所以将会从文件列表里面移除，此操作不可以撤销，确定是否这样做？"
- **操作结果**：完全从文件列表中移除文件
- **后置条件**：文件从系统中逻辑删除，相关绑定关系全部清除

#### 批量文件删除逻辑

**情况一：所有文件删除绑定后都还有其他构件绑定**
- **交互规则**：显示蓝色链接图标，提示"是否解除当前批量文件和已选择构件的绑定关系？"
- **操作结果**：批量解除指定绑定关系

**情况二：部分文件删除绑定后将无任何构件绑定**
- **交互规则**：显示红色警告图标，提示"因为解除这组绑定关系后，这些文件（显示具体文件名）将无任何绑定的构件，所以将会从文件列表里面移除，此操作不可以撤销，确定是否这样做？"
- **操作结果**：部分文件完全移除，其他文件仅解除绑定

### F-032 文件时间管理机制

#### 上传时间
定义为文件第一次与项目构件创建关联的时间。即使该文件之后与其他构件创建新的关联关系，上传时间仍指向第一次创建关联的时间。

#### 更新时间
定义为文件与任何构件关联被修改后记录的时间，包括：
- 文件新增关联的时间（非第一次创建关联）
- 文件删除关联的时间
- 任何绑定关系的变更操作

#### 上传者标识
记录文件第一次上传到平台并与构件创建初始关联的用户，与上传时间同时建立。

### F-033 文件重复检测

#### 检测时机
用户上传文件到平台时，系统自动执行重复检测。

#### 检测逻辑
- 检查文件是否已经存在于当前项目的文件列表中
- 基于文件id等信息进行综合判断
- 如果检测到重复文件，拒绝上传并提供明确提示

#### 错误处理
- 提示用户"该文件已存在于系统中，请检查文件列表或重命名后重试"
- 可显示已存在文件的文件名

### F-034 文件列表高级筛选

#### 筛选选项
 - 模糊搜索: 按 "文件名" 进行模糊搜索。 
 - 文件类型筛选: 按 "文件类型" 筛选。 
 - 日期范围筛选: 按自定义的上传起止日期进行筛选。 
 - 个人文件筛选: 可勾选 "我上传的文件" 筛选出当前用户上传的所有文件。 
 - 绑定状态筛选: 可勾选 "只显示与最新模型绑定的文件"。

### F-035 文件类型编辑功能

#### 核心规则
- 在文件页面，有权限的用户（管理员或文件上传者）可以点击"编辑"按钮。
- 在弹出的编辑窗口中，用户可以修改文件的类型（通过下拉菜单选择），但无法修改文件名（输入框为禁用状态）。
- 保存后，文件的"类型"会同步更新。

### F-038 RISC表单高级筛选

#### 筛选选项
 - 模糊搜索: 按 "请求编号(Request No)和inspection" 进行模糊搜索。 
 - 状态筛选: 按 "Status (如Approved, Submitted)" 筛选。 
 - 日期范围筛选: 按自定义的起止日期进行筛选。 
 - 绑定状态筛选: 可勾选 "只显示与最新模型绑定的表单"。

### 新增权限详细说明

#### 文件所有权跟踪机制

**实现原理**：
- 系统在文件第一次上传时自动记录上传者信息
- 文件所有权信息存储在文件元数据中，包含：用户ID、上传时间、邮箱地址
- 所有权信息在文件生命周期内保持不变，不可转移

**权限验证流程**：
1. 用户发起文件操作请求
2. 系统获取文件所有权信息
3. 比对当前用户身份与文件所有者
4. 根据用户角色和所有权进行权限判断
5. 返回权限验证结果

#### 角色继承机制

**继承层级**：
- 管理员 → 授权用户 → 普通用户
- 高级角色自动获得低级角色的所有权限
- 每个角色都有专属权限，不会被继承

**实现方式**：
- 权限表采用位图或标记方式存储
- 系统在权限检查时先验证专属权限，再检查继承权限
- 权限变更时自动更新继承关系

#### 邮箱邀请系统流程

**邀请发送流程**：
1. 管理员在后台输入邮箱地址和角色
2. 系统生成唯一邀请令牌
3. 发送邮件包含邀请链接和令牌
4. 记录邀请状态和过期时间

**邀请接受流程**：
1. 用户点击邮件中的邀请链接
2. 系统验证令牌有效性
3. 引导用户完成ACC登录
4. 自动分配预设角色并激活账户

#### 权限实时生效机制

**技术实现**：
- 采用基于令牌的权限验证
- 权限变更时刷新用户令牌
- 前端定期检查权限状态
- WebSocket推送权限变更通知

**用户体验**：
- 权限变更立即反映在界面上
- 受限操作按钮实时禁用/启用
- 权限提示消息实时更新

## 八、非功能需求 (NFR)

| 类型 | 要求描述 | 测试标准 |
| --- | --- | --- |
| **性能** | 构件筛选、高亮交互 ≤1s，支持同时关联构件数≥1000 个，HyD Code索引查询 ≤500ms | 压测 & BIM 模型模拟验证 |
| **兼容性** | 支持 WebGL 模型浏览器（Chrome/Safari/Edge），移动端响应式设计 | 浏览器兼容性测试 |
| **数据一致性** | 构件-表单-附件数据来自统一接口，确保版本更新同步，HyD Code唯一性约束 | 数据日志 + API 测试 |
| **安全性** | 表单访问按用户角色做最小权限控制，API接口认证，数据传输加密 | 权限验证测试，安全扫描 |
| **可用性** | 视图操作步骤≤3次完成"构件定位 + 表单查看"全流程，错误提示友好明确 | 用户测试反馈（任务完成率） |
| **可靠性** | 系统可用性≥99.5%，自动备份机制，操作失败自动重试 | 监控告警，故障恢复测试 |
| **扩展性** | 支持多项目并发，构件数量≥1万，用户数≥100 | 负载测试，容量规划 |

## 九、迭代与上线计划

| 迭代 | 周期 | 功能包 | 验证点 |
| --- | --- | --- | --- |
| **Sprint 1** | 2025-07-08 ～ 07-11 | - 文件列表、BIM模型与RISC表单三大视图间的**核心联动交互**。- 全面的**筛选功能**，包括 HyD Code 筛选、列表属性筛选等。- 基础的**文件添加与关联**功能。 | 交互正常，可以使用用户BIM模型和文件列表交互，成功筛选列表和HYDcode结果，还有上传绑定文件，包括删除绑定文件 |


> ⚠️ **依赖说明**：
> - ACC API 接入需提前申请开发者权限
> - 每轮迭代完成后需校对下轮迭代的前置功能

## 十、运营 & 风险评估

### 风险识别与应对

| 风险类型 | 风险描述 | 影响程度 | 应对策略 |
| --- | --- | --- | --- |
| **数据风险** | HyD Code 标准不统一，模型质量差异 | 中 | 制定数据验证规范 |
| **集成风险** | DWSS 系统对接延迟，第三方服务不稳定 | 高 | 建立备用接入方案，设计降级模式 |

### 运营计划

**推广策略**：
- 阶段1：内部试点项目验证（20用户）
- 阶段2：重点项目推广（100用户）
- 阶段3：全面推广和优化（500+用户）

**监控指标**：
- 用户活跃度：日活用户数、操作频次
- 功能使用率：各功能模块使用统计
- 性能指标：响应时间、错误率
- 业务价值：检查效率提升、问题定位准确率

## 十一、附录 & 支持材料

### 技术参考
- [Autodesk Platform Services API](https://aps.autodesk.com/en/docs/data/v2/developers_guide/overview/)
- [Autodesk Viewer SDK](https://aps.autodesk.com/en/docs/viewer/v7/developers_guide/overview/)
- DWSS 系统 API 对接文档
- HyD Code 标准规范文档

### 数据模型
- 构件实体关系图
- 用户权限模型设计
- 文件版本管理架构
- 绑定关系数据库设计

### 测试支持
- 用户验收测试用例
- 性能测试基准
- 安全测试检查清单
- 兼容性测试矩阵

### 术语表
- **HyD Code**: 构件层次化标识码，包含项目/承包商/位置/结构/空间/网格/类别7个层级
- **DWSS**: Digital Works Supervision System，数字化工程监管系统
- **BIM**: Building Information Modeling，建筑信息模型
- **ACC**: Autodesk Construction Cloud，欧特克建筑云平台
- **RISC**: Risk Assessment Form，风险评估表单