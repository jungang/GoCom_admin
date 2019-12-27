<template>
  <div class="app-container">

    <xcom />
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
      <el-col>
        选择人员 多选
        type:select-persons
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" class="section">
        <el-button type="primary" @click="dialogVisible.dialog1 = true">选择人员-多选（type:select-persons-multi）</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="section select-view">
        <div class="grid-content bg-purple"><p>已选择内容</p></div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">
          <el-tag
            v-for="tag in dynamicTags.tags1"
            :key="tag.id"
            closable
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

    <el-row>
      <el-col :span="12" class="section">
        <el-button type="primary" @click="dialogVisible.dialog2 = true">选择人员-单选（type:select-person-single）</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="section select-view">
        <div class="grid-content bg-purple"><p>已选择内容</p></div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">
          <el-tag
            v-for="tag in dynamicTags.tags2"
            :key="tag.id"
            closable
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
      title="选择人员-多选（type:select-persons-multi）"
      :visible.sync="dialogVisible.dialog1"
      width="50%"
      @dragDialog="handleDrag"
    >
      <div id="dep_box" ref="select">
        <DepartmentPanel type="select-persons-multi" />
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAllDialog">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm('tags1')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      v-el-drag-dialog
      title="选择人员-单选（type:select-person-single）"
      :visible.sync="dialogVisible.dialog2"
      width="50%"
      @dragDialog="handleDrag"
    >

      <div id="dep_box" ref="select">
        <DepartmentPanel type="select-person-single" />
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAllDialog">取 消</el-button>
        <el-button type="primary" @click="dialogConfirm('tags2')">确 定</el-button>
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
      dialogVisible: {
        dialog1: false,
        dialog2: false,
        dialog3: false,
        dialog4: false,
        dialog5: false,
        dialog6: false,
        dialog7: false,
        dialog8: false,
        dialog9: false,
        dialog10: false
      },
      value: new Date(),
      dynamicTags: {
        tags1: [],
        tags2: [],
        tags3: [],
        tags4: [],
        tags5: []
      }

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
    dialogConfirm(view) {
      this.dynamicTags[view] = this.department.nodeCurrentSelected.filter((item, index) => item.type === 'employee')
      console.log(this[view])
      console.log(this.dynamicTags)
      this.closeAllDialog()
    },
    closeAllDialog() {
      for (const item in this.dialogVisible) this.dialogVisible[item] = false
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
  .select-view{
    text-align: right;
    p{
      margin: 9px;
    }
  }
</style>
