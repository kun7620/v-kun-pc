<template>
  <d2-container>
    <template slot="header">
      <el-button type="primary" @click="openAdd">新增角色</el-button>
    </template>
    <el-table
      :data="roleList"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="roleSort"
        label="排序号">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="roleDescription"
        label="描述">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="openEdit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="isAdd?'新增角色':'编辑角色'"
      :visible.sync="formDialog"
      :before-close="handleClose"
      width="70%">
      <el-form ref="coreRole" :model="coreRole" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="coreRole.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="coreRole.roleDescription"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="coreRole.roleStatus"></el-switch>
        </el-form-item>
        <el-form-item label="菜单">
          <el-tree :data="menuTree" node-key="menuUuid" ref="menuTree" :props="defaultProps" show-checkbox
                   :default-checked-keys="defaultChecked"></el-tree>
        </el-form-item>
        <el-form-item label="权限">
          <el-table
            ref="multipleTable"
            :data="rightList"
            @select="toggleRowSelection"
            @select-all="toggleRowSelection"
            height="250"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="rightModuleName"
              label="所属模块名称"
              :filters="rightModuleNameFilters"
              :filter-method="rightModuleNameFiltersMethod">
            </el-table-column>
            <el-table-column
              prop="rightModuleDescription"
              label="所属模块描述">
            </el-table-column>
            <el-table-column
              prop="rightPath"
              label="请求路径">
            </el-table-column>
            <el-table-column
              prop="rightMethod"
              label="请求类型">
              <template slot-scope="scope">
                <el-button :type="tableMethodClassName(scope)" class="rightMethodButton" plain>
                  {{scope.row.rightMethod}}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="rightOperationid"
              label="处理请求的方法">
            </el-table-column>
            <el-table-column
              prop="rightSummary"
              label="总结">
            </el-table-column>
            <el-table-column
              prop="rightDescription"
              label="描述">
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-button type="primary" @click="isAdd?saveRole():updateRole()">提交</el-button>
      </el-form>
    </el-dialog>
  </d2-container>
</template>

<script>
  export default {
    name: 'role',
    data() {
      return {
        roleList: [],
        // selectRoleList:[],
        formDialog: false,
        isAdd: true,
        coreRole: {
          roleUuid: [],
          roleName: '',
          roleDescription: '',
          roleStatus: true,
          menuUuid: '',
          rightUuid: ''
        },
        menuTree: [],
        defaultProps: {
          children: 'children',
          label: 'menuTitle'
        },
        defaultChecked: [], // 默认选中的节点
        rightList: [],
        rightModuleNameFilters: [],  // 模块筛选
        loading: true
      };
    },
    created() {
      const that = this;
      this.getData(that);
    },
    methods: {
      getData(that) {
        that.defaultChecked = [] // 默认选中的节点
        that.axios.get('/admin/role/selectRoleAndMenuAndRight')
          .then(r => {
            if (r.code === 0) {
              that.roleList = r.data;
              that.loading = false;
            }
          });
        // 查菜单
        that.axios.get('/admin/menu')
          .then(r => {
            if (r.code === 0) {
              let toTreeData = that.hk.toTreeData(r.data, {
                id: 'menuCode', // id字段名
                parendId: 'menuSuperiorCode', // 父级id字段名
                name: 'menuTitle', // 名称的字段名
                rootId: '' // 顶层节点父级id
              });
              that.menuTree = toTreeData;
            }
          })
        // 查权限
        that.axios.get('/admin/right')
          .then(r => {
            that.rightList = r.data;
            // 设置模块名称筛选条件
            let rightModuleNameFilters_1 = {};
            for (let item of r.data) {
              rightModuleNameFilters_1[item.rightModuleName] = '';
            }
            let rightModuleNameFilters_list = Object.keys(rightModuleNameFilters_1);
            for (let ieme of rightModuleNameFilters_list) {
              that.rightModuleNameFilters.push({text: ieme, value: ieme})
            }
          })
      },
      openAdd() {
        // 新增时把值全部清空
        this.coreRole = {
          roleUuid: [],
          roleName: '',
          roleDescription: '',
          roleStatus: true
        };
        this.defaultChecked = [];
        this.isAdd = true;
        // 开打表单
        this.formDialog = true;
      },
      openEdit(item) {
        this.coreRole = {
          roleUuid: item.roleUuid,
          roleName: item.roleName,
          roleDescription: item.roleDescription,
          roleStatus: item.roleStatus === '0' || item.roleStatus === 0,
          rightUuid: item.rightUuid
        };
        let that = this;
        this.defaultChecked = (item.menuUuid == null || item.menuUuid == '') ? [] : item.menuUuid.split(',');
        let parse = JSON.parse(JSON.stringify(this.defaultChecked));
        // 设置树已选择节点时，不能设置父节点，否则父节点下的所有子节点都会被选中
        // 循环删除所有子节点的父节点
        this.defaultChecked.forEach(function (ele, index) {
          // 判断如果id长度大于三位数 说明还有上级
          if (ele.length > 3) {
            let strings = that.hk.fenGeString(ele, 3).split(",");
            // 一层层往上找
            for (let i = 0; i < strings.length - 1; i++) {
              for (let x = 0; x < parse.length; x++) {
                if (parse[x] === strings[i]) {
                  parse.splice(x, 1)
                }
              }
            }
          }
          // that.coreRole.menuUuid+=ele+',';
        });
        this.defaultChecked = (parse != null && parse.length > 0) ? parse : [];

        this.isAdd = false;
        this.formDialog = true;

        // 设置权限选中行
        this.$nextTick(() => {
          for (let row of that.rightList) {
            if (that.coreRole.rightUuid.indexOf(row.rightUuid) !== -1)
              that.$refs.multipleTable.toggleRowSelection(row);
          }
        })
      },
      saveRole() {
        let that = this;
        that.getFormData(that);
        that.axios.post('/admin/role', that.coreRole)
          .then(r => {
            that.formDialog = false;
            if (r.code === 0) {
              that.getData(that);
              that.$message.success("操作成功")
            } else {
              that.$message.error("操作失败：" + r.msg);
            }
          })
      },
      updateRole() {
        let that = this;
        that.getFormData(that);
        that.axios.put('/admin/role', that.coreRole)
          .then(r => {
            that.formDialog = false;
            if (r.code === 0) {
              that.getData(that);
              that.$message.success("操作成功")
            } else {
              that.$message.error("操作失败：" + r.msg);
            }
          })
      },
      getFormData(that) {
        // 设置选中的菜单
        let checkedKeys = that.$refs.menuTree.getCheckedKeys();
        that.coreRole.menuUuid = '';
        checkedKeys.forEach(function (ele, index) {
          // 判断如果id长度大于三位数 说明还有上级，需要把上级带上
          if (ele.length > 3) {
            let strings = that.hk.fenGeString(ele, 3).split(",");
            // 一层层往上找
            for (let i = 0; i < strings.length - 1; i++) {
              // 判断上级是否已经被加入
              if (that.coreRole.menuUuid.indexOf(strings[i] + ',') === -1) {
                // 把上级加入
                that.coreRole.menuUuid += strings[i] + ',';
              }
            }
          }
          that.coreRole.menuUuid += ele + ',';
        });
        that.coreRole.menuUuid = that.coreRole.menuUuid.substring(0, that.coreRole.menuUuid.length - 1);
        // 转换已选中的权限
        // that.roleList = that.selectRoleList.join();
        // 转换启用状态
        that.coreRole.roleStatus = that.coreRole.roleStatus ? 0 : 1;
      },
      handleClose(done) {
        this.$refs.menuTree.setCheckedKeys([]);
        done();
      },
      tableMethodClassName({row, rowIndex}) {
        switch (row.rightMethod) {
          case 'get':
            return 'primary';
          case 'post':
            return 'success';
          case 'put':
            return 'warning';
          case 'delete':
            return 'danger';
          default:
            return '';
        }
      },
      // 模块名称筛选方法
      rightModuleNameFiltersMethod(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      toggleRowSelection(row) {
        let list = [];
        for (let one of row) {
          list.push(one.rightUuid);
        }
        this.coreRole.rightUuid = list.join();
      }
    }
  };
</script>

<style scoped>
  .el-table .rightMethodButton {
    cursor: default;
  }
</style>
