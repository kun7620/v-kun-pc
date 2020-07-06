<template>
  <d2-container class="page">
    <el-col :span="8">
      <div class="user">
        <div class="user-info">
          <img :src="user.userHeadPortrait" class="userHeader">
          <div class="user-info-cont">
            <div class="userName">{{user.userNickname}}</div>
            <div class="userRole">{{user.roleName}}</div>
          </div>
        </div>
        <ul class="user-last">
          <li>
            <div>上次登录时间：</div>
            <div>{{user.userLastTime}}</div>
          </li>
          <li>
            <div>上次登录地址：</div>
            <div>{{user.userLastLocation}}</div>
          </li>
          <li>
            <div>上次登录IP：</div>
            <div>{{user.userLastIp}}</div>
          </li>
        </ul>
      </div>
      <div class="system">
        <ul>
          <li>
            <div>服务器内存：</div>
            <div>
              <el-progress :text-inside="true" :stroke-width="21" :percentage="systemProperty.size"
                           color="#409EFF"></el-progress>
            </div>
          </li>
          <li>
            <div>JVM内存：</div>
            <div>
              <el-progress :text-inside="true" :stroke-width="21" :percentage="systemProperty.memory"
                           color="#67C23A"></el-progress>
            </div>
          </li>
          <li>
            <div>磁盘使用量：</div>
            <div>
              <el-progress :text-inside="true" :stroke-width="21" :percentage="systemProperty.space"
                           color="#E6A23C"></el-progress>
            </div>
          </li>
          <li>
            <div>用户名：</div>
            <div>{{systemProperty.userName}}</div>
          </li>
          <li>
            <div>本地IP地址：</div>
            <div>{{systemProperty.ip}}</div>
          </li>
          <li>
            <div>Java版本：</div>
            <div>{{systemProperty.javaVersion}}</div>
          </li>
          <li>
            <div>系统名称：</div>
            <div>{{systemProperty.osName}}</div>
          </li>
          <li>
            <div>系统构架：</div>
            <div>{{systemProperty.osArch}}</div>
          </li>
        </ul>
      </div>
    </el-col>
    <el-col :span="16">
      <div class="carousel">
        <el-carousel trigger="click" height="595px">
          <el-carousel-item v-for="item in carousels" :key="item">
            <img :src="item" class="carouselImg">
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-col>
    <el-col :span="24" class="emailCol">
      <el-table
        class="email"
        :data="inboxEmail"
        style="width: 100%">
        <el-table-column
          prop="number"
          label="Number">
        </el-table-column>
        <el-table-column
          prop="sendDate"
          label="收件时间">
        </el-table-column>
        <el-table-column
          prop="subject"
          label="邮件主题">
          <template slot-scope="scope">
            <i class="iconfont " :class="{'iconyouxiang1': scope.row.read,'iconyouxiang-heshang': !scope.row.read}" :style="{color:scope.row.read?'#909399':'#F56C6C'}"></i>
            {{scope.row.subject}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <a href="javascript:void(0);" class="hk-button" @click="viewEmailContnt(scope.row.content)">查看内容</a>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </d2-container>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        // carousels: ["https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g3/M07/0E/0C/ChMlWF7oS_2IGSpxACCEJ-b0kqYAAU0hgJ6AJYAIIQ_536.jpg",
        //   "https://desk-fd.zol-img.com.cn/t_s1920x1080c5/g3/M05/0E/0C/ChMlWF7oS-2IHrg4AA6sI2eREhkAAU0hANldOMADqw7121.jpg",
        // "https://picsum.photos/id/0/5616/3744"],
        carousels: ["https://api.ixiaowai.cn/gqapi/gqapi.php?a=1",
          "https://api.ixiaowai.cn/gqapi/gqapi.php?2",
        "https://api.ixiaowai.cn/gqapi/gqapi.php?3"],
        inboxEmail: [],
        // 系统信息
        systemProperty: {
          // 用户名
          userName: "OnlyDream",
          // 本机ip
          ip: "10.198.75.60",
          // Java的运行环境版本
          javaVersion: "1.8.0_131",
          // 操作系统的名称
          osName: "Windows 10",
          // 操作系统的构架
          osArch: "amd64",
          // 运行总内存
          totalSwapSpaceSize: "21703421952",
          // 可用运行内存
          freePhysicalMemorySize: "4998647808",
          // 内存百分比
          size: 0,
          // 磁盘总量
          totalSpace: "214746263552",
          // 磁盘已使用量
          freeSpace: "36510617600",
          // 磁盘百分比
          space: 0,
          // JVM可以使用的总内存
          totalMemory: "10",
          // JVM可以使用的剩余内存
          freeMemory: "8",
          // JVM百分比
          memory: 0
        },
        // 用户
        user: {
          userNickname: 'v-kun',
          roleName: '超级管理员',
          userHeadPortrait: 'https://img2.yuntouxiang.com/file/20190607/4e9361d3ba750aa06c33dd1c3aad7bad.jpg',
          userLastTime: '2020-07-05 08:48:24',
          userLastLocation: '北京',
          userLastIp: '127.0.0.1'
        }
      }
    }, created() {
      this.getData();
    },
    methods: {
      getData() {
        let that = this;
        that.axios.get('/admin/user/getHomeData')
          .then(r => {
            // ========================= 用户信息 =========================
            that.user.userNickname = r.data.user.userNickname === '' ? r.data.user.userPhone : r.data.user.userNickname;
            that.user.roleName = r.data.user.roleName;
            if (r.data.user.userHeadPortrait !== '') {
              that.user.userHeadPortrait = r.data.user.userHeadPortrait;
            }
            that.user.userLastTime = r.data.user.userLastTime;
            that.user.userLastLocation = r.data.user.userLastLocation;
            that.user.userLastIp = r.data.user.userLastIp;

            // ========================= 系统信息 =========================
            that.systemProperty.userName = r.data.systemProperty.userName;
            that.systemProperty.ip = r.data.systemProperty.ip;
            that.systemProperty.javaVersion = r.data.systemProperty.javaVersion;
            that.systemProperty.osName = r.data.systemProperty.osName;
            that.systemProperty.osArch = r.data.systemProperty.osArch;
            that.systemProperty.totalSwapSpaceSize = r.data.systemProperty.totalSwapSpaceSize;
            that.systemProperty.freePhysicalMemorySize = r.data.systemProperty.freePhysicalMemorySize;
            that.systemProperty.size = r.data.systemProperty.size;
            that.systemProperty.totalSpace = r.data.systemProperty.totalSpace;
            that.systemProperty.freeSpace = r.data.systemProperty.freeSpace;
            that.systemProperty.space = r.data.systemProperty.space;
            that.systemProperty.totalMemory = r.data.systemProperty.totalMemory;
            that.systemProperty.freeMemory = r.data.systemProperty.freeMemory;
            that.systemProperty.memory = r.data.systemProperty.memory;
            this.setPercentage();

            that.inboxEmail = r.data.inboxEmail.list;

          })
      },
      setPercentage() {
        this.systemProperty.size = Math.round(Number(this.systemProperty.freePhysicalMemorySize) / Number(this.systemProperty.totalSwapSpaceSize) * 100);
        this.systemProperty.space = Math.round(Number(this.systemProperty.freeSpace) / Number(this.systemProperty.totalSpace) * 100);
        this.systemProperty.memory = Math.round(Number(this.systemProperty.freeMemory) / Number(this.systemProperty.totalMemory) * 100);
      },
      viewEmailContnt(content){
        this.$alert(content, '邮件内容', {
          confirmButtonText: '确定',
          callback: action => {

          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .el-col {
    padding: 0 10px;

    .user {
      padding: 20px;
      background-color: white;
      border-radius: 5px;

      .user-info {
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
      }

      .userHeader {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }

      .user-info-cont {
        padding-left: 50px;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        font-size: 14px;
        color: #606266;

        .userName {
          font-size: 30px;
          color: #222;
        }
      }

      .user-last {
        div {
          display: inline-block;
          margin-top: 10px;
          color: #606266;

          &:nth-child(1) {
            width: 120px;
          }
        }
      }
    }

    .system {
      padding: 20px;
      background-color: white;
      border-radius: 5px;
      margin-top: 20px;

      ul {
        li {
          margin-top: 14px;
          color: #606266;

          > div {
            display: inline-block;

            &:nth-child(1) {
              width: 120px;
              vertical-align: middle;
            }

            &:nth-child(2) {
              width: 60%;
            }
          }
        }
      }
    }

    .carousel {
      padding: 20px;
      background-color: white;
      border-radius: 5px;
      .carouselImg{
        width: 100%;
        height: 100%;
      }
    }
  }

  .emailCol {
    padding: 20px 10px;

    .email {
      padding: 20px;
    }
  }

</style>
