<template>
  <div class="history">
    <h1>Pick a date below(last 7 days only)</h1>
    <el-form :model="form" label-width="120px" :rules="rules" ref="form">
      <el-form-item label="Search" prop="name">
        <el-input v-model="form.name" placeholder="enter city name or US zip code"/>
      </el-form-item>
      <el-form-item prop="date" label="Date">
        <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="choose a date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :disabled-date="disabledDate">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">Search</el-button>
      </el-form-item>
    </el-form>
    <h2>History Data in {{ locationData.name }}, {{ locationData.country }}</h2>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="time" label="Time" />
      <el-table-column prop="temp_c" label="Temperature in celsius" />
      <el-table-column prop="feelslike_c" label="Feels like temperature in celsius" />
      <el-table-column prop="condition.text" label="Weather condition" />
      <el-table-column prop="wind_mph" label="Wind speed in miles per hour" />
    </el-table>
  </div>
</template>

<script>
export default {
  name: "History",
  data () {
    return {
      disabledDate(time) {
        return (time.getTime() > (Date.now() - 3600 * 1000 * 24)) || (time.getTime() < (Date.now() - 3600 * 1000 * 24 * 8))
      },
      locationData: {
        name: '',
        country: ''
      },
      tableData: [],
      form: {
        name: '',
        date: ''
      },
      rules: {
        name: [
          { required: true, message: 'enter city name or US zip code', trigger: 'blur' }
        ],
        date: [
          { required: true, message: 'choose a date', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateHistoryData(this.form.name, this.form.date)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    updateHistoryData(name, date) {
      this.axios({
        method: "GET",
        url: "https://api.weatherapi.com/v1/history.json",
        params: {
          key: "912832190d00469d85010236221704",
          aqi: "yes",
          q: name,
          dt: date
        }
      }).then(response => {
        // console.log(response.data.forecast.forecastday[0].hour)
        this.locationData.name = response.data.location.name
        this.locationData.country = response.data.location.country
        this.tableData = response.data.forecast.forecastday[0].hour
      }).catch(err => {
        alert("No location found. Please check your input");
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  el-form{

  }
</style>
