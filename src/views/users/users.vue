<template>
  <div>
    <el-card class="input-card" shadow="hover">
      <el-input
        class="card-input"
        v-model="inputValue"
        placeholder="请输入内容"
        @keyup.enter.native="findUser"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="findUser"
      ></el-button>
    </el-card>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesise, currentPage * pagesise)
      "
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="180"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
      <el-table-column prop="brith" label="生日" width="180"> </el-table-column>
      <el-table-column prop="addr" label="地址"> </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="mini" @click="handleEdit()">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete()"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="tableData.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="pagesise"
      :current-page="currentPage"
      class="buttomPag"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getUserTable } from '../../api/table'
export default {
  data() {
    return {
      tableData: [
        {
          id: '',
          name: '',
          sex: '',
          age: '',
          brith: '',
          addr: ''
        }
      ],
      total: 0,
      pagesise: 12,
      currentPage: 1,
      inputValue: ''
    }
  },
  created() {
    this.userTable()
  },
  methods: {
    userTable() {
      getUserTable().then((res) => {
        // console.log(res)
        this.res = res.data
        this.tableData = this.res
        // console.log(this.tableData)
      })
    },
    handleSizeChange(newSize) {
      this.pagesise = newSize
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage
    },
    handleEdit() {
      this.$message({ message: '您进行了用户修改操作', type: 'success' })
    },
    handleDelete() {
      this.$message({ message: '您进行了用户删除操作', type: 'warning' })
    },
    findUser() {
      if (!this.inputValue) {
        this.$message({ message: '请输入想要查询的内容', type: 'warning' })
      } else {
        this.$message({
          message: `您查询了${this.inputValue}`,
          type: 'success'
        })
      }
    }
  }
}
</script>

<style>
.input-card,
.buttomPag {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-input {
  width: 600px;
  padding: 0 20px 0 0;
}
.buttomPag {
  padding: 20px;
}
</style>
