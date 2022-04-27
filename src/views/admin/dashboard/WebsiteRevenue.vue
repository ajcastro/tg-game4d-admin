<template>
  <b-card no-body>
    <b-card-header>
      <!-- title and subtitle -->
      <div>
        <b-card-title class="mb-1">
          Website Revenue
        </b-card-title>
        <!-- <b-card-sub-title>Commercial networks</b-card-sub-title> -->
      </div>
      <!--/ title and subtitle -->

      <!-- datepicker -->
      <!-- <div class="d-flex align-items-center">
        <feather-icon
          icon="CalendarIcon"
          size="16"
        />
        <flat-pickr
          v-model="rangePicker"
          :config="{ mode: 'range'}"
          class="form-control flat-picker bg-transparent border-0 shadow-none"
          placeholder="YYYY-MM-DD"
        />
      </div> -->
      <!-- datepicker -->
    </b-card-header>

    <b-card-body>
      <vue-apex-charts
        type="bar"
        height="300"
        :options="chartOptions"
        :series="series"
      >
        />
      </vue-apex-charts></b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BCardTitle, BCardSubTitle,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import flatPickr from 'vue-flatpickr-component'
import apexChatData from './apexChartData'

export default {
  components: {
    BCard,
    VueApexCharts,
    BCardHeader,
    BCardBody,
    BCardTitle,
    BCardSubTitle,
    flatPickr,
  },
  data() {
    return {
      apexChatData,
      rangePicker: ['2022-05-01', '2022-05-10'],

      series: [
        {
          name: 'cl1wb1',
          data: [440000, 550000, 410000],
        },
        {
          name: 'cl1wb2',
          data: [530000, 320000, 330000],
        },
        {
          name: 'cl1wb3',
          data: [530000, 320000, 330000],
        },
      ],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 300,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: 'top',
            },
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#fff'],
          },
          formatter(val) {
            return `${val / 1000}k`
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff'],
        },
        tooltip: {
          shared: true,
          intersect: false,
        },
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr'],
        },
      },
    }
  },
}
</script>
