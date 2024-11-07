import axios from 'axios'

class Service {
  /**
   * 构造函数，用于创建 HTTP 请求的实例
   *
   * @param config axios 配置对象
   * @param beforeReq 请求前的回调函数，接收 axios 配置对象作为参数
   * @param afterRes 响应后的回调函数，接收 axios 响应对象作为参数
   * @param ignoreError 响应后忽略错误
   */
  constructor(config, beforeReq, afterRes) {
    this.service = axios.create({
      withCredentials: true,
      timeout: 3000,
      ...config,
    })
    this.service.interceptors.request.use(
      (config) => {
        if (beforeReq) {
          beforeReq(config)
        }
        return config
      },
      (error) => {
        if (axios.isCancel(error)) {
          return
        }
        console.error(error)
        return Promise.reject(error)
      },
    )

    this.service.interceptors.response.use(
      (response) => {
        if (afterRes) {
          afterRes(response)
        }
        const res = response.data
        if (!res.status) {
          return Promise.reject(new Error(res.message || 'Error'))
        } else {
          return res
        }
      },
      async (error) => {
        if (axios.isCancel(error)) {
          return
        }
        return Promise.reject(error)
      },
    )
  }

  request = (config) => {
    return this.service.request(config)
  }

  get = (url, config) => {
    return this.service.get(url, config)
  }

  post = (url, data, config) => {
    return this.service.post(url, data, config)
  }

  put = (url, data, config) => {
    return this.service.put(url, data, config)
  }

  delete = (url, config) => {
    return this.service.delete(url, config)
  }

  patch = (url, data, config) => {
    return this.service.patch(url, data, config)
  }

  head = (url, config) => {
    return this.service.head(url, config)
  }

  options = (url, config) => {
    return this.service.options(url, config)
  }
}

export default Service
