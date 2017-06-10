<template>
  <div id="login">
    <el-row>
      <el-col :span="8" :offset="8">
        <h4>请登录: 阳光登机牌客户端</h4>
      </el-col>
      <el-col :span="8" :offset="8">
        <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          label-width="100px">

          <el-form-item label="城市" prop="dbName">
            <el-select v-model="loginForm.dbName" placeholder="请选择城市">
              <el-option v-for="(value, key) in citydb" :label="key" :value="value" :key="key"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="用户" prop="name">
            <el-input v-model="loginForm.name" placeholder="请输入用户名"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" native-type="submit" @click.native.prevent="submitForm">提交</el-button>
            <el-button @click.native.prevent="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  'use strict'

  import {
    Row,
    Col,
    Form,
    FormItem,
    Select,
    Option,
    Input,
    Button,
    Message
  } from 'element-ui'

  export default {
    name: 'login',
    components: {
      elRow: Row,
      elCol: Col,
      elForm: Form,
      elFormItem: FormItem,
      elSelect: Select,
      elOption: Option,
      elInput: Input,
      elButton: Button
    },
    data () {
      const chinese = val => {
        return /^[\u4E00-\uFA29]*$/.test(val)
      }

      const checkName = (rule, value, callback) => {
        if (value.length < 2) {
          callback(new Error('用户 - 太短！'))
        } else if (!chinese(value)) {
          callback(new Error('用户 - 必须为中文！'))
        } else if (value.length > 4) {
          callback(new Error('用户 - 太长！'))
        } else {
          callback()
        }
      }

      const checkPass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码 - 太短！'))
        } else if (value.length > 20) {
          callback(new Error('密码 - 太长！'))
        } else {
          callback()
        }
      }

      return {
        loginForm: {
          dbName: '',
          name: '',
          password: ''
        },
        loginRules: {
          dbName: [
            { required: true, message: '请选择城市', trigger: 'change' }
          ],
          name: [
            { required: true, message: '用户名不能为空！', trigger: 'blur' },
            { validator: checkName }
          ],
          password: [
            { required: true, message: '请输入密码！', trigger: 'blur' },
            { validator: checkPass }
          ]
        }
      }
    },
    computed: {
      citydb () {
        return this.$store.state.citydb
      }
    },
    beforeCreate () {
      if (Object.keys(this.$store.state.citydb).length === 0) {
        this.$store.dispatch('citydb').catch(() => {
          // let msg
          // if (error.response && error.response.data) {
          //   msg = this.$store.state.err[error.response.data]
          // }

          Message.error({
            showClose: true,
            message: '服务器错误'
          })
        })
      }
    },
    methods: {
      submitForm () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            const userObj = {
              dbName: this.loginForm.dbName,
              name: this.loginForm.name,
              password: this.loginForm.password
            }

            this.$store.dispatch('login', userObj).then(() => {
              this.$router.replace(this.$route.query.redirect || '/')
            }).catch(error => {
              Message.error({
                showClose: true,
                message: (error.response && error.response.data) || '服务器错误'
              })
            })
          }
        })
      },
      resetForm () {
        this.$refs.loginForm.resetFields()
      }
    }
  }
</script>

<style scoped>
  #login {
    margin-top: 60px;
  }
</style>
