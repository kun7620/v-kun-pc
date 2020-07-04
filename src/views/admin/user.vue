<template>
  <d2-container id="userList">
    <template slot="header">
      <el-button type="primary" @click="toForm(1)">新增</el-button>
    </template>

    <el-table
      ref="progressTwo"
      :data="userList"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="userPhone"
        label="手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userCdate"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userNickname"
        label="昵称"
        width="180">
      </el-table-column>
      <el-table-column
        label="头像">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            trigger="hover">
            <img :src="scope.row.userHeadPortrait" v-if="scope.row.userHeadPortrait" alt=""
                 style="width: 150px;height: 150px;border-radius: 100px">
            <img slot="reference" :src="scope.row.userHeadPortrait" v-if="scope.row.userHeadPortrait" alt=""
                 style="width: 50px;height: 50px;border-radius: 100px;cursor: pointer">
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="角色">
        <template slot-scope="scope">
          <el-tag v-for="it in scope.row.roleName" size="mini" style="margin:2px">{{it}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="userSort"
        label="排序号">
        <template slot-scope="scope">
          <el-input class="updateSort" v-model="scope.row.userSort" @change="updateSort(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <i class="iconfont iconedit1 iconButton" style="color:#409EFF" @click="handleEdit(scope.$index, scope.row)"></i>
          <i class="iconfont icondelete iconButton" @click="handleDelete(scope.$index, scope.row)"></i>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="用户"
      :visible.sync="formDialogVisible"
      width="30%"
      :show-close="true"
      :close-on-press-escape="false"
      :close-on-click-modal="false">
      <el-form :model="coreUser" :rules="rules" ref="coreUser" label-width="100px" class="demo-ruleForm">

        <el-form-item label="头像" prop="userHeadPortrait">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            with-credentials="true">
            <img v-if="coreUser.userHeadPortrait" :src="coreUser.userHeadPortrait" class="userHeadPortrait">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!--                    <input type="file" id="userHeadFile" style="display: none" @change="uploadHeadFile(this)">-->
          <!--                    <img :src="(coreUser.userHeadPortrait==''||coreUser.userHeadPortrait==null)?ossHost+'/admin/userHead/default_2.gif':ossHost+coreUser.userHeadPortrait" alt="" id="userHeadImg" @click="selectImg">-->
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone">
          <el-input v-model="coreUser.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input v-model="coreUser.userPassword"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="userNickname">
          <el-input v-model="coreUser.userNickname"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleUuid">
          <el-select
            v-model="coreUser.roleUuid"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请选择角色">
            <el-option
              v-for="item in roles"
              :key="item.roleUuid"
              :label="item.roleName"
              :value="item.roleUuid">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="margin:auto;display:block;" @click="submitForm('coreUser')">保存</el-button>
    </el-dialog>
  </d2-container>
</template>

<script>
  export default {
    // inject: ['reload'],
    name: 'user',
    data: function () {
      return {
        userList: [],
        formDialogVisible: false,
        uploadUrl: window.hkConfig.uploadFile,
        coreUser: {
          userUuid: '',
          userSort: '',
          userCdate: '',
          userUdate: '',
          userStatus: '',
          userPhone: '',
          userPassword: '',
          userNickname: '',
          userHeadPortrait: '',
          roleUuid: [],
          roleName: []
        },
        rules: {
          userPhone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur'}
          ]
        },
        roles: [],
        isInsert: false, // 判断是新增还是修改 true 新增
        loading: true
        // ,ossHost:ossHost
      }
    },
    created: function () {
      const that = this
      // 查询用户
      this.axios.get('/admin/user/userAndRole?userStatus=0')
        .then(r => {
          for (let i = 0; i < r.data.length; i++) {
            r.data[i].roleUuid = r.data[i].roleUuid ? r.data[i].roleUuid.split(',') : []
            r.data[i].roleName = r.data[i].roleName ? r.data[i].roleName.split(',') : []
          }
          that.userList = r.data;
          that.loading = false;
        });
      // 查询角色
      that.axios.get('/admin/role')
        .then(r => {
          if (r.code === 0) {
            that.roles = r.data
          } else {
            that.$message.error('获取角色信息失败')
          }
        })
    },
    methods: {
      toForm: function (r) {
        const that = this
        this.formDialogVisible = true
        setTimeout(function () {
          that.$refs.coreUser.resetFields()
        }, 100)
        that.isInsert = true
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const that = this
            // 判断是新增还是修改
            if (that.isInsert) {
              this.axios.post('/admin/user', {
                userPhone: that.coreUser.userPhone,
                userPassword: that.coreUser.userPassword,
                userNickname: that.coreUser.userNickname,
                userHeadPortrait: that.coreUser.userHeadPortrait,
                userStatus: '0',
                roleUuid: JSON.parse(JSON.stringify(that.coreUser.roleUuid)).toString()
              }).then(r => {
                that.formDialogVisible = false
                if (r.code === 0) {
                  that.$message.success('操作成功')
                } else {
                  that.$alert(r.msg, '操作失败', {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                  })
                }
              })
            } else {
              that.coreUser.roleUuid = that.coreUser.roleUuid.join(',')
              // that.coreUser.roleName = that.coreUser.roleName.join(',');
              // 更新数据
              // that.roleUuid =  that.coreUser.roleUuid.toString();
              console.log(that)
              this.axios.put('/admin/user', that.coreUser)
                .then(r => {
                  that.formDialogVisible = false
                  if (r.code === 0) {
                    that.$message.success('操作成功')
                    // that.reload(this.$route.fullPath)

                  } else {
                    that.$alert(r.msg, '操作失败', {
                      confirmButtonText: '确定',
                      callback: action => {
                      }
                    })
                  }
                })
            }
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleEdit(index, row) {
        this.formDialogVisible = true
        // this.coreUser = row;
        this.coreUser.userUuid = row.userUuid
        this.coreUser.userPhone = row.userPhone
        this.coreUser.userPassword = row.userPassword
        this.coreUser.userNickname = row.userNickname
        this.coreUser.userHeadPortrait = row.userHeadPortrait
        this.coreUser.roleUuid = row.roleUuid
        this.isInsert = false // 修改
      },
      handleDelete(index, row) {
        const that = this
        this.$confirm('此操作将删除数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.put('/admin/user', {
            userUuid: row.userUuid,
            userStatus: '2'
          }).then(r => {
            if (r.code === 0) {
              that.$message.success('操作成功')
              // reloadCurrentModule();
            } else {
              that.$alert(r.msg, '操作失败', {
                confirmButtonText: '确定',
                callback: action => {
                }
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleAvatarSuccess(res, file) {
        // console.log(res)
        // console.log(file)
        // this.imageUrl = URL.createObjectURL(file.raw);
        this.coreUser.userHeadPortrait = res.url;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      updateSort(row) {
        let that = this;
        that.axios.put('/admin/user',{
          userUuid:row.userUuid,
          userSort:row.userSort
        }).then(r=>{
          that.$message.success('更新排序号成功');
        })
      }
    }
  }
</script>

<style scoped>
  .userHeadPortrait {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
</style>
