(function() {
  function ListCtrl($scope, $uibModal, List, $cookies, Task) {
    $scope.allLists = List.all;
    $scope.activeList = null;

    $scope.open = function() {
      var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/templates/newList.html',
          controller: 'ModalCtrl'
      });

      modalInstance.result.then(function (newList) {
          List.createList(newList);
      })
    }


    $scope.setList = function(list) {
      $scope.activeList = list;
      $scope.listName = list.name;
      $scope.tasks = List.taskFinder(list.$id);
    }

    $scope.tasker = function() {
      var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: '/templates/newTask.html',
          controller: 'ModalCtrl'
      });

      modalInstance.result.then(function(newTask) {
          Task.createTask({
            listId: $scope.activeList.$id,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            title: newTask
          });
      })
    }

  }

  angular
    .module('blocitoff')
    .controller('ListCtrl', ['$scope', '$uibModal', 'List', '$cookies', 'Task', ListCtrl]);
})();
