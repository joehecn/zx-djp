<template>
  <div id="djp-table">
    <table class="el-table" v-show="tableData.length">
      <thead>
        <tr>
          <th style="width: 65px;"><div>序号</div></th>
          <th style="width: 200px;"><div>航班</div></th>
          <th style="width: 65px;"><div>人数</div></th>
          <th style="width: 90px;"><div>导出</div></th>
          <th style="width: 90px;"><div>办理</div></th>
          <th><div>备注 <span style="color: #ff4949;">{{ noteEditing }}</span></div></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData">
          <td><div class="cell">{{index + 1}}</div></td>
          <td>
            <div class="cell">
              {{item.sm.flight.flightDate | formartFlight}}
              <span style="color: #1D8CE0">{{item.sm.flight.flightNum}}</span>
            </div>
          </td>
          <td><div class="cell">{{item.sm.smRealNumber}}</div></td>
          <td>
            <djp-download :propitem="item" :index="index"></djp-download>
          </td>
          <td>
            <djp-switch :propitem="item" :index="index"></djp-switch>
          </td>
          <td>
            <djp-note :propitem="item" :index="index"></djp-note>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  'use strict'

  import moment from 'moment'
  import DjpDownload from './DjpDownload.vue'
  import DjpSwitch from './DjpSwitch.vue'
  import DjpNote from './DjpNote.vue'
  import { cloneObj } from '@/utils'

  export default {
    name: 'djpTable',
    computed: {
      tableData () {
        return cloneObj(this.$store.state.list)
      },
      noteEditing () {
        const changedIndex = this.$store.state.changedIndex
        if (changedIndex === -1) {
          return ''
        }
        return `第${changedIndex + 1}行备注已修改，尚未保存!`
      }
    },
    filters: {
      formartFlight (val) {
        return moment(val).format('YYYY-MM-DD')
      }
    },
    mounted () {
      let _self = this
      window.onbeforeunload = e => {
        e = e || window.event

        if (_self.noteEditing) {
          // For IE and Firefox prior to version 4
          if (e) {
            e.returnValue = _self.noteEditing + '确定退出吗?'
          }

          // For Safari
          return _self.noteEditing + '确定退出吗?'
        }
      }
    },
    components: {
      DjpDownload,
      DjpSwitch,
      DjpNote
    }
  }
</script>

<style scoped>
  #djp-table {
    margin-top: 10px;
  }
</style>
