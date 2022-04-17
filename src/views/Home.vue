<template>
  <div class="home">
    <h1>Welcome to Mason's Weather App</h1>
    <h1>Enter a US city name or US zip code</h1>
    <el-form :model="form" label-width="120px" :rules="rules" ref="form">
      <el-form-item label="Search" prop="name">
        <el-input v-model="form.name" @keypress.enter="onSubmit('form')" placeholder="enter city name or US zip code"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">Search</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" height="250" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
    <h2>Weather Data in {{weatherData.name}}, {{ weatherData.country }}</h2>
    <el-descriptions
        direction="vertical"
        :column="4"
        border
    >
      <el-descriptions-item label="City name">{{ weatherData.name }}</el-descriptions-item>
      <el-descriptions-item label="Region">{{ weatherData.region }}</el-descriptions-item>
      <el-descriptions-item label="Country">{{ weatherData.country }}</el-descriptions-item>
      <el-descriptions-item label="Last updated at (local time)">{{ weatherData.last_updated }}</el-descriptions-item>
      <el-descriptions-item label="Temperature in celsius">{{ weatherData.temp_c }}</el-descriptions-item>
      <el-descriptions-item label="Feels like temperature in celsius">{{ weatherData.feelslike_c }}</el-descriptions-item>
      <el-descriptions-item label="Weather condition">{{ weatherData.condition }}</el-descriptions-item>
      <el-descriptions-item label="Visibility in miles">{{ weatherData.vis_miles }}</el-descriptions-item>
      <el-descriptions-item label="Wind speed in miles per hour">{{ weatherData.wind_mph }}</el-descriptions-item>
      <el-descriptions-item label="Wind direction">{{ weatherData.wind_dir }}</el-descriptions-item>
      <el-descriptions-item label="Pressure in millibars">{{ weatherData.pressure_mb }}</el-descriptions-item>
      <el-descriptions-item label="Precipitation amount in millimeters">{{ weatherData.precip_mm }}</el-descriptions-item>
      <el-descriptions-item label="Humidity as percentage">{{ weatherData.humidity }}</el-descriptions-item>
      <el-descriptions-item label="Cloud cover as percentage">{{ weatherData.cloud }}</el-descriptions-item>
      <el-descriptions-item label="UV Index">{{ weatherData.uv }}</el-descriptions-item>
      <el-descriptions-item label="Air Quality">{{ weatherData.air_quality }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>

export default {
  name: 'Home',
  mounted() {
    this.updateWeatherData("pittsburgh")
  },
  data() {
    return {
      weatherData: {
        name: '',
        region: '',
        country: '',
        last_updated: '',
        temp_c: 0.0,
        condition: '',
        feelslike_c: 0.0,
        vis_miles: 0.0,
        wind_mph: 0.0,
        wind_dir: '',
        pressure_mb: '',
        precip_mm: '',
        humidity: 0.0,
        cloud: 0.0,
        uv: 0.0,
        air_quality: ''
      },
      rules: {
        name: [
          { required: true, message: 'enter city name or US zip code', trigger: 'blur' }
        ]
      },
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        }
      ],
      form: {
        name: ''
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateWeatherData(this.form.name)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    updateWeatherData(searchString) {
      this.axios({
        method: "GET",
        url: "https://api.weatherapi.com/v1/current.json",
        params: {
          key: "912832190d00469d85010236221704",
          aqi: "yes",
          q: searchString
        }
      }).then(response => {
        this.weatherData.name = response.data.location.name
        this.weatherData.region = response.data.location.region
        this.weatherData.country = response.data.location.country
        this.weatherData.last_updated = response.data.current.last_updated
        this.weatherData.temp_c = response.data.current.temp_c
        this.weatherData.feelslike_c = response.data.current.feelslike_c
        this.weatherData.condition = response.data.current.condition.text
        this.weatherData.vis_miles = response.data.current.vis_miles
        this.weatherData.wind_mph = response.data.current.wind_mph
        this.weatherData.wind_dir = response.data.current.wind_dir
        this.weatherData.pressure_mb = response.data.current.pressure_mb
        this.weatherData.precip_mm = response.data.current.precip_mm
        this.weatherData.humidity = response.data.current.humidity
        this.weatherData.cloud = response.data.current.cloud
        this.weatherData.uv = response.data.current.uv
        switch (response.data.current.air_quality["us-epa-index"]) {
          case 1 :
            this.weatherData.air_quality = 'Good'
            break
          case 2 :
            this.weatherData.air_quality = 'Moderate'
            break
          case 3 :
            this.weatherData.air_quality = 'Unhealthy for sensitive group'
            break
          case 4 :
            this.weatherData.air_quality = 'Unhealthy'
            break
          case 5 :
            this.weatherData.air_quality = 'Very Unhealthy'
            break
          case 6 :
            this.weatherData.air_quality = 'Hazardous'
            break
        }
      }).catch(err => {
        alert("No location found. Please check your input");
        console.log(err)
      })
    }
  }
}
</script>
