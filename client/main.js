import angular from 'angular';
import angularMeteor from 'angular-meteor';
import dashBoard from '../imports/components/dashBoard/dashBoard';

 

angular.module('people-counter', [
  angularMeteor,
  dashBoard.name
]);

