(function() {
  function ListCtrl($scope, $uibModal, List, $cookies, Task) {
    $scope.allLists = List.all;
    $scope.activeList = null;
    $scope.currentTime = new Date().getTime();

    var seven_days = 604800000;
    var one_day = 86400000;

    $scope.timeLeft = function(task) {
      var currentTime = new Date().getTime();
      return Math.floor((((task.createdAt + seven_days) - currentTime) / one_day))

    }

    $scope.expired = function(task) {
      var currentTime = new Date().getTime();
      return ( ((task.createdAt + seven_days) - currentTime) <= 0 )
    }

    $scope.completed = function(task) {
      return task.completed == true
    }

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
        $scope.taskTitle = newTask.task;
        $scope.taskPriority = newTask.priority;
          Task.createTask({
            listId: $scope.activeList.$id,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            title: $scope.taskTitle,
            completed: false,
            priority: $scope.taskPriority
          });
      })
    }

  }

  angular
    .module('blocitoff')
    .controller('ListCtrl', ['$scope', '$uibModal', 'List', '$cookies', 'Task', ListCtrl]);
})();
