const installQues = {
  type: 'confirm',
  name: 'install',
  default: false,
  message: '是否安装依赖？'
}

const pkgToolQues = {
  message: '选择包管理工具',
  choices: [
    {
      name: 'npm',
      value: 'npm',
    },
    {
      name: 'yarn',
      value: 'yarn',
    },
    {
      name: 'pnpm',
      value: 'pnpm',
    },
  ],
}

const pageTypeQues = {
  type: 'list',
  name: 'pageType',
  choices: ['webpack', 'gulp'],
  default: 'webpack',
  message: 'webpack or gulp ？'
}

export { installQues, pkgToolQues, pageTypeQues };
