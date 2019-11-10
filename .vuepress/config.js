const fs = require('fs')
const path = require('path')

const home = '/'
const tech = '/technology'
const ch = '/chinese-studies'
const joker = 'joker'
const thinker = '/thinker'

module.exports = {
  base: '/',
  title: '壹十八画生的个人博客',
  description: '善读者，玩索而有得焉',
  search: true,
  searchMaxSuggestions: 5,
  dest: 'output',
  themeConfig: {
    nav: [
      { text: '首页', link: home },
      { text: '技术心得', link: `${tech}/index` },
      { text: '国学爱好者', link: `${ch}/index` },
      { text: '段子手', link: `${joker}/index` },
      { text: '多想', link: `${thinker}/index` },
    ],
    sidebar: {
      [tech]: getFileList(tech),
      [ch]: getFileList(ch),
      [thinker]: getFileList(thinker),
      [joker]: getFileList(joker),
    }
  }
}

function getFileList(dir) {
  const dirPath = path.join(process.cwd(), dir)
  return fs.readdirSync(dirPath)
      .filter(file => file !== 'index.md')
      .map(file => {
        const name = file.replace(/\.md$/, '')
        return `${dir}/${name}`
      })
}
