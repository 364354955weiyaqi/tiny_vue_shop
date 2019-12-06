<template>
  <div>
    <!--面包屑导航区域-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图区域-->
    <el-card>
      <!--搜索与添加区域-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容"
                    v-model="queryInfo.query"
                    clearable @clear="getUserList">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="getUserList">
            </el-button>
          </el-input>
        </el-col>
        <!--添加用户按钮-->
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <!--数据列表-->
      <el-table :data="userList" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="电话" prop="email"></el-table-column>
        <el-table-column label="邮箱" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <!--若同时为模板列指定了作用域插槽,又为列表页指定了prop属性,那么作用域插槽会覆盖prop-->
        <el-table-column label="状态" prop="mg_state">
          <template slot-scope="scope">
            <!--通过v-model进行双向数据绑定-->
            <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"
                       @change="userStateChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!--通过作用域插槽来自定义对当前行的数据操作-->
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="min"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="min"></el-button>
            <!--通过tooltip,为不太明显的操作按钮进行相应操作提示-->
            <el-tooltip effect="dark" content="设置用户权限" placement="top-start" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="min"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <!--size-change绑定下拉选择每页显示条目事件, current-change绑定页码点击事件-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

      <!--添加用户对话框-->
      <el-dialog
        title="提示"
        :visible.sync="addDialogVisible" width="50%">
        <!--内容主体区域,添加用户信息表单-->
        <el-form :model="addUserForm" :rules="addUserFormRules" ref="ruleAddUserFormRef" label-width="70px">
          <!--label显示标签名,prop表示验证规则引用的属性名,
          el-input中的v-model 双向绑定的表单元素 -->
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addUserForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addUserForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="重复密码" prop="repeatPassword">
            <el-input v-model="addUserForm.repeatPassword" show-password></el-input>
          </el-form-item>
        </el-form>
        <!--底部区域-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'users',
  data() {
    var validatePass1 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (value.toString().length < 6 || value.toString().length > 18) {
        callback(new Error('密码长度为6 - 18个字符'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.addUserForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页
        pagesize: 2 // 每页显示条数
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      addUserForm: {
        username: '',
        password: '',
        repeatPassword: ''
      },
      addUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass1, trigger: 'blur' }
        ],
        repeatPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取用户列表错误！')
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 修改当前请求的数据条目,并重新请求数据
    // 重新请求数据的原因：只有重新请求数据，userList的数据才会得到更新,同时因表格与userlist进行了数据绑定,故页面数据才会更新
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 修改当前页
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    async userStateChange(userInfo) {
      // console.log(userInfo)
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error('用户状态更新失败!')
      }
      return this.$message.success('用户状态更新成功!')
    },
    // 关闭添加用户对话框前的回调，会暂停 Dialog 的关闭
    handleClose(done) {
      this.$messageBox.confirm('确认关闭？')
        .then(_ => {
          done()
        }).catch(_ => {
        })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
