angular.module('app', [])
  .controller('CorelationController', function ($http, $scope) {
    var self = this
    self.list = []
    self.get = function () {
      var data = {}

      if (self.A) {
        data.A = self.A
      }

      if (self.B) {
        data.B = self.B
      }

      if (self.C) {
        data.C = self.C
      }

      if (self.step) {
        data.step = self.step
      }

      if (self.xFrom) {
        data.xFrom = self.xFrom
      }

      if (self.xTo) {
        data.xTo = self.xTo
      }

      if (self.rndFrom) {
        data.rndFrom = self.rndFrom
      }

      if (self.rndTo) {
        data.rndTo = self.rndTo
      }

      $http({
        url: '/api/parabolaData',
        method: 'GET',
        params: data
      })
      .success(function (result) {
        if (result.error) {
          app.Message('error', 'Error', result.data.msg)
          return
        }

        self.list = result.data.list
        app.Message('success', 'Success', 'get getCorelation')
      })
      .error(function () {
        app.Log('error', arguments)
      })
    }
  })
