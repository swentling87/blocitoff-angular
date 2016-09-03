(function() {
  function ModalCtrl($scope, $uibModalInstance){
    $scope.text = "";

    $scope.ok = function(){
        $uibModalInstance.close({'task': $scope.text, 'priority': $scope.priority.selectedOption.setting});
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.priority = {
      availableOptions: [
        {id: '1', setting: 'High'},
        {id: '2', setting: 'Medium'},
        {id: '3', setting: 'Low'}
      ],
      selectedOption: {id: '3', setting: 'Low'} //This sets the default value of the select in the ui
      };
  }

  angular
    .module('blocitoff')
    .controller('ModalCtrl', ['$scope', '$uibModalInstance', ModalCtrl])
})();
