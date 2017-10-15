<template>
  <div class="table-container">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <td>DL</td>
          <td>Name</td>
          <td>Target</td>
          <td>Size</td>
          <td>Date</td>
          <td>
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
          </td>
          <td>
            <i class="fa fa-arrow-down" aria-hidden="true"></i>
          </td>
        </tr>
      </thead>
      <tbody>
        <torrent-row v-for="torrent in torrents" v-bind="torrent" v-bind:key="torrent.id"></torrent-row>
      </tbody>
    </table>
  </div>
</template>

<script>
import { torrents } from '../api'
import TorrentRow from './TorrentRow'

export default {
  subscriptions: function() {
    return {
      torrents
    }
  },
  components: {
    TorrentRow
  }
}
</script>

<style scoped>
.table-container {
  overflow-x: auto;
}
</style>
