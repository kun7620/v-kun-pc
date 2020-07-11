<template>
  <container id="menu_" class="menu_manage">
    <template slot="header">
      <el-button type="primary" @click="append">添加根节点</el-button>
      <el-button type="primary" @click="showTree=!showTree">切换显示</el-button>
    </template>
    <el-tree
      v-if="showTree"
      :props="defaultProps"
      :data="data"
      show-checkbox
      node-key="menuCode"
      default-expand-all
      draggable
      @node-drag-end="handleDragEnd"
      :expand-on-click-node="false">
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                      <i class="treeListIcon" :class="data.menuIco"></i>
                    <span>{{ node.label }}</span>
                    <span class="treeBut">
                      <i class="el-icon-edit" style="color:#409EFF" @click="() => edit( data)" title="编辑"></i>
                      <i class="el-icon-plus" style="color:#67C23A" @click="() => append( data)" title="添加子菜单"></i>
                      <i class="el-icon-minus" style="color:#F56C6C" @click="() => remove(data)" title="删除"></i>
                    </span>
                  </span>
    </el-tree>
    <el-table
      v-if="!showTree"
      :data="data"
      style="width: 100%;margin-bottom: 20px;"
      row-key="menuUuid"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="menuTitle"
        label="菜单标题"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="menuCode"
        label="代码"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="menuPath"
        label="路径">
      </el-table-column>
      <el-table-column
        prop="menuIco"
        label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.menuIco"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="menuSort"
        label="排序号">
        <template slot-scope="scope">
          <el-input class="updateSort" v-model="scope.row.menuSort" @change="updateSort(scope.row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <i class="iconfont iconedit1 iconButton" @click="() => edit( scope.row)" title="编辑"></i>
          <i class="iconfont iconadd iconButton" @click="() => append( scope.row)" title="添加子菜单"></i>
          <i class="iconfont icondelete iconButton" @click="() => remove(scope.row)" title="删除"></i>
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
      <el-form :model="menuForm" :rules="rules" ref="menuForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="menuTitle">
          <el-input v-model="menuForm.menuTitle"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="menuPath">
          <el-input v-model="menuForm.menuPath"></el-input>
        </el-form-item>
        <el-form-item label="排序号" prop="menuSort">
          <el-input v-model="menuForm.menuSort"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="menuIco">
          <!--                    <el-input v-model="menuForm.menuIco" @click.native="showIcons()" v-popover:menuIco></el-input>-->
          <el-popover
            placement="bottom"
            width="440"
            v-model="visibleIcon"
            visible-arrow="true"
            popper-class="selectIconFontPopover"
            trigger="hover">
            <iconfont @setIconFontClassName="setClass" class="popoverIcon"></iconfont>
            <el-button slot="reference" @click="visibleIcon = !visibleIcon">选择图标</el-button>
          </el-popover>
          <i :class="menuForm.menuIco"></i>
        </el-form-item>
        <el-form-item label="打开方式" prop="menuOpenWay">
          <el-select v-model="menuForm.menuOpenWay" placeholder="请选择打开方式">
            <el-option label="框架内" value="1"></el-option>
            <el-option label="新标签页" value="2"></el-option>
            <el-option label="新窗口" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="save" style="display: block;margin: 0 auto">保存</el-button>
    </el-dialog>

  </container>
</template>

<script>
import iconfont from './iconfont';

export default {
    name: 'menu_',
    data: function () {
        return {
            data: null,
            defaultProps: {
                children: 'children',
                label: 'menuTitle'
            },
            formDialogVisible: false,
            iconVisible: false,
            isSV: '0', // 0新增操作，1修改操作
            menuForm: {
                menuTitle: '',
                menuPath: '',
                menuIco: '',
                menuOpenWay: '1',
                menuSort: 0
            },
            rules: {
                menuTitle: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' },
                    { min: 2, max: 200, message: '长度在 2 到 6 个字符', trigger: 'blur' }
                ]
            },
            visibleIcon: false,
            showTree: false
        };
    },
    created: function () {
        this.getMenulist(this);
    },
    methods: {
        setClass (name) {
            this.menuForm.menuIco = 'iconfont ' + name;
            this.visibleIcon = false;
        },
        edit (data) {
            this.menuForm.menuTitle = data.menuTitle;
            this.menuForm.menuPath = data.menuPath;
            this.menuForm.menuIco = data.menuIco;
            this.menuForm.menuOpenWay = data.menuOpenWay;
            this.menuForm.menuSuperiorCode = data.menuCode;
            this.menuForm.menuUuid = data.menuUuid;
            this.menuForm.menuSort = data.menuSort;
            this.formDialogVisible = true;
            this.isSV = '1';
        },
        append (data) {
            const that = this;
            that.formDialogVisible = true;
            this.menuForm.menuTitle = '';
            this.menuForm.menuPath = '';
            this.menuForm.menuIco = '';
            this.menuForm.menuOpenWay = '';
            this.menuForm.menuSuperiorCode = data == null ? '' : data.menuCode;
            this.menuForm.menuUuid = '';
            that.isSV = '0';
        },

        remove (data) {
            const that = this;
            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.axios.delete('/admin/menu?menuCode=' + data.menuCode, { menuCode: data.menuCode })
                    .then(r => {
                        if (r.code === 0) {
                            that.getMenulist(that);
                            that.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                        } else {
                            that.$alert(r.msg, '操作失败', {
                                confirmButtonText: '确定',
                                callback: action => {
                                }
                            });
                        }
                    });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        save () {
            const that = this;
            const da = {
                menuTitle: that.menuForm.menuTitle,
                menuPath: that.menuForm.menuPath,
                menuIco: that.menuForm.menuIco,
                menuOpenWay: that.menuForm.menuOpenWay
            };
            if (that.isSV === '1') { // 如果是修改操作需要带上uuid
                da.menuUuid = that.menuForm.menuUuid;
                this.axios.put('/admin/menu', da)
                    .then(r => {
                        if (r.code === 0) {
                            that.getMenulist(that);
                            that.formDialogVisible = false;
                            that.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                        } else {
                            that.$alert(r.msg, '操作失败', {
                                confirmButtonText: '确定',
                                callback: action => {
                                }
                            });
                        }
                    });
            } else if (that.isSV === '0') { // 如果是新增操作需要带上上级coed
                da.menuSuperiorCode = that.menuForm.menuSuperiorCode;
                this.axios.post('/admin/menu', da)
                    .then(r => {
                        if (r.code === 0) {
                            that.getMenulist(that);
                            that.formDialogVisible = false;
                            that.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                        } else {
                            that.$alert(r.msg, '操作失败', {
                                confirmButtonText: '确定',
                                callback: action => {
                                }
                            });
                        }
                    });
            }
        },
        showIcons () {
            const that = this;
            that.iconVisible = true;
            const l = document.getElementsByClassName('menu-popover-icon-list')[0].getElementsByTagName('li');
            for (let i = 0; i < l.length; i++) {
                l[i].onclick = function (r) {
                    that.menuForm.menuIco = r.target.className;
                    that.iconVisible = false;
                };
            }
        },
        handleDragEnd (draggingNode, dropNode, dropType, ev) {
            const that = this;
            this.axios.post('/admin/menu/moveNode', {
                draggingNodeCode: draggingNode.data.menuCode,
                draggingNodeSuperiorCode: draggingNode.data.menuSuperiorCode,
                draggingNodeCreate: draggingNode.data.menuCreate,
                draggingNodeSort: draggingNode.data.menuSort,
                dropNodeCode: dropNode.data.menuCode,
                dropNodeSuperiorCode: dropNode.data.menuSuperiorCode,
                dropNodeCreate: dropNode.data.menuCreate,
                dropNodeSort: dropNode.data.menuSort,
                dropType: dropType
            }).then(r => {
                if (r.code === 0) {
                    that.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    that.getMenulist(that);
                } else {
                    that.$alert(r.msg, '操作失败', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                }
            });
        },
        getMenulist: function () {
            const that = this;
            this.axios.get('/admin/menu')
                .then(r => {
                    if (r.code === 0) {
                        that.data = JSON.parse(JSON.stringify(this.formattingMenuTree(r.data)));
                    } else {
                        that.$alert(r.msg, '获取列表失败', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        });
                    }
                });
        },
        formattingMenuTree: function (list) {
            for (let i = list.length - 1; i >= 0; i--) {
                for (let x = 0; x < list.length; x++) {
                    if (list[x].menuCode === list[i].menuSuperiorCode) {
                        if (list[x].children == null) {
                            list[x].children = [list[i]];
                        } else {
                            list[x].children.unshift(list[i]);
                        }
                        break;
                    }
                }
            }
            const l = [];
            for (let i = 0; i < list.length; i++) {
                if (list[i].menuSuperiorCode == null || list[i].menuSuperiorCode === '') {
                    l.push(list[i]);
                }
            }
            return l;
        },
        updateSort (row) {
            const that = this;
            that.axios.put('/admin/menu', {
                menuUuid: row.menuUuid,
                menuSort: row.menuSort
            }).then(r => {
                that.$message.success('更新排序号成功');
            });
        }
    },
    components: {
        iconfont
    }
};
</script>

<style scoped>
  .el-form .iconfont {
    color: #909399;
    font-size: 30px;
    vertical-align: middle;
    margin-left: 10px;
    position: absolute;
  }

  .treeListIcon {
    color: #606266;
    margin-right: 5px;
  }

  .treeBut {
    display: none;
  }

  .el-tree >>> .el-tree-node__content:hover .treeBut {
    display: inline;
  }

  .treeBut i {
    margin-left: 5px;
  }

  .el-tree {
    margin-top: 10px;
  }
</style>
