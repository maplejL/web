<template>
  <div id="pl-body">
    <el-divider content-position="left">评论区</el-divider>
    <div id="main">
      <table>
        <tr v-for="(pl,index) in pls" :key="index">
          <td width="100px" height="50px">
            <img src="/static/user.jpg" id="user-icon" />
          </td>
          <td width="100px" height="50px">
            {{ pl.uname }}:
          </td>
          <td width="300px" height="50px">
            {{pl.pl}}
          </td>
          <td height="50px" width="100px">
            {{ pl.date }}
          </td>
          <td v-if="username === pl.uname">
            <el-button type="danger" icon="el-icon-delete" @click="deletePl(pl)" circle></el-button>
          </td>
        </tr>
      </table>
      <br>
      <input type="text" placeholder="请输入评论" id="pl" v-model="content" />
      <el-button class="primary" @click="addPl">发表</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['username'],
  data () {
    return {
      pls: [],
      content: ''
    }
  },
  methods: {
    deletePl (pl) {
      this.$axios.post('/api/pl/delete', {
        query: {
          plnumber: pl.plnumber
        }
      }).then((res) => {
        this.pls.splice(this.pls.indexOf(pl), 1)
      })
    },
    editPl (pl) {
      this.$axios.post('/api/pl/edit', {
        query: {
          plnumber: pl.plnumber
        }
      }).then((res) => {
        this.getAllPl()
      })
    },
    getAllPl () {
      this.pls = []
      this.$axios.get('/api/pl/getPl', {}).then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          this.pls.push({
            uname: res.data[i].uname,
            pl: res.data[i].content,
            date: res.data[i].date,
            plnumber: res.data[i].plnumber
          })
        }
      })
    },
    addPl () {
      if (this.username != null) {
        this.$axios
          .post('/api/pl/add', {
            query: {
              username: this.username,
              content: this.content,
              date: '2020-12-24'
            }
          })
          .then((res) => {
            this.pls.push({
              uname: this.username,
              pl: this.content,
              date: '2020-12-25',
              plnumber: this.pls.length + 1
            })
            this.content = ''
          })
      } else {
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getAllPl()
  }
}
</script>

<style scoped>

#main {
  width: 980px;
  margin: auto;
}
#pl {
  height: 35px;
  border-radius: 9px;
}
#user-icon {
  width: 30px;
  height: 30px;
}
</style>
