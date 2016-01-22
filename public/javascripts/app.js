var app = angular.module('myApp', ['checklist-model']);

app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {

  // set up repeaters
  $scope.skills = [];
  $scope.talents = [];

  // hide/show and clear forms
  $scope.toggleTalentForm = function() {
  $scope.talentForm = {
    skills: []
  };
    $scope.showTalentForm = !$scope.showTalentForm;
  };
  $scope.toggleSkillForm = function() {
    $scope.skillForm = {};
    $scope.showSkillForm = !$scope.showSkillForm;
  };

  // adds a skill
  $scope.submitSkill = function() {
    console.log($scope.skillForm);
    $http.post('/skills', $scope.skillForm)
      .then(function(response) {
        $scope.skills = response.data;
        $scope.skillForm = {};
      });
  };

  // adds talent
  $scope.submitTalent = function() {
    $http.post('/talents', $scope.talentForm)
      .then(function(response) {
        console.log('submitTalent response:', response.data);

        // add a skills array to the result
        response.data.skills = [];

        // clear the form
        $scope.talentForm = {
          skills: []
        };

        $http.get('/join/' + response.data.talent_id)
          .then(function(response2) {
            console.log('getting talent skills:', response2.data);
            response.data.skills = response2.data;
          });

        // push the response to the array
        $scope.talents.push(response.data);

      });
  };

  // deletes a skill
  $scope.deleteSkill = function(id){
    $http.delete('/skills/' + id).then(function(response){

      // find the element in the skills array to remove it
      var index = -1;
      for(var i = 0; i < $scope.skills.length; i++) {
          if ( $scope.skills[i].skills_id === id) {
              index = i;
              break;
          }
      }
      if (index > -1){
        // remove the element from the array
        $scope.skills.splice(index, 1);
      }

      // now we have to remove it from each talent's list
      $scope.talents.forEach(function(elem){
       index = -1;
        for(var j = 0; j < elem.skills.length; j++) {
            if (elem.skills[j].skills_id === id) {
                index = j;
                break;
            }
        }
        if (index > -1){
          // remove the element from the array
          elem.skills.splice(index, 1);
          index = -1;
        }
      });
    });
  };

  // deletes a talent
  $scope.deleteTalent = function(id){
    $http.delete('/talents/' + id).then(function(response){

      // find the element in the skills array to remove it
      var index = -1;
      for(var i = 0; i < $scope.talents.length; i++) {
          if ( $scope.talents[i].talent_id === id) {
              index = i;
              break;
          }
      }
      if (index > -1){
        // remove the element from the array
        $scope.talents.splice(index, 1);
      }
    });
  };

  // get repeater info
  $http.get('/skills').then(function(response) {
      $scope.skills = response.data;
    });
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
