<template>
  <el-switch
    :width="60"
    v-model="item.isPrint"
    on-text="已办"
    off-text="待办"
    on-color="#13ce66"
    off-color="#f7ba2a"
    @change="onChange">
  </el-switch>
</template>

<script>
  'use strict'

  import {
    Switch,
    Message
  } from 'element-ui'
  import { cloneObj } from '@/utils'

  export default {
    name: 'djpSwitch',
    props: ['propitem', 'index'],
    computed: {
      item () {
        return cloneObj(this.propitem)
      }
    },
    methods: {
      onChange (val) {
        if (this.propitem.isPrint !== val) {
          this.$store.dispatch('isPrint', {
            auth: this.$store.state.user.auth,
            value: val,
            index: this.index,
            item: cloneObj(this.item)
          }).then(() => {
            let _m = val ? '已办' : '待办'
            Message.success({
              showClose: true,
              message: `${this.item.sm.flight.flightNum} 次航班登机牌改为 ${_m}`
            })
          }).catch(error => {
            this.item.isPrint = this.propitem.isPrint

            Message.error({
              showClose: true,
              message: (error.response && error.response.data) || '服务器错误'
            })
          })
        }
      }
    },
    components: {
      elSwitch: Switch
    }
  }
</script>
