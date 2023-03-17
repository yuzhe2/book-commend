<template>
  <div class="wrap">
    <el-form :model="formData" class="form" label-position="right" label-width="80px" >
      <el-form-item
        v-for="(item, index) in formType"
        :key="index"
        :prop="item.fieldName"
        :label="item.label"
        class="form-item"
      >
        <template v-if="item.type === 'INPUT'">
          <el-input v-model="formData[item.fieldName]"></el-input>
        </template>
        <template v-else-if="item.type === 'SELECT'">
          <el-select v-model="formData[item.fieldName]">
            <el-option
              v-for="(item, index) in item.itemList"
              :key="index"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button @click="handleClickCancel">取 消</el-button>
      <el-button type="primary" @click="handleClickConfirm">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'formPanel',
  props: {
    formList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      formData: {},
      formType: []
    }
  },
  methods: {
    handleClickCancel () {
      this.$emit('cancel')
    },
    handleClickConfirm () {
      this.$emit('confirm', this.formData)
    }
  },  
  created () {
    this.formType = this.formList
    let formData = {}
    for (let i = 0; i < this.formType.length; i++) {
      let field = this.formType[i]['fieldName']
      formData[field] = this.formType[i]['initValue'] || ''
    }
    this.formData = formData
  }
}
</script>

<style scoped lang="scss">
.footer {
  text-align: right;
}
</style>