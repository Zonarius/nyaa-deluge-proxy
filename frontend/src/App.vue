<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Nyaa.si
      </h1>
      <tabs>
        <tab-pane label="Download">
          <search-bar></search-bar>
          <torrent-table></torrent-table>
        </tab-pane>
        <tab-pane label="Config">
          <config></config>
        </tab-pane>
      </tabs>
    </div>
  </section>
</template>

<script>
import SearchBar from './components/SearchBar'
import TorrentTable from './components/TorrentTable'
import Tabs from './components/Tabs'
import TabPane from './components/TabPane'
import Config from './components/Config'
import * as api from './api'

export default {
  name: 'app',
  created() {
    api.loadConfig()
  },
  components: {
    SearchBar,
    TorrentTable,
    Tabs,
    TabPane,
    Config
  }
}
</script>

<style>
@import '~bulma/css/bulma.css';
@import '~font-awesome/css/font-awesome.css';
</style>
