<template>
  <view class="index">
    <nut-cell title="路由参数" :desc="instance.router.params.id"></nut-cell>
    <demo-cmp></demo-cmp>
    <nut-button @click="onTryRequest">发起请求</nut-button>
    <span :class="styles.redText">这是cssModule测试</span>
  </view>
</template>

<script setup>
import Taro from '@tarojs/taro'
import DemoCmp from '@/components/DemoCmp/index.vue'
import { getStart } from '@/apis/boxApi'
import styles from './index.module.scss'

const instance = Taro.getCurrentInstance()

function onTryRequest() {
  getStart().then((res) => {
    console.log(res, 'onTryRequest')
  })
}
</script>
