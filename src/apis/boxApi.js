import { service } from '@/services/boxService'

/**
 * 2-启动推理
 */
export function getStart() {
  return service({
    url: '/start',
    method: 'get',
  })
}
/**
 * 4-根据虚拟deviceChannel信息获取flv流地址
 * @param {Object} path - 路由参数
 * @param {string} path.platformId - empty
 * @param {string} path.deviceCode - empty
 * @param {string} path.channelCode - empty
 */
export function getCandeaAppApiV2OpenApiDevicesViewPlatformIdDeviceCodeChannelCode(path) {
  return service({
    url: `/candea-app/api/v2/open-api/devices/view/${path.platformId}/${path.deviceCode}/${path.channelCode}`,
    method: 'get',
  })
}
/**
 * 1-配置流地址
 * @param {Object} body - empty
 * @param {string} body.url - 获取的摄像头rstp流地址
 * @param {string} body.flag - 模型标识，"persongather"或"SWIMMER_DETECTION"
 */
export function putVideoPlatformRtspInfo(body) {
  return service({
    url: '/videoPlatform/rtsp/info',
    method: 'put',
    data: body,
  })
}
/**
 * 5-停止推理
 */
export function getStop() {
  return service({
    url: '/stop',
    method: 'get',
  })
}
