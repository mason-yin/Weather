<template>
  <div class="history">
    <h1>Enter a US city name or US zip code, then pick a date below(last 7 days only)</h1>
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
    <h2>History Weather Data in {{ locationData.name }}, {{ locationData.country }}</h2>
    <el-table :data="tableData" style="width: 100%" ref="table" v-loading="loading">
      <el-table-column prop="time" label="Time(Local)" />
      <el-table-column prop="temp_c" label="Temperature in celsius" />
      <el-table-column prop="feelslike_c" label="Feels like temperature in celsius" />
      <el-table-column prop="condition.text" label="Weather condition" />
      <el-table-column prop="wind_mph" label="Wind speed in miles per hour" />
      <el-table-column label="Check Result" width="200">
        <template v-slot="scope">
          <el-button type="text" @click="toggleExpand(scope.row)">Check</el-button>
        </template>
      </el-table-column>
      <el-table-column type="expand" width="1">
        <template v-slot="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="Wind direction: ">
              <span>{{ props.row.wind_dir }}</span>
            </el-form-item>
            <br/>
            <el-form-item label="Pressure in millibars: ">
              <span>{{ props.row.pressure_mb }}</span>
            </el-form-item>
            <br/>
            <el-form-item label="Precipitation amount in millimeters: ">
              <span>{{ props.row.precip_mm }}</span>
            </el-form-item>
            <br/>
            <el-form-item label="Humidity as percentage: ">
              <span>{{ props.row.humidity }}</span>
            </el-form-item>
            <br/>
            <el-form-item label="Cloud cover as percentage: ">
              <span>{{ props.row.cloud }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "History",
  mounted() {
    let date = new Date(Date.now() - 3600 * 1000 * 24)
    let str = date.getFullYear() + '-' +  '04' + '-' + date.getDate()
    console.log(str)
    this.updateHistoryData("pittsburgh", str)
  },
  data () {
    return {
      loading: true,
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
          this.loading = true
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
        this.loading = false
      }).catch(err => {
        alert("No location found. Please check your input or change the date");
        this.loading = false
        console.log(err)
      })
    },
    toggleExpand(row) {
      let $table = this.$refs.table;
      $table.toggleRowExpansion(row)
    }
  }
}
</script>

<style scoped>
  el-form{

  }
</style>
