import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './dashBoard.html';
import { People } from '../../api/people.js';

class dashBoardCtrl {
  constructor($scope) {
    
      var circleBar = new ProgressBar.Circle('#circle-container', {
      color: '#f9572b',
      strokeWidth: 5,
      trailWidth: 10,
      trailColor: '#E0E0E0',
      easing: 'easeInOut'
      
    });
    $scope.viewModel(this);
    this.helpers({
      inside() {
        var a = People.find({}, { limit: 1, sort: { createdAt: -1 } }).fetch();
        a = a.map(function (elem) {
          return elem.No_of_people;
        });
  
        var n = a[0];
        var x = document.getElementById('no');
        if(n>100){
          x.innerHTML = 0;
        }
        else{
          x.innerHTML = 100-n;
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
      guage(){
        var a=People.find({}, { limit: 1, sort: { createdAt: -1 } }).fetch();
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
          colorStop: ' #f9572b ', 
          strokeColor: '#E0E0E0', 
          generateGradient: true,
          highDpiSupport: true,   
          
        };
        var target = document.getElementById('guageChart');
        var gauge = new Gauge(target).setOptions(opts); 
        gauge.maxValue = 100; 
        gauge.setMinValue(0);  
        gauge.animationSpeed = 1;
        gauge.set(n);
        var x = document.getElementById('rem');
        if(n<0){
          x.innerHTML = 0;
        }  
        else{
          x.innerHTML = n;
        }  
        
      },
      percent(){
        var a=People.find({}, { limit: 1, sort: { createdAt: -1 } }).fetch();
        a = a.map(function (elem) {
          return elem.No_of_people;
        });
        var n = a[0];
        var p = (n/100);
        
        circleBar.animate(1-p, {
          duration: 1500
        });
      }
    })
  }
}

export default angular.module('dashBoard', [
  angularMeteor
])

  .component('dashBoard', {
    templateUrl: 'imports/components/dashBoard/dashBoard.html',
    controller: ['$scope', dashBoardCtrl]
  });

