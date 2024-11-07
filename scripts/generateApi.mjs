import { generateApi } from '@cqfe/generate-api'
import { resolve } from 'path'

const apis = [
  {
    url: resolve(process.cwd(), 'scripts/swaggers/box.json'),
    outPut: resolve(process.cwd(), 'src/apis/boxApi.js'),
    servicePath: "import { service } from '@/services/boxService'",
  },
]
;(async () => {
  for (const api of apis) {
    await generateApi(api)
  }
})()
