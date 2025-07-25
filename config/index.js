import { defineConfig } from '@tarojs/cli'
import devConfig from './dev'
import prodConfig from './prod'
import path from 'path'
import NutUIResolver from '@nutui/auto-import-resolver'
import ComponentsPlugin from 'unplugin-vue-components/webpack'

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { command, mode }) => {
  const baseConfig = {
    projectName: 'template-taro',
    date: '2024-11-7',
    alias: {
      '@/utils': path.resolve(__dirname, '..', 'src/utils'),
      '@/constants': path.resolve(__dirname, '..', 'src/constants'),
      '@/components': path.resolve(__dirname, '..', 'src/components'),
      '@/apis': path.resolve(__dirname, '..', 'src/apis'),
      '@/services': path.resolve(__dirname, '..', 'src/services'),
    },
    sass: {
      resource: [path.resolve(__dirname, '..', 'src/styles/variable.scss')],
      data: '@import "@nutui/nutui-taro/dist/styles/variables-jdt.scss";',
    },
    cache: {
      enable: true,
    },
    designWidth(input) {
      // 配置 NutUI 375 尺寸
      if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
        return 375
      }
      // 全局使用 Taro 默认的 750 尺寸
      return 750
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: ['@tarojs/plugin-html', '@tarojs/plugin-http'],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
    framework: 'vue3',
    compiler: {
      type: 'webpack5',
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
      webpackChain(chain) {
        chain.plugin('unplugin-vue-components').use(
          ComponentsPlugin({
            resolvers: [NutUIResolver({ taro: true, importStyle: 'sass' })],
          }),
        )
      },
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css',
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
      webpackChain(chain) {
        chain.plugin('unplugin-vue-components').use(
          ComponentsPlugin({
            resolvers: [NutUIResolver({ taro: true, importStyle: 'sass' })],
          }),
        )
      },
    },
  }
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
