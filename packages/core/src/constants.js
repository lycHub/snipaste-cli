export const OptionsMeta = {
  destination: {
    key: 'destination',
    description: '下载目录，默认/demo/',
    default: 'templates',
    option: 'destination',
    shotOption: 'des',
  },
  install: {
    key: 'install',
    description: '是否自动安装依赖',
    default: false,
    option: 'install',
    shotOption: 'i',
  },
  pkgTool: {
    key: 'pkgTool',
    description: '选择包管理工具',
    default: '',
    option: 'pkg-tool',
    shotOption: 'pt',
  },
  cwd: {
    key: 'cwd',
    description: '执行目录，默认项目根目录',
    default: process.cwd(),
    option: 'cwd',
    shotOption: '',
  },
  frame: {
    key: 'frame',
    description: '框架类型',
    default: '',
    option: 'frame',
    shotOption: '',
  },
}

export const TemplateStoreDirname = 'templates';
export const SnipStoreDirname = 'snips';
export const Relies  = [
  '@dnd-kit/core',
  '@dnd-kit/modifiers',
  '@dnd-kit/sortable',
  '@dnd-kit/utilities',
  'ahooks',
  'lodash-es',
];