var app = angular.module('myApp', ['checklist-model']);

app.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
  // set up forms
  $scope.skillForm = {};
  $scope.talentForm = {
    skills: []
  };

  // set up repeaters
  $scope.skills = [];
  $scope.talents = [];

  // hide/show forms
  $scope.toggleTalentForm = function() {
    $scope.showTalentForm = !$scope.showTalentForm;
  };
  $scope.toggleSkillForm = function() {
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

        // push the response to the array
        // Note:  Objects and arrays are pushed by reference
        // so updating response.data updates $scope.talents last entry
        $scope.talents.push(response.data);

        // Copy the skills so we can add them async, and still clear the form ok
        var skillsToAdd = angular.copy($scope.talentForm.skills);

        // clear the form
        $scope.talentForm = {
          skills: []
        };

        // Now, go add the skills!
        skillsToAdd.forEach(function(elem) {
          // $scope.talent.length -1 will be the ID of the last talent (just added)
          $http.post('/join/' + response.data.talent_id + '/' + elem)
            .then(function(newResponse) {
              console.log('submitTalent skill response:', newResponse);
              // go add the result to the talent
              response.data.skills.push(newResponse.data);
            });
        });
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
