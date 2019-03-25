<template>

  <div class="well text-center">
      <div class="row">
        <div class="col-md-6">
          <fusioncharts
          :type="barchart.type"
          :width="barchart.width"
          :height="barchart.height"
          :dataFormat="barchart.dataFormat"
          :dataSource="barchart.dataSource"
          ></fusioncharts>
        </div>
        <div class="col-md-6">
          <fusioncharts
          :type="piechart.type"
          :width="piechart.width"
          :height="piechart.height"
          :dataFormat="piechart.dataFormat"
          :dataSource="piechart.dataSource"
          ></fusioncharts>
        </div>
      </div>
      <div class="row">
        <div  class="col-md-6">
          <fusioncharts
          :type="piechart.type"
          :width="piechart.width"
          :height="piechart.height"
          :dataFormat="piechart.dataFormat"
          :dataSource="piechart.priorityDS"
          ></fusioncharts>
        </div>
        <div class="col-md-6">
          <fusioncharts
          :type="piechart.type"
          :width="piechart.width"
          :height="piechart.height"
          :dataFormat="piechart.dataFormat"
          :dataSource="piechart.satisfactionDS"
          ></fusioncharts>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <fusioncharts
          :type="tschart.type"
          :width="tschart.width"
          :height="tschart.height"
          :dataFormat="tschart.dataFormat"
          :dataSource="tschart.dataSource"
          ></fusioncharts>
        </div>
      </div>
    </div>
</template>

<script>
/* eslint-disable */ 
import VueFusionCharts from 'vue-fusioncharts'
import FusionCharts from 'fusioncharts'
import Charts from 'fusioncharts/fusioncharts.charts'
import Vue from 'vue'
// import the theme
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import tickets from '../json/data.json'
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';

// register VueFusionCharts component
Vue.use(VueFusionCharts, FusionCharts, Charts, FusionTheme, TimeSeries)

export default {
  data () {
    return {
      tickets: tickets,
      barchart: {
        width: '90%',
        height: '500',
        type: 'column3d',
        dataFormat: 'json',
        dataSource: this.TicketTypes(tickets)
      },
      tschart: {
        width: '95%',
        height: '500',
        type: 'timeseries',
        dataFormat: 'json',
        dataSource: this.TimeSeriesChart(tickets)
      },
      piechart: {
        width: '90%',
        height: '500',
        type: 'pie3d',
        dataFormat: 'json',
        dataSource: this.SeverityChart(tickets),
        priorityDS: this.PriorityChart(tickets),
        satisfactionDS: this.SatisfactionChart(tickets),
      }
      
    }
  },
  methods: {
    TicketTypes (tickets) {
      var obj = {}
      var data = {"chart": {
        "caption": "Ticket category ratio",
        "xAxisName": "Sectors",
        "yAxisName": "Tickets",
        "theme": "fusion"
      }}
      tickets.forEach(x => {
        if (x.FiledAgainst in obj) {
          obj[x.FiledAgainst] += 1
        } else { 
          obj[x.FiledAgainst] = 1
        }
      })
      var a = []
      for (var prop in obj) {
          var temp = {}
          temp['label'] = prop
          temp['value'] = obj[prop]
          a.push(temp)
      }
      data['data'] = a
      return data
    },

    TimeSeriesChart(tickets) {
      var ds = {
        caption: { text: "Time Series Chart of tickets" },
        chart: {
          showLegend: 0
        },
        caption: {
          text: "Daily Ticket Count"
        },
        yAxis: [
          {
            plot: {
              value: "Daily Tickets",
              type: "column"
            },
            title: "Daily Tickets (in thousand)"
          }
        ]
      }
      var schema = [
        {
          "name": "Time",
          "type": "date",
          "format": "%Y-%m-%d"
        },
        {
          "name": "Daily Tickets",
          "type": "number"
        }
      ]
      var obj = {}
      tickets.forEach(x => {
        if (x['Ticket Creation Date'] in obj) {
          obj[x['Ticket Creation Date']] += 1
        } else { 
          obj[x['Ticket Creation Date']] = 1
        }
      })
      var a = []
      for (var prop in obj) {
          var temp = []
          temp.push(moment(Date.parse(prop)).format('YYYY-MM-DD'))
          temp.push(obj[prop])
          a.push(temp)
      }
      const fusionTable = new FusionCharts.DataStore().createDataTable(
          a,
          schema
      );
      ds['data'] = fusionTable
      return ds
    }, 

    SeverityChart(tickets) {
      var obj = {}
      var data = {"chart": {
        "caption": "Tickets ratio based on Severity level",
        "showValues":"1",
        "showPercentInTooltip" : "0",
        "numberPrefix" : "$",
        "enableMultiSlicing":"1",
        "theme": "fusion"
      }}
      tickets.forEach(x => {
        if (x.Severity in obj) {
          obj[x.Severity] += 1
        } else { 
          obj[x.Severity] = 1
        }
      })
      var a = []
      for (var prop in obj) {
          var temp = {}
          temp['label'] = prop.substring(4, prop.length);
          temp['value'] = obj[prop]
          a.push(temp)
      }
      data['data'] = a
      return data

    },

    PriorityChart(tickets) {
      var obj = {}
      var data = {"chart": {
        "caption": "Tickets ratio based on Priority",
        "showValues":"1",
        "showPercentInTooltip" : "0",
        "numberPrefix" : "$",
        "enableMultiSlicing":"1",
        "theme": "fusion"
      }}
      tickets.forEach(x => {
        if (x.Priority in obj) {
          obj[x.Priority] += 1
        } else { 
          obj[x.Priority] = 1
        }
      })
      var a = []
      for (var prop in obj) {
          var temp = {}
          temp['label'] = prop.substring(4, prop.length);
          temp['value'] = obj[prop]
          a.push(temp)
      }
      data['data'] = a
      return data

    },

    SatisfactionChart(tickets) {
      var obj = {}
      var data = {"chart": {
        "caption": "Tickets ratio based on reviews",
        "subCaption" : "For each resolved ticket",
        "showValues":"1",
        "showPercentInTooltip" : "0",
        "numberPrefix" : "$",
        "enableMultiSlicing":"1",
        "theme": "fusion"
      }}
      tickets.forEach(x => {
        if (x.Satisfaction in obj) {
          obj[x.Satisfaction] += 1
        } else { 
          obj[x.Satisfaction] = 1
        }
      })
      var a = []
      for (var prop in obj) {
          var temp = {}
          temp['label'] = prop.substring(4, prop.length);
          temp['value'] = obj[prop]
          a.push(temp)
      }
      data['data'] = a
      return data

    }

  }
}
</script>

<style>

.row {
background-color: #e3e3e3;
padding: 10px;
padding-top: 20px;
}

.col-md-6 {

}

</style>
