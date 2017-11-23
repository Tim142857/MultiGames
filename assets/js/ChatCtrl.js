var chat = angular.module('chat', []);
chat.controller('chatCtrl', ['$sce', '$scope',
  function ($sce, $scope) {

    $scope.messageToSend = "";
    $scope.messagesHistory = "";
    $scope.pseudoDefined = false;
    $scope.pseudo = "";
    $scope.messageType = "text";
    $scope.messages = [];

    $scope.formChatSubmit = function () {
      console.log($scope.messageType);
      io.socket.get('/send-message', {
        message: $scope.messageToSend,
        pseudo: $scope.pseudo,
        type: $scope.messageType
      }, function (resData, jwres) {
        if (resData) {
          $scope.messageToSend = "";
          $scope.$digest();
        } else {
          alert('Un souci est apparu, veuillez réessayer plus tard');
        }
      });
    }

    $scope.formPseudoSubmit = function () {
      $scope.pseudoDefined = true;
      io.socket.get('/new-chatter', {pseudo: $scope.pseudo}, function (resData, jwres) {
      });
    }

    io.socket.on('new-message', function (data) {
      $scope.messages.push({pseudo: data.pseudo, message: data.message, type: data.type, date: $scope.getDate()});
      $scope.$digest();
      $('#messages-history').animate({
        scrollTop: $('#messages-history').get(0).scrollHeight
      }, 1500);
    });

    io.socket.on('new-chatter', function (data) {
      console.log(data);
      $scope.messages.push({pseudo: data.pseudo, message: data.message, type: data.type, date: $scope.getDate()});
      $scope.$digest();
    });

    $scope.getDate = function () {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();

      if (dd < 10) {
        dd = '0' + dd
      }

      if (mm < 10) {
        mm = '0' + mm
      }

      today = dd + '/' + mm;
      return today + " " + new Date().toLocaleTimeString();
    }

  }
]);
