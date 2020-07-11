<template>
  <container>
    <el-table
      :data="rightList"
      v-loading="loading"

      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
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
          <el-button :type="tableMethodClassName(scope)" class="rightMethodButton" plain>{{scope.row.rightMethod}}
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
  </container>
</template>

<script>
export default {
    name: 'right',
    data () {
        return {
            rightList: [],
            rightModuleNameFilters: [],
            loading: true
        };
    },
    created () {
        const that = this;
        that.axios.get('/admin/right')
            .then(r => {
                that.rightList = r.data;
                // 设置模块名称筛选条件
                const rightModuleNameFilters_1 = {};
                for (const item of r.data) {
                    rightModuleNameFilters_1[item.rightModuleName] = '';
                }
                const rightModuleNameFilters_list = Object.keys(rightModuleNameFilters_1);
                for (const ieme of rightModuleNameFilters_list) {
                    that.rightModuleNameFilters.push({ text: ieme, value: ieme });
                }
                that.loading = false;
            });
    },
    methods: {
        tableMethodClassName ({ row, rowIndex }) {
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
        rightModuleNameFiltersMethod (value, row, column) {
            const property = column.property;
            return row[property] === value;
        }
    }
};
</script>

<style scoped>
  .el-table .rightMethodButton {
    cursor: default;
  }
</style>
