var arrows = angular.module('arrows', []);
arrows.controller('arrowsCtrl', ['$scope',
  function ($scope) {
    $scope.paramTime = 30;
    $scope.src = "";
    $scope.reverse = false;
    $scope.score = 0;
    $scope.chrono = $scope.paramTime;
    $scope.gameStarted = false;
    $scope.showEndGame = false;
    $scope.newRecord = false;
    $scope.pseudoRecord = "";
    $scope.fleches = ["fleche-gauche.png", "fleche-droite.png", "fleche-bas.jpg", "fleche-haut.jpg"];

    $scope.startGame = function () {
      $scope.score = 0;
      $scope.chrono = $scope.paramTime;
      $scope.newRecord = false;
      $scope.reverse = false;
      $scope.gameStarted = true;
      $scope.showEndGame = false;
      $scope.newArrow();
      $scope.startChrono();
    }

    $scope.getBackground = function () {
      return $scope.reverse ? 'bg-red' : 'bg-white';
    }

    $scope.getRandomSrc = function () {
      var index = Math.floor((Math.random() * $scope.fleches.length));
      return $scope.fleches[index];
    }

    $scope.getRandomSens = function () {
      return new Date().getTime() % 2 == 0;
    }

    $scope.startChrono = function () {
      setInterval(function () {
        $scope.chrono--;
        $scope.$digest();
      }, 1000);

      setTimeout(function () {
        $scope.endGame();
      }, $scope.paramTime * 1000);

    }

    $scope.newArrow = function () {
      $scope.src = $scope.getRandomSrc();
      $scope.reverse = $scope.getRandomSens();
    }

    $('body').on("keydown", function (e) {
      var answer;
      //Define the good answer
      switch ($scope.src) {
        case "fleche-gauche.png":
          answer = $scope.reverse ? 39 : 37;
          break;
        case "fleche-droite.png":
          answer = $scope.reverse ? 37 : 39;
          break;
        case "fleche-bas.jpg":
          answer = $scope.reverse ? 38 : 40;
          break;
        case "fleche-haut.jpg":
          answer = $scope.reverse ? 40 : 38;
          break;
        default:
          return false;
          break;
      }
      if (e.keyCode == answer) {
        $scope.score++;
      } else {
        $scope.score -= 5;
      }
      if ($scope.score < 0) {
        $scope.score = 0;
      }

      if ($scope.gameStarted) {
        $scope.newArrow();
      }
      $scope.$digest();
    });

    $scope.endGame = function () {
      $scope.showEndGame = true;
      $scope.gameStarted = false;
      io.socket.get('/check-new-record', {score: $scope.score}, function (resData, jwres) {
        console.log(resData);
        if (resData.newRecord) {
          $scope.newRecord = true;
        }
      });
      $scope.$digest();
    }

    $scope.submitNewRecord = function () {
      io.socket.get('/insert-new-record', {
        game: 'arrows',
        pseudo: $scope.pseudoRecord,
        score: $scope.score
      }, function (resData, jwres) {
        $scope.newRecord = true;
        $scope.gameStarted = false;
      });
    }


  }
]);
