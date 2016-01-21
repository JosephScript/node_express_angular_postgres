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
        $scope.talents = response.data;
        // go get all their talents (except last one)
        $scope.talents.forEach(function(elem) {
          if (elem.talent_id !== $scope.talents[$scope.talents.length - 1].talent_id) {
            $http.get('/join/' + elem.talent_id)
              .then(function(response) {
                elem.skills = response.data;
              });
          }
        });

        // initialize the last one with an empty array
        $scope.talents[$scope.talents.length - 1].skills = [];
        // still need to add talents for last one
        $scope.talentForm.skills.forEach(function(elem) {
          // $scope.talent.length will be the ID of the last inserted element
          $http.post('/join/' + $scope.talents.length + '/' + elem)
            .then(function(response) {
              $scope.talents[$scope.talents.length - 1]
              .skills.push(response.data);

            });
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
          elem.skills = response.data;
        });
    });
  });
}]);
