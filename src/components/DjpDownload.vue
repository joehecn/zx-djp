<template>
  <el-button @click.native="downloadDjp"
    :type="item.isDownload ? '' : 'primary'">
    {{item.isDownload ? '已导出' : '未导出'}}</el-button>
</template>

<script>
  'use strict'

  import {
    Button,
    Message
  } from 'element-ui'
  import { isDownload } from '@/api'
  import Docxtemplater from 'docxtemplater'
  import JSZip from 'jszip'
  import { saveAs } from 'filesaver.js'
  import { cloneObj } from '@/utils'

  const loadFile = (fileName, callback) => {
    window.JSZipUtils.getBinaryContent('static/docx/' + fileName, callback)
  }

  export default {
    name: 'djpDownload',
    props: ['propitem', 'index'],
    computed: {
      item () {
        return cloneObj(this.propitem)
      }
    },
    methods: {
      downloadDjp () {
        isDownload(this.item._id, this.$store.state.user.auth, this.item.isDownload).then(response => {
          loadFile('djpTable.docx', (err, content) => {
            if (err) { throw err }

            let setData = response.data
            let zip = new JSZip(content)
            let docx = new Docxtemplater().loadZip(zip)
            docx.setData(setData)
            docx.render()

            let out = docx.getZip().generate({ type: 'blob' })

            let title = '阳光服务' + setData.smDate + setData.teamType +
              setData.smFlight + '航班' + setData.smRealNumber + '人.docx'

            saveAs(out, title)

            if (!this.item.isDownload) {
              this.item.isDownload = true
              this.$store.dispatch('setItem', { index: this.index, item: this.item })
            }
          })
        }).catch(error => {
          Message.error({
            showClose: true,
            message: (error.response && error.response.data) || '服务器错误'
          })
        })
      }
    },
    components: {
      elButton: Button
    }
  }
</script>
