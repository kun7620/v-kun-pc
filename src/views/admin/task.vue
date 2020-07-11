<template>
  <d2-container id="task">
    <template slot="header">
      <el-button type="primary" @click="openAdd">新增</el-button>
    </template>
    <el-table
      ref="progressTwo"
      :data="taskList"
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        prop="taskName"
        label="任务名称">
      </el-table-column>

      <el-table-column
        prop="taskCorn"
        label="corn表达式">
      </el-table-column>

      <el-table-column
        prop="taskClass"
        label="任务执行类">
      </el-table-column>

      <el-table-column
        prop="taskParameter"
        label="参数">
      </el-table-column>

      <el-table-column
        label="状态">
        <template slot-scope="scope">
          {{scope.row.taskStatus == 0?'正在运行':'已停止'}}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <i class="el-icon-edit iButton" style="color:#409EFF;"
             @click="isInsert=false;openEdit(scope.$index, scope.row)"></i>
          <i class="el-icon-delete iButton" style="color:#F56C6C"
             @click="deleteTask(scope.$index,scope.row)"></i>
          <!--                      <el-button type="text" @click="stop(scope.$index, scope.row, false)" v-if="scope.row.taskStatus == 0" style="color: #E6A23C">停止</el-button>-->
          <!--                      <el-button type="text" @click="stop(scope.$index, scope.row, true)" v-if="scope.row.taskStatus == 1">启动</el-button>-->
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
      <el-form :model="taskForm" :rules="rules" ref="taskForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="taskForm.taskName"></el-input>
        </el-form-item>

        <el-form-item label="corn表达式" prop="taskCorn">
          <el-input v-model="taskForm.taskCorn"></el-input>
        </el-form-item>

        <el-form-item label="任务执行类" prop="taskClass">
          <el-input v-model="taskForm.taskClass"></el-input>
        </el-form-item>

        <el-form-item label="参数" prop="taskParameter">
          <el-input v-model="taskForm.taskParameter"></el-input>
        </el-form-item>

        <el-form-item label="是否启动" prop="taskStatus">
          <el-select
            v-model="taskForm.taskStatus"
            default-first-option
            placeholder="请选择">
            <el-option
              key="0"
              label="是"
              value="0">
            </el-option>
            <el-option
              key="1"
              label="否"
              value="1">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <el-button type="primary" style="margin:auto;display:block;" @click="save">保存</el-button>
    </el-dialog>
  </d2-container>
</template>

<script>
export default {
    name: 'task',
    data: function () {
        return {
            taskList: [],
            taskForm: {
                taskName: '',
                taskCorn: '',
                taskClass: '',
                taskParameter: '',
                taskStatus: '0'
            },
            rules: {
                taskName: [
                    { required: true, message: '请输入任务名称', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度2-20个字符', trigger: 'blur' }
                ],
                taskCorn: [
                    { required: true, message: '请输入cron表达式', trigger: 'blur' }
                ],
                taskClass: [
                    { required: true, message: '请输入执行的类', trigger: 'blur' },
                    { min: 2, max: 200, message: '长度2-200个字符', trigger: 'blur' }
                ],
                taskParameter: [
                    { required: false, message: '请输入参数', trigger: 'blur' },
                    { min: 2, max: 50, message: '长度2-500个字符', trigger: 'blur' }
                ]
            },
            formDialogVisible: false,
            isInsert: true,
            loading: true
        };
    },
    created: function () {
        this.select();
    },
    methods: {
        select () {
            const that = this;
            that.taskForm = [];
            this.axios.get('/admin/task')
                .then(r => {
                    if (r.code === 0) {
                        that.taskList = r.data;
                        that.loading = false;
                    } else {
                        that.$message.error(r.msg);
                    }
                });
        },
        save () {
            const that = this;
            if (that.isInsert) {
                this.axios.post('/admin/task', that.taskForm)
                    .then(r => {
                        if (r.code === 0) {
                            that.select();
                            that.$message.success('保存成功');
                            that.formDialogVisible = false;
                        } else {
                            that.$message.error(r.msg);
                        }
                    });
            } else {
                this.axios.put('/admin/task', that.taskForm)
                    .then(r => {
                        if (r.code === 0) {
                            that.select();
                            that.$message.success('保存成功');
                            that.formDialogVisible = false;
                        } else {
                            that.$message.error(r.msg);
                        }
                    });
            }
        },
        openAdd () {
            this.isInsert = true;
            this.taskForm = {
                taskName: '',
                taskCorn: '',
                taskClass: '',
                taskParameter: '',
                taskStatus: '0'
            };
            this.formDialogVisible = true;
        },
        openEdit (index, row) {
            this.taskForm = JSON.parse(JSON.stringify(row));
            this.taskForm.taskStatus = row.taskStatus + '';
            this.formDialogVisible = true;
        },
        deleteTask (index, row) {
            const that = this;
            this.axios.delete('/admin/task', row)
                .then(r => {
                    if (r.code === 0) {
                        that.select();
                        that.$message.success('删除成功');
                    } else {
                        that.$message.error(r.msg);
                    }
                });
        }
    }
};
</script>

<style scoped>

</style>
