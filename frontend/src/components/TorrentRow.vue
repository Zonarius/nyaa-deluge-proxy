<template>
  <tr class="torrent">
    <td>
      <a @click="add">
        <i :class="iconClass"></i>
      </a>
    </td>
    <td>{{name}}</td>
    <td>{{target}}</td>
    <td>{{size}}</td>
    <td>{{date | moment("YYYY-MM-DD HH:mm")}}</td>
    <td class="seeder">{{seedCount}}</td>
    <td class="leecher">{{leechCount}}</td>
  </tr>
</template>

<script>
import { addTorrent, config } from '../api'

const iconMap = {
  initial: 'fa-download',
  loading: 'fa-cog',
  finished: 'fa-check'
}

const defaultLoc = '/data/finished'
const serien = defaultLoc + '/serien'

export default {
  props: ['id', 'name', 'size', 'date', 'seedCount', 'leechCount'],
  data() {
    return {
      downloadState: 'initial'
    }
  },
  computed: {
    iconClass() {
      return {
        fa: true,
        'fa-fw': true,
        'fa-3x': true,
        [iconMap[this.downloadState]]: true,
        'fa-spin': this.downloadState === 'loading'
      }
    }
  },
  methods: {
    add: async function() {
      if (this.downloadState === 'initial') {
        this.downloadState = 'loading'
        await addTorrent(this.id, this.target)
        this.downloadState = 'finished'
      }
    }
  },
  subscriptions() {
    return {
      target: config.map(config => {
        for (const pattern of config.regex) {
          const matches = this.name.match(new RegExp(pattern))
          if (matches) {
            const info = {
              name: matches[1],
              season: matches[2]
            }
            if (info.season) {
              return `${serien}/${info.name.trim()}/Season ${info.season.trim()}`
            } else {
              return serien + '/' + info.name.trim()
            }
          }
        }
        return defaultLoc
      })
    }
  }
}
</script>

<style>
.seeder {
  color: green;
}

.leecher {
  color: red;
}

.torrent td {
  vertical-align: middle;
}
</style>
