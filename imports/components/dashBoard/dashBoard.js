import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './dashBoard.html';
import { People } from '../../api/people.js';

class dashBoardCtrl {
  constructor($scope) {

    $scope.viewModel(this);
    this.helpers({
      inside() {
        var a = People.find({}, { limit: 1, sort: { createdAt: -1 } }).fetch();
        a = a.map(function (elem) {
          return elem.No_of_people;
        });

        var n = a[0];
        var x = document.getElementById('no');
        if (n > 2000) {
          x.innerHTML = 0;
        }
        else if (n < 0) {
          x.innerHTML = 2000;
        }
        else {
          x.innerHTML = 2000 - n;
        }

      },
      linegraph() {
        var y = People.find({}, { limit: 10, sort: { createdAt: -1 } }).fetch();
        y = y.reverse();
        y = y.map(function (elem) {
          return elem.No_of_people;
        });

        var x = People.find({}, { limit: 10, sort: { createdAt: -1 } }).fetch();
        x = x.reverse();
        x = x.map(function (elem) {
          var a = elem.createdAt.getHours() + ':' + elem.createdAt.getMinutes();
          return a;
        });

        var d = new Date();
        var ctx = document.getElementById("lineChart").getContext('2d');
        var myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: x,
            datasets: [{
              label: '# of People  |  ' + d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + ' ',
              data: y,
              borderWidth: 1,
              fill: false,
              borderColor: "#6f6d9e"
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            },
            elements: {
              line: {
                tension: 0,
              }
            }
          }
        });
      },
      guage() {
        var a = People.find({}, { limit: 1, sort: { createdAt: -1 } }).fetch();
        a = a.map(function (elem) {
          return elem.No_of_people;
        });
        var n = a[0];
        var opts = {
          angle: 0.0, // The span of the gauge arc
          lineWidth: 0.34, // The line thickness
          radiusScale: 1.0, // Relative radius
          pointer: {
            length: 0.6, // // Relative to gauge radius
            strokeWidth: 0.025, // The thickness
            color: '#5F68C3'
          },
          limitMax: true,     // If false, max value increases automatically if value > maxValue
          limitMin: true,     // If true, the min value of the gauge will be fixed
          colorStart: '#6FADCF',
          colorStop: '  #98f134',
          strokeColor: '#E0E0E0',
          generateGradient: true,
          highDpiSupport: true,

        };
        var target = document.getElementById('guageChart');
        var gauge = new Gauge(target).setOptions(opts);
        gauge.maxValue = 2000;
        gauge.setMinValue(0);
        gauge.animationSpeed = 1;
        gauge.set(n);
        var x = document.getElementById('rem');
        if (n < 0) {
          x.innerHTML = 0;
        }
        else {
          x.innerHTML = n;
        }

      },
      percent() {
        var a = People.find({}, { limit: 1, sort: { createdAt: -1 } }).fetch();
        a = a.map(function (elem) {
          return elem.No_of_people;
        });
        var n = a[0];
        var c = (n / 2000) * 100;

        var opts = {
          angle: 0.45,
          lineWidth: 0.07,
          radiusScale: 1.0,
          limitMax: true,     // If false, max value increases automatically if value > maxValue
          limitMin: true,     // If true, the min value of the gauge will be fixed
          colorStart: '#6FADCF',
          colorStop: '#98f134',
          strokeColor: '#E0E0E0',
          generateGradient: true,
          highDpiSupport: true,

        };
        var target = document.getElementById('circle-container');
        var gauge = new Donut(target).setOptions(opts);
        gauge.maxValue = 100;
        gauge.setMinValue(0);
        gauge.animationSpeed = 58;
        gauge.set(c);

        var x = document.getElementById('metrem');
        x.innerHTML = Math.round(c) + '%';
      },
      peak() {
        var d = new Date();
        if (d.getDay() == 0)//0-sunday
          d.setDate(d.getDate() - 2);
        else if (d.getDay() == 1)
          d.setDate(d.getDate() - 3);
        else
          d.setDate(d.getDate() - 1);

        d.toISOString();
        d.setHours(0, 0, 0, 0);
        var start = d.toISOString();
        d.setHours(23, 59, 59, 999);
        var end = d.toISOString();
        var a = People.find({ "createdAt": { $gte: new Date(start), $lte: new Date(end) } }, { limit: 1, sort: { No_of_people: -1 } }).fetch();
        a = a.map(function (elem) {
          return elem.createdAt;
        });
        var n = a[0];
        var MS_PER_MINUTE = 60000;
        var nmin = new Date(n - 15 * MS_PER_MINUTE);
        var nmax = new Date(nmin.getTime() + 30 * MS_PER_MINUTE)

        var x = document.getElementById('d1');
        x.innerHTML = nmin.getHours() + " : " + nmin.getMinutes();

        var y = document.getElementById('d2');
        y.innerHTML = nmax.getHours() + " : " + nmax.getMinutes();

      },
      barchart() {
        var d = new Date();
        d.setDate(d.getDate() - 7);
        
        var w = d.getDay();
        var arr = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        var day = arr[w];
        
        d.toISOString();
        d.setHours(0, 0, 0, 0);
        var start = d.toISOString();
        d.setHours(23, 59, 59, 999);
        var end = d.toISOString();
        var a = People.find({ "createdAt": { $gte: new Date(start), $lte: new Date(end) } }, { limit: 1, sort: { No_of_people: -1 } }).fetch();
        a = a.map(function (elem) {
          return elem.No_of_people;
        });
        var n = a[0];
        var p = (n/2000)*100;
        
        var MeSeContext = document.getElementById("weekCanvas").getContext("2d");
        var MeSeData = {
          labels: [
            day
          ],
          datasets: [{
            label: "Weekly Traffic %",
            data: [p],
            backgroundColor: ["#98f134", "#98f134", "#98f134", "#98f134", "#98f134"],
            borderWidth: 1
          }]
        };

        var MeSeChart = new Chart(MeSeContext, {
          type: 'horizontalBar',
          data: MeSeData,
          options: {
            scales: {
              xAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }],
              yAxes: [{
                stacked: true
              }]
            }

          }
        });
      }
    })
    // var stream=document.getElementById("stream");
    // stream.addEventListener('click',function (){

    // }); 
  }
}
export default angular.module('dashBoard', [
  angularMeteor
])

  .component('dashBoard', {
    templateUrl: 'imports/components/dashBoard/dashBoard.html',
    controller: ['$scope', dashBoardCtrl]
  });

