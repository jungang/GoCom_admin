<template>

  <div class="block">
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
    />

    <el-tree
      ref="tree"
      :data="data"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      check-on-click-node
      highlight-current
      default-expand-all
      :expand-on-click-node="false"

      :filter-node-method="filterNode"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      @node-click="handleNodeClick"
      @check="handleCheck"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
    />
    <!--    :render-content="renderContent"-->
  </div>

</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { getTree } from '@/api/tree'

let id = 1000

export default {
  name: 'DepartmentPanel',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      loading: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    console.log('this.setSelected....')
  },
  created() {
    this.getTree()
    console.log(this.type)
  },
  methods: {
    ...mapMutations('department',
      {
        add: 'increment',
        setSelected: 'setNodeCurrentSelected'
      }
    ),
    ...mapActions('department', [
      'incrementAsync'
    ]
    ),

    handleNodeClick(data) {
      console.log(data)
    },
    handleNodeCheck(data) {
      console.log('handleNodeCheck', data)
    },
    handleCheck(data, checked, node) {
      if (this.type === 'select-person-single' && checked) this.$refs.tree.setCheckedNodes([data])
      this.setSelected(this.$refs.tree.getCheckedNodes()) // 保存数据
    },
    addDisabledLable(data) {
      data.forEach((node) => {
        if (node.ifLeaf === false) {
          node.disabled = true
          return this.addDisabledLable(node.children)
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    append(data) {
      const newChild = { id: id++, label: '新插入部门', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
            <el-button size='mini' type='text' on-click={ () => this.append(data) }>Append</el-button>
            <el-button size='mini' type='text' on-click={ () => this.remove(node, data) }>Delete</el-button>
          </span>
        </span>)
    },

    getTree() {
      this.loading = true
      this.$emit('create') // for test
      getTree(this.listQuery).then(response => {
        if (this.type === 'select-person-single') this.addDisabledLable(response.data) // 判断是否多选

        this.data = response.data
        this.loading = false
        console.log(response)
      })
    },

    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes())
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys())
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 9,
        label: '三级 1-1-1'
      }])
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([9])
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    },

    handleDragStart(node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    }

  }
}
</script>
