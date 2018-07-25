import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './dashBoard.html';
import { People } from '../../api/people.js';
import p5 from 'p5'

class dashBoardCtrl {
    constructor($scope) {

      $scope.viewModel(this);
      this.helpers({
        peopleFind() {
          return People.find({});
        },
        inside(){
          return People.find({},{limit:1,sort:{createdAt:-1}}).fetch();
        }   
      })
      
      var s = function( sketch ) {

        const a = [5,10,6,7,8,8,9,1,2,5]

        function coOrd() {
          sketch.line(sketch.width/10, 0, sketch.width/10, sketch.height)
          sketch.line(0, sketch.height*(9/10), sketch.width, sketch.height*(9/10))
        }
        
        function rectDraw(){
          for(let i=1;i<=10;i++) {
            sketch.rect(sketch.width*(i/10),sketch.height*(9/10),sketch.width*(9/100),-a[i]*5)
          }
        }
      
        sketch.setup = function() {
          var canvas = sketch.createCanvas(600, 400);
          canvas.parent('sketch-holder');
        };
      
        sketch.draw = function() {
          sketch.background(255);
          coOrd()
          rectDraw()          

        };
      };
      var myp5 = new p5(s);
    }
}

export default angular.module('dashBoard', [
  angularMeteor
])

  .component('dashBoard', {
    templateUrl: 'imports/components/dashBoard/dashBoard.html',
    controller: ['$scope', dashBoardCtrl]
  });

