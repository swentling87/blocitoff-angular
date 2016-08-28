(function() {
  function List($firebaseArray) {
    var ref = firebase.database().ref().child("checklists");
    var taskRef = firebase.database().ref().child("tasks").orderByChild('listId');
    var checklists = $firebaseArray(ref);

    var addCheckList = function(newList) {
      checklists.$add({name: newList});
    };

    var findTasks = function(listId) {
      return $firebaseArray(taskRef.equalTo(listId));
    };

    return {
      all: checklists,
      createList: addCheckList,
      taskFinder: findTasks
    };
  }

  angular
    .module('blocitoff')
    .factory('List', ['$firebaseArray', List]);
})();
