var app = angular.module('myApp', ['checklist-model']);

app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.skillForm = {};
  $scope.talentForm = {
    skills: []
  };
  $scope.toggleTalentForm = function() {
    $scope.showTalentForm = !$scope.showTalentForm;
  };
  $scope.toggleSkillForm = function() {
    $scope.showSkillForm = !$scope.showSkillForm;
  };
  $scope.submitSkill = function() {
    console.log($scope.skillForm);
    $http.post('/skills', $scope.skillForm)
      .then(function(response) {
        $scope.skills = response.data;
      });
  };
  $scope.submitTalent = function() {
    $http.post('/talents', $scope.talentForm)
      .then(function(response) {
        $scope.talent = response.data;
        $scope.talentForm.skills.forEach(function(elem) {
          // $scope.talent.length will be the ID of the last inserted element
          $http.post('/join/' + $scope.talent.length + '/' + elem);
        });
      });
  };

  $scope.skills = [];
  $http.get('/skills').then(function(response) {
      $scope.skills = response.data;
    });

  $scope.talents = [];
  $http.get('/talents').then(function(response) {
    $scope.talents = response.data;
    $scope.talents.forEach(function(elem) {
      $http.get('/join/' + elem.talent_id)
        .then(function(response) {
          console.log(response);
          elem.skills = response.data;
        });
    });
  });
}]);
