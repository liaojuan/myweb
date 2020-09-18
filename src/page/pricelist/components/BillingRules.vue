<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="业务:">
        <el-select v-model="form.modeid" placeholder="请选择业务">
          <el-option v-for="item of professionList" @click.native="getCarMode(item.carlist)" :key="item.modeid" :label="item.name" :value="item.modeid">{{item.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="车型:">
        <el-select v-model="form.carid" placeholder="请选择车型">
          <el-option v-for="caritem of this.carlist" :key="caritem.id" :label="caritem.carname" :value="caritem.id">{{caritem.carname}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市:">
        <el-select v-model="form.code" placeholder="请选择省份">
          <el-option label="--请选择省份--" value="all"></el-option>
        </el-select>
        <el-select v-model="form.adcode" placeholder="请选择城市">
          <el-option label="--请选择城市--" value="all"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onCheck">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BillingRules',
  props: {
    professionList: Array
  },
  data () {
    return {
      form: {
        modeid: '',
        carid: '',
        code: '',
        adcode: ''
      },
      carlist: Array
    }
  },
  methods: {
    onCheck () {
      console.log(this.professionList)
    },
    /**
     * @param {Object} mlist
     * 根据选择的业务，动态的修改后面的相应的车型
     */
    getCarMode (mlist) {
      this.carlist = [];
      this.carlist = mlist;
      this.setCarTypeText();
    },
    /**
     * 设置车型显示
     */
    setCarTypeText () {
      this.form.carid = null;
    }
  }
}
</script>

<style>
</style>
