import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './dashBoard.html';
import { People } from '../../api/people.js';


class dashBoardCtrl {
  constructor($scope) {

    $scope.viewModel(this);
    this.helpers({
      peopleFind() {
        return People.find({});
      },
      inside() {
        return People.find({}, { limit: 1, sort: { createdAt: -1 } }).fetch();
      }
    })
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of People',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 2,
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

  }

}

export default angular.module('dashBoard', [
  angularMeteor
])

  .component('dashBoard', {
    templateUrl: 'imports/components/dashBoard/dashBoard.html',
    controller: ['$scope', dashBoardCtrl]
  });

