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
        <el-input v-model="formData[item.fieldName]"></el-input>
      </el-form-item>
    </el-form>
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
  // 获取全部数据
  getAllDate () {
    return this.formData
  },
  created () {
    this.formType = this.formList
    let formData = {}
    for (let key in this.formType) {
      formData[key] = ''
    }
    this.formData = formData
  }
}
</script>

<style scoped lang="scss">
// .form {
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   .form-item {
//     width: 40%;
//   }
// }
</style>