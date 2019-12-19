<template>
  <div class="app-container">

    <el-row>
      <h2>
        组件示例——人员选择器组件
      </h2>
      <p>DepartmentPanel</p>

      <h3>
        基本用法
      </h3>
    </el-row>

    <el-divider />
    <el-row>
      <el-col :span="4" class="section">
        <el-button type="primary" @click="dialogVisible = true">选择人员</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="4" class="section">
        <div class="grid-content bg-purple"><p>已选择内容</p></div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">

          <el-tag
            v-for="tag in dynamicTags"
            :key="tag.id"
            closable
            effect="Dark"
            :type="tag.type"
            :disable-transitions="false"
            @close="handleTagClose(tag)"
          >
            {{ tag.label }}
          </el-tag>
        </div>
      </el-col>
    </el-row>

    <el-divider />

    <el-dialog
      v-el-drag-dialog
      title="选择部门"
      :visible.sync="dialogVisible"
      width="50%"
      @dragDialog="handleDrag"
    >

      <!--      :before-close="handleClose"-->

      <div id="dep_box" ref="select">
        <DepartmentPanel />
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import DepartmentPanel from '@/components/DepartmentPanel'

export default {
  components: { DepartmentPanel },
  directives: { elDragDialog },
  data() {
    return {
      dialogVisible: false,
      value: new Date(),
      dynamicTags: []
    }
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.department.count,
    ...mapState([
      'xxx',
      'department'
    ])

  }),
  created() {
  },
  methods: {
    dialogConfirm() {
      this.dynamicTags = this.department.nodeCurrentSelected.filter((item, index) => item.type === 'employee')
      this.dialogVisible = false
    },
    handleDrag() {
      this.$refs.select.blur()
    },
    handleTagClose(tag) {
      this.dynamicTags = this.dynamicTags.filter((item, index) => tag.id !== item.id)

      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }

  }

}
</script>

<style lang="scss">
  #dep_box{
    .el-tree{
      max-height: 500px;
      overflow-y: scroll;
    }
  }
  .el-row{
    margin-top: 20px;
  }
  .el-tag{
    margin: 3px;
  }
  .section{
    text-align: right;
    p{
      margin: 9px;
    }
  }
</style>
