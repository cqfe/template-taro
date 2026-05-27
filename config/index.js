import { defineConfig } from '@tarojs/cli'
import devConfig from './dev'
import prodConfig from './prod'
import path from 'path'
import NutUIResolver from '@nutui/auto-import-resolver'
import ComponentsPlugin from 'unplugin-vue-components/webpack'
import webpack from 'webpack'

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge, { _command, _mode }) => {
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
      if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
        return 375
      }
      return 375
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
      prebundle: {
        enable: true,
      },
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: true,
          config: {
            namingPattern: 'module',
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
          enable: true,
          config: {
            namingPattern: 'module',
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
        // 1. 提供 process 全局变量（解决浏览器无 process）
        chain.plugin('provide').use(webpack.ProvidePlugin, [
          {
            process: 'process',
          },
        ])

        // 2. 定义环境变量（必须加，否则 process.env 依然报错）
        chain.plugin('define').use(webpack.DefinePlugin, [
          {
            'process.env': JSON.stringify(process.env),
            'process.env.TARO_ENV': JSON.stringify('h5'),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          },
        ])
      },
    },
  }
  if (process.env.NODE_ENV === 'development') {
    return merge({}, baseConfig, devConfig)
  }
  return merge({}, baseConfig, prodConfig)
})
