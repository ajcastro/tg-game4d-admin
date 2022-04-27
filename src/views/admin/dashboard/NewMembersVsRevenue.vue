<template>
  <b-card no-body>
    <b-card-header>
      <!-- title and subtitle -->
      <div>
        <b-card-title class="mb-1">
          Revenue and New Registration Performance
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
        type="line"
        height="300"
        :options="chartOptions"
        :series="series"
      />
    </b-card-body>
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

      series: [{
        name: 'Revenue',
        type: 'line',
        data: [800, 900, 800, 1000, 2000, 800],
      }, {
        name: 'New Members',
        type: 'line',
        data: [400, 450, 380, 600, 200, 400],
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
        },
        stroke: {
          width: [4, 4],
        },
        // title: {
        //   text: 'Traffic Sources',
        // },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [0, 1],
          style: {
            colors: ['#a4d7fc', '#26E7A6'],
          },
        },
        labels: [
          '01-15 Feb 2022',
          '16-28 Feb 2022',
          '01-15 Mar 2022',
          '16-31 Mar 2022',
          '01-15 Apr 2022',
          '15-30 Apr 2022',
        ],
        xaxis: {
          // type: 'datetime',
        },
        yaxis: [{
          title: {
            text: 'Revenue',
          },
        }, {
          opposite: true,
          title: {
            text: 'New Members',
          },
        }],
      },
    }
  },
}
</script>
