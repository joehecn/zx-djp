<template>
  <el-row v-show="!$store.state.showUser">
    <el-col :span="12">
      <el-date-picker
        v-model="searchDate"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-button type="primary" @click.native.prevent="onSubmit">查询</el-button>
    </el-col>
    <el-col :span="12"
      style="text-align: right;">
      <span>Hi, {{$store.state.user.name}}</span>
      <el-button type="text" @click.native.prevent="onLogout">安全退出</el-button>
    </el-col>
  </el-row>
</template>

<script>
  'use strict'

  import {
    Row,
    Col,
    Form,
    FormItem,
    DatePicker,
    Button,
    Message
  } from 'element-ui'

  import { DEFAULT_USER } from '@/store'

  export default {
    name: 'djpNav',
    data () {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '明天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '清空',
            onClick (picker) {
              picker.$emit('pick', '')
            }
          }]
        },
        searchDate: ''
      }
    },
    methods: {
      onSubmit () {
        if (this.searchDate) {
          this.$store.dispatch('getList', {
            auth: this.$store.state.user.auth,
            searchDate: this.searchDate
          }).catch(error => {
            Message.error({
              showClose: true,
              message: (error.response && error.response.data) || '服务器错误'
            })
          })
        }
      },
      onLogout () {
        this.$store.dispatch('setUser', DEFAULT_USER)
        this.$store.dispatch('setList', [])
        this.$router.replace({
          name: 'Login',
          query: { redirect: this.$route.fullPath }
        })
      }
    },
    components: {
      elRow: Row,
      elCol: Col,
      elForm: Form,
      elFormItem: FormItem,
      elDatePicker: DatePicker,
      elButton: Button
    }
  }
</script>
