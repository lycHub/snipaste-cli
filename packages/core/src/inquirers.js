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

const frameQues = {
  message: '选择框架',
  choices: [
    {
      name: 'react',
      value: 'react',
    },
    {
      name: 'vue3',
      value: 'vue3',
    }
  ]
}

export { pkgToolQues, frameQues };
