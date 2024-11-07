import Service from '@/utils/request'

const boxService = new Service({
  baseURL: process.env.TARO_APP_API + '/api/v1',
})

export const service = boxService.request
export default boxService
