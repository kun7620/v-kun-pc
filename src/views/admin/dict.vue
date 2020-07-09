<template>
    <div id="dict" class="dict_manage">
        <el-tree
                :props="defaultProps"
                :data="data"
                show-checkbox
                node-key="dictCode"
                default-expand-all
                draggable
                @node-drag-end="handleDragEnd"
                :expand-on-click-node="false">
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span class="treeBut">
                      <i class="el-icon-edit" style="color:#409EFF" @click="() => edit( data)"></i>
                      <i class="el-icon-plus" style="color:#67C23A" @click="() => append( data)"></i>
                      <i class="el-icon-minus" style="color:#F56C6C" @click="() => remove(node, data)"></i>
                    </span>
                  </span>
        </el-tree>


        <el-dialog
                title="用户"
                :visible.sync="formDialogVisible"
                width="30%"
                :show-close="true"
                :close-on-press-escape="false"
                :close-on-click-modal="false">
            <el-form :model="dictForm" :rules="rules" ref="dictForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="字典代码" prop="dictCode" v-if="dictForm.dictCode!=null && dictForm.dictCode!==''">
                    <el-input v-model="dictForm.dictCode"></el-input>
                </el-form-item>
                <el-form-item label="字典名称" prop="dictTitle">
                    <el-input v-model="dictForm.dictTitle"></el-input>
                </el-form-item>
                <el-form-item label="字典值" prop="dictValue">
                    <el-input v-model="dictForm.dictValue"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="dictExplain">
                    <el-input v-model="dictForm.dictExplain"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="save" style="display: block;margin: 0 auto">保存</el-button>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'dict',
        data: function () {
            return {
                data: null
                ,defaultProps: {
                    children: 'children',
                    label: 'dictTitle'
                }
                ,formDialogVisible: false
                ,iconVisible : false
                ,isSV: '0' // 0新增操作，1修改操作
                ,dictForm:{
                    dictTitle:''
                    ,dictValue:''
                    ,dictExplain:''
                    ,dictCode:''
                }
                ,rules: {
                    dictTitle: [
                        {required: true, message: '请输入字典名称', trigger: 'blur'},
                        {min: 2, max: 200, message: '长度在 2 到 6 个字符', trigger: 'blur'}
                    ]
                }
            }
        }
        , created: function () {
            this.getDictlist(this);
        }
        ,methods: {
            edit(data) {
                this.dictForm.dictTitle = data.dictTitle;
                this.dictForm.dictValue = data.dictValue;
                this.dictForm.dictExplain = data.dictExplain;
                this.dictForm.dictSuperiorCode = data.dictCode;
                this.dictForm.dictUuid = data.dictUuid;
                this.dictForm.dictCode = data.dictCode;
                this.formDialogVisible = true;
                this.isSV = '1';
            },
            append(data) {
                let that = this;
                that.formDialogVisible = true;
                this.dictForm.dictTitle = '';
                this.dictForm.dictValue = '';
                this.dictForm.dictExplain = '';
                this.dictForm.dictSuperiorCode = data.dictCode;
                this.dictForm.dictUuid = '';
                this.dictForm.dictCode = '';
                that.isSV = '0';
            },

            remove(node, data) {
                let that = this;
              this.$confirm('此操作将删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                that.axios.delete('/admin/dict?dictCode=' + data.dictCode)
                  .then(r => {
                    if (r.code === 0) {
                      that.getDictlist(that);
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
                  })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                })
              })
                // hk.ajax({
                //     url: hostBase + '/admin/dict'
                //     , method: 'POST'
                //     , data: {
                //         'dictCode': data.dictCode
                //         , '_method': 'DELETE'
                //     }
                //     , success: function(r) {
                //         if (r.code === 0) {
                //             that.getDictlist(that);
                //             that.$message({
                //                 message: '操作成功',
                //                 type: 'success'
                //             });
                //         } else {
                //             that.$alert(r.msg, '操作失败', {
                //                 confirmButtonText: '确定',
                //                 callback: action => {
                //                 }
                //             });
                //         }
                //     }
                // })
            },
            save() {
                let that = this;
                let da = {
                    'dictTitle': that.dictForm.dictTitle
                    , 'dictValue': that.dictForm.dictValue
                    , 'dictExplain': that.dictForm.dictExplain
                };
                if (that.isSV === '1') { // 如果是修改操作需要带上uuid
                    da['dictUuid'] = that.dictForm.dictUuid;
                    that.axios.put('/admin/dict',da)
                        .then(r=>{
                            if (r.code === 0) {
                                that.getDictlist(that)
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
                        })
                } else if (that.isSV === '0') { // 如果是新增操作需要带上上级coed
                    da['dictSuperiorCode'] = that.dictForm.dictSuperiorCode
                    that.axios.post('/admin/dict',da)
                        .then(r=>{
                            if (r.code === 0) {
                                that.getDictlist(that)
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
                        })
                }

                // that.axios.post({
                //     url: hostBase + '/admin/dict'
                //     , method: 'POST'
                //     , data: da
                //     , success: function(r) {
                //         if (r.code === 0) {
                //             that.getDictlist(that)
                //             that.formDialogVisible = false;
                //             that.$message({
                //                 message: '操作成功',
                //                 type: 'success'
                //             });
                //         } else {
                //             that.$alert(r.msg, '操作失败', {
                //                 confirmButtonText: '确定',
                //                 callback: action => {
                //                 }
                //             });
                //         }
                //     }
                // })
            }
            , handleDragEnd(draggingNode, dropNode, dropType, ev) {
                let that = this;
                that.axios.post( '/admin/dict/moveNode',{
                    draggingNodeCode: draggingNode.data.dictCode
                    , draggingNodeSuperiorCode: draggingNode.data.dictSuperiorCode
                    , draggingNodeCreate: draggingNode.data.dictCreate
                    , draggingNodeSort: draggingNode.data.dictSort
                    , dropNodeCode: dropNode.data.dictCode
                    , dropNodeSuperiorCode: dropNode.data.dictSuperiorCode
                    , dropNodeCreate: dropNode.data.dictCreate
                    , dropNodeSort: dropNode.data.dictSort
                    , dropType: dropType
                }).then(r=>{
                    if(r.code === 0) {
                        that.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        that.getDictlist(that);
                    }else{
                        that.$alert(r.msg, '操作失败', {
                            confirmButtonText: '确定',
                            callback: action => {
                            }
                        });
                    }
                })
                // hk.ajax({
                //     url: hostBase + '/admin/dict/moveNode'
                //     , method: 'POST'
                //     , data: {
                //         draggingNodeCode: draggingNode.data.dictCode
                //         , draggingNodeSuperiorCode: draggingNode.data.dictSuperiorCode
                //         , draggingNodeCreate: draggingNode.data.dictCreate
                //         , draggingNodeSort: draggingNode.data.dictSort
                //         , dropNodeCode: dropNode.data.dictCode
                //         , dropNodeSuperiorCode: dropNode.data.dictSuperiorCode
                //         , dropNodeCreate: dropNode.data.dictCreate
                //         , dropNodeSort: dropNode.data.dictSort
                //         , dropType: dropType
                //     }
                //     , success: function(r) {
                //         if (r.code === 0) {
                //             that.$message({
                //                 message: '操作成功',
                //                 type: 'success'
                //             });
                //             that.getDictlist(that);
                //         } else {
                //             that.$alert(r.msg, '操作失败', {
                //                 confirmButtonText: '确定',
                //                 callback: action => {
                //                 }
                //             });
                //         }
                //     }
                // })
            },
            getDictlist:function (that) {
                that.axios.get('/admin/dict?dictStatus=0')
                    .then(r=>{
                        that.data = JSON.parse(JSON.stringify(that.formattingDictTree(r.data)));
                    });

                // hk.ajax({
                //     url: hostBase + '/admin/dict'
                //     , method: 'GET'
                //     , success: function (r) {
                //         if(r.code===0) {
                //             that.data = JSON.parse(JSON.stringify(that.formattingDictTree(r.data)));
                //         }else{
                //             that.$alert(r.msg, '获取列表失败', {
                //                 confirmButtonText: '确定',
                //                 callback: action => {}
                //             });
                //         }
                //     }
                // });
            }
            ,formattingDictTree:function (list) {
                for (let i = list.length-1; i >=0; i--) {
                    for(let x=0;x<list.length;x++){
                        if(list[x].dictCode === list[i].dictSuperiorCode){
                            if(list[x].children == null){
                                list[x].children = [list[i]]
                            }else{
                                list[x].children.unshift(list[i])
                            }
                            break;
                        }
                    }
                }
                let l = [];
                for(let i=0;i<list.length;i++){
                    if(list[i].dictSuperiorCode == null || list[i].dictSuperiorCode === ''){
                        l.push(list[i])
                    }
                }
                return l;
            }
        }
    };
</script>

<style scoped>

</style>
