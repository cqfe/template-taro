<template>
  <view class="index">
    <nut-space>
      <nut-button type="primary" @click="onClick">按钮</nut-button>
      <nut-button @click="Taro.navigateTo({ url: '/pages/pageB/index?id=1' })">去PageB</nut-button>
    </nut-space>
    <nut-toast v-model:visible="show" msg="这是首页" />
    <span :class="styles.redText">这是cssModule测试</span>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import styles from './index.module.scss'
import Taro from '@tarojs/taro'

const show = ref(false)
const onClick = () => {
  show.value = true
}
</script>
