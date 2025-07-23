import { resolve } from 'path'

module.exports = {
  app: 'appName',
  genApi: [{
    app: 'boxApi',
    url: 'https://pub-1252165219.cos.ap-chongqing.myqcloud.com/v2.json',
    output: resolve(process.cwd(), 'src/apis/boxApi.js'),
    service: "import service from '@/services/appName'"
  }]
}
