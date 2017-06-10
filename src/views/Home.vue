<template>
  <div id="home">
    <djp-nav></djp-nav>
    <djp-table></djp-table>
  </div>
</template>

<script>
  'use strict'

  import DjpNav from '@/components/DjpNav'
  import DjpTable from '@/components/DjpTable'

  export default {
    name: 'home',
    components: {
      DjpNav,
      DjpTable
    }
  }
</script>
