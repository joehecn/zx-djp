<template>
  <el-input
    v-model="item.djpNote"
    placeholder="备注"
    @change="onChange"
    @blur="onBlur">
  </el-input>
</template>

<script>
  'use strict'

  import {
    Input,
    Message
  } from 'element-ui'
  import { cloneObj } from '@/utils'

  export default {
    name: 'djpNote',
    props: ['propitem', 'index'],
    computed: {
      item () {
        return cloneObj(this.propitem)
      }
    },
    methods: {
      onChange (val) {
        if (this.propitem.djpNote !== val) {
          this.$store.dispatch('setChangedIndex', this.index)
        } else {
          this.$store.dispatch('setChangedIndex', -1)
        }
      },
      onBlur (e) {
        this.$store.dispatch('setChangedIndex', -1)

        const val = e.target.value
        if (this.propitem.djpNote !== val) {
          this.$store.dispatch('djpNote', {
            auth: this.$store.state.user.auth,
            value: val,
            index: this.index,
            item: cloneObj(this.item)
          }).then(() => {
            Message.success({
              showClose: true,
              message: `${this.item.sm.flight.flightNum} 次航班 修改备注成功`
            })
          }).catch(error => {
            this.item.djpNote = this.propitem.djpNote

            Message.error({
              showClose: true,
              message: (error.response && error.response.data) || '服务器错误'
            })
          })
        }
      }
    },
    components: {
      elInput: Input
    }
  }
</script>
