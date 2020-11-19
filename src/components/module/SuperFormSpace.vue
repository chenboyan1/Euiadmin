<template>
  <div>
    <el-card shadow="never" style="min-height:70vh">
      <div slot="header" class="clearfix">
        <span>超级表单</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="输入框">
          <el-input v-model="form.input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="单选框">
          <el-radio-group v-model="form.radio">
            <el-radio v-for="rad in radio" :key="rad.id" :label="rad.label">{{rad.label_name}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="多选框">
          <el-checkbox-group v-model="form.checkbox">
            <el-checkbox v-for="check in checkbox" :key="check" :label="check">{{check}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="数字">
          <el-input-number v-model="form.input_num" :min="1" :max="1000" label="数值"></el-input-number>
        </el-form-item>
        <el-form-item label="下拉选项">
          <el-select v-model="form.select" placeholder="请选择">
            <el-option
              v-for="rad in radio"
              :key="rad.id"
              :label="rad.label_name"
              :value="rad.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开关">
          <el-switch v-model="form.switch" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-form-item>
        <el-form-item label="滑块">
          <el-slider v-model="form.slider"></el-slider>
        </el-form-item>
        <el-form-item label="时间">
          <el-time-picker
            v-model="form.time"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            placeholder="任意时间点"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="时间范围">
          <el-time-picker
            is-range
            v-model="form.time_range"
            format="HH:mm:ss"
            value-format="HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date"
            type="date"
            value-format="yyyy/M/d"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="日期范围">
          <el-date-picker
            v-model="form.date_range"
            type="daterange"
            value-format="yyyy/M/d"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="时间日期">
          <el-date-picker
            v-model="form.date_time"
            type="datetime"
            value-format="yyyy/M/d HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="时间日期范围">
          <el-date-picker
            v-model="form.date_time_range"
            type="datetimerange"
            value-format="yyyy/M/d HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="评价">
          <el-rate v-model="form.rate" show-text></el-rate>
        </el-form-item>
        <el-form-item label="颜色选择">
          <el-color-picker v-model="form.color" show-alpha></el-color-picker>
        </el-form-item>
        <el-form-item label="文本框">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.textarea"></el-input>
        </el-form-item>
        <el-form-item label="富文本">
          <vEditorSpace v-model="form.editor" />
        </el-form-item>
      </el-form>
      <div align="center">
        <el-button type="primary" @click="show_form">查看表单信息</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        input: "",
        radio: "admin",
        checkbox: [],
        input_num: 12,
        select: "admin",
        switch: true,
        slider: 5,
        time: "12:00:00",
        time_range: ["0:00:00", "23:59:59"],
        date: "",
        date_range: ["2020/1/1", "2020/12/31"],
        date_time: "",
        date_time_range: ["2020/1/1 0:00:00", "2020/12/31 23:59:59"],
        rate: 1,
        color: "rgba(19, 206, 102, 0.8)",
        textarea: "",
        editor: "",
      },
      radio: [
        {
          id: 1,
          label: "admin",
          label_name: "管理员",
        },
        {
          id: 2,
          label: "user",
          label_name: "用户",
        },
        {
          id: 3,
          label: "editor",
          label_name: "作者",
        },
      ],
      checkbox: ["苹果", "梨子", "车厘子", "香蕉"],
    };
  },
  methods: {
    show_form() {
      console.log(this.form);
      this.$message.success("打印表单数据成功，请打开检查查看数据");
    },
  },
};
</script>