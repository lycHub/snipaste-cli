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
    description: 'npm、yarn或pnpm?',
    default: '',
    option: 'pkg-tool',
    shotOption: 'pt',
  },
}