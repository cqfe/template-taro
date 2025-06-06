<template>
  <view class="index">
    <nut-cell title="路由参数" :desc="instance.router.params.id"></nut-cell>
    <demo-cmp></demo-cmp>
    <nut-button @click="onTryRequest">发起请求</nut-button>
    <span :class="$style.greenText">这是cssModule测试</span>
  </view>
</template>

<script setup>
import Taro from '@tarojs/taro'
import DemoCmp from '@/components/DemoCmp/index.vue'
import { getStart } from '@/apis/boxApi'

const instance = Taro.getCurrentInstance()
definePageConfig({
  navigationBarTitleText: 'PageB',
})

function onTryRequest() {
  getStart().then((res) => {
    console.log(res, 'onTryRequest')
  })
}
</script>

<style lang="scss" module>
.greenText {
  color: var(--color-success);
}
</style>
