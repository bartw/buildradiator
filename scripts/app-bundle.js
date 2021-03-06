define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'Teamcity radiator';
      config.map([{ route: 'failed/:baseUrl', name: 'Faled Build Overview', moduleId: 'failed-build-overview' }, { route: 'running/:baseUrl', name: 'Running Build Overview', moduleId: 'running-build-overview' }]);
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('failed-build-overview',['exports', 'services/build-factory', 'aurelia-framework'], function (exports, _buildFactory, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FailedBuildOverview = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var FailedBuildOverview = exports.FailedBuildOverview = (_dec = (0, _aureliaFramework.inject)(_buildFactory.BuildFactory), _dec(_class = function () {
    function FailedBuildOverview(factory) {
      _classCallCheck(this, FailedBuildOverview);

      this.factory = factory;
    }

    FailedBuildOverview.prototype.activate = function activate(params) {
      function setAllFailedBuilds(params) {
        var _this = this;

        this.factory.constructFailedBuildObjects(params.baseUrl).then(function (builds) {
          _this.builds = builds;
        });
      }

      setAllFailedBuilds.bind(this)(params);
      setInterval(setAllFailedBuilds.bind(this), 30000, params);
    };

    return FailedBuildOverview;
  }()) || _class);
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('running-build-overview',['exports', 'services/build-service', 'aurelia-framework'], function (exports, _buildService, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RunningBuildOverview = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var RunningBuildOverview = exports.RunningBuildOverview = (_dec = (0, _aureliaFramework.inject)(_buildService.BuildService), _dec(_class = function () {
    function RunningBuildOverview(buildService) {
      _classCallCheck(this, RunningBuildOverview);

      this.buildService = buildService;
    }

    RunningBuildOverview.prototype.activate = function activate(params) {
      function setAllRunningBuilds(params) {
        var _this = this;

        this.buildService.getAllLatestRunningBuilds(params.baseUrl).then(function (builds) {
          _this.builds = builds;
        });
      }

      setAllRunningBuilds.bind(this)(params);
      setInterval(setAllRunningBuilds.bind(this), 30000, params);
    };

    return RunningBuildOverview;
  }()) || _class);
});
define('elements/build-overview',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BuildOverview = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _desc, _value, _class, _descriptor;

    var BuildOverview = exports.BuildOverview = (_class = function () {
        function BuildOverview() {
            _classCallCheck(this, BuildOverview);

            _initDefineProp(this, 'builds', _descriptor, this);
        }

        BuildOverview.prototype.getBuildStatusCssClass = function getBuildStatusCssClass(build) {
            if (build.status === 'SUCCESS') {
                return 'alert-success';
            }
            if (build.status === 'FAILURE') {
                return 'alert-danger';
            }
            throw new Error('The buildstatus "' + build.status + '" is invalid');
        };

        BuildOverview.prototype.getDrawAttentionCssClass = function getDrawAttentionCssClass(build) {
            if (build.drawAttention === true) {
                return 'draw-attention';
            }
            if (build.drawAttention === false) {
                return '';
            }
            throw new Error('The drawAttention "' + build.drawAttention + '" is invalid');
        };

        return BuildOverview;
    }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'builds', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class);
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/build-factory',['exports', './build-service', 'aurelia-framework'], function (exports, _buildService, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BuildFactory = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var BuildFactory = exports.BuildFactory = (_dec = (0, _aureliaFramework.inject)(_buildService.BuildService), _dec(_class = function () {
        function BuildFactory(buildService) {
            _classCallCheck(this, BuildFactory);

            this.buildService = buildService;
        }

        BuildFactory.prototype.constructFailedBuildObjects = function constructFailedBuildObjects(baseUrl) {
            return Promise.all([this.buildService.getAllFailedBuilds(baseUrl), this.buildService.getAllLatestRunningBuilds(baseUrl)]).then(function (buildArrays) {

                var failedBuilds = buildArrays[0];
                var latestRunningBuilds = buildArrays[1];

                validateFailedBuilds();
                validateRunningBuilds();

                return failedBuilds.map(function (failedBuild) {

                    failedBuild.drawAttention = isNewBuildRunning();
                    return failedBuild;

                    function isNewBuildRunning() {

                        function getCorrespondingBuild() {
                            return latestRunningBuilds.filter(function (latestRunningBuild) {
                                return latestRunningBuild.name === failedBuild.name;
                            })[0];
                        }

                        return getCorrespondingBuild() !== undefined && getCorrespondingBuild().buildNumber > failedBuild.buildNumber;
                    }
                });

                function validateFailedBuilds() {
                    if (duplicateNamesInBuildArray(failedBuilds)) {
                        throw new Error("There are failed builds with the same name. We didn't foresee this to happen. Sorry. Please contact us");
                    }
                }

                function validateRunningBuilds() {
                    if (duplicateNamesInBuildArray(latestRunningBuilds)) {
                        throw new Error("There are running builds with the same name. We didn't foresee this to happen. Sorry. Please contact us");
                    }
                }

                function duplicateNamesInBuildArray(buildArray) {
                    return buildArray.map(function (failedBuild1) {
                        return buildArray.filter(function (failedBuild2) {
                            return failedBuild1.name === failedBuild2.name;
                        }).length;
                    }).filter(function (occurancesOfName) {
                        return occurancesOfName > 1;
                    }).length > 1;
                }
            });
        };

        return BuildFactory;
    }()) || _class);
});
define('services/build-service',['exports', './http-client-router', 'aurelia-framework'], function (exports, _httpClientRouter, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BuildService = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  function fetchBuildArray(clientRouter, url, drawAttention) {
    var init = {
      method: 'GET',
      headers: new Headers({
        'Accept': 'application/json',
        'X-Requested-With': 'Fetch'
      })
    };

    return clientRouter.fetch(url, init).then(function (response) {
      return response.json();
    }).then(function (jsonResponse) {
      return jsonResponse.buildType.filter(function (buildTypeElement) {
        return buildTypeElement.builds.build.length > 0;
      }).map(function (buildTypeElement) {
        return {
          "name": buildTypeElement.name,
          "buildNumber": buildTypeElement.builds.build[0].number,
          "status": buildTypeElement.builds.build[0].status,
          "statusText": buildTypeElement.builds.build[0].statusText,
          "drawAttention": drawAttention
        };
      });
    });
  }

  var BuildService = exports.BuildService = (_dec = (0, _aureliaFramework.inject)(_httpClientRouter.HttpClientRouter), _dec(_class = function () {
    function BuildService(clientRouter) {
      _classCallCheck(this, BuildService);

      this.clientRouter = clientRouter;
    }

    BuildService.prototype.getAllFailedBuilds = function getAllFailedBuilds(baseUrl) {
      var url = 'http://' + baseUrl + '/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:false,canceled:false,count:1),build(number,status,statusText)))';

      return fetchBuildArray(this.clientRouter, url, false).then(function (buildArray) {
        return buildArray.filter(function (build) {
          return build.status === 'FAILURE';
        });
      });
    };

    BuildService.prototype.getAllLatestRunningBuilds = function getAllLatestRunningBuilds(baseUrl) {
      var url = 'http://' + baseUrl + '/guestAuth/app/rest/buildTypes?locator=affectedProject:(id:_Root)&fields=buildType(id,name,builds($locator(running:true,canceled:false,count:1),build(number,status,statusText)))';

      return fetchBuildArray(this.clientRouter, url, true);
    };

    return BuildService;
  }()) || _class);
});
define('services/http-client-router',['exports', 'aurelia-fetch-client', './teamcitystub/team-city-http-client-stub', 'aurelia-framework'], function (exports, _aureliaFetchClient, _teamCityHttpClientStub, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.HttpClientRouter = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var HttpClientRouter = exports.HttpClientRouter = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _teamCityHttpClientStub.TeamCityHttpClientStub), _dec(_class = function () {
        function HttpClientRouter(realHttpClient, teamCityHttpClientStub) {
            _classCallCheck(this, HttpClientRouter);

            this.realHttpClient = realHttpClient;
            this.teamCityHttpClientStub = teamCityHttpClientStub;
        }

        HttpClientRouter.prototype.fetch = function fetch(url, init) {
            return url.includes('stub') ? this.teamCityHttpClientStub.fetch(url) : this.realHttpClient.fetch(url, init);
        };

        return HttpClientRouter;
    }()) || _class);
});
define('services/teamcitystub/team-city-http-client-stub',['exports', './team-city-latest-builds-response', './team-city-latest-running-builds-response'], function (exports, _teamCityLatestBuildsResponse, _teamCityLatestRunningBuildsResponse) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TeamCityHttpClientStub = undefined;

  var _teamCityLatestBuildsResponse2 = _interopRequireDefault(_teamCityLatestBuildsResponse);

  var _teamCityLatestRunningBuildsResponse2 = _interopRequireDefault(_teamCityLatestRunningBuildsResponse);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var TeamCityHttpClientStub = exports.TeamCityHttpClientStub = function () {
    function TeamCityHttpClientStub() {
      _classCallCheck(this, TeamCityHttpClientStub);
    }

    TeamCityHttpClientStub.prototype.fetch = function fetch(url) {
      if (url.includes('running:false')) {
        return Promise.resolve({ json: function json() {
            return _teamCityLatestBuildsResponse2.default;
          } });
      }
      if (url.includes('running:true')) {
        return Promise.resolve({ json: function json() {
            return _teamCityLatestRunningBuildsResponse2.default;
          } });
      }
      throw new Error("team city http client stub doesn't support " + url);
    };

    return TeamCityHttpClientStub;
  }();

  ;
});
define('services/teamcitystub/team-city-latest-builds-response',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    "buildType": [{
      "name": "build 1",
      "builds": {
        "build": [{
          "number": "3.1.70.17327",
          "status": "FAILURE",
          "statusText": "Tests passed: 198, ignored: 9"
        }]
      }
    }, {
      "name": "build 2",
      "builds": {
        "build": [{
          "number": "3.1.6965.17318",
          "status": "SUCCESS",
          "statusText": "Tests passed: 2391, ignored: 6"
        }]
      }
    }, {
      "name": "build 3",
      "builds": {
        "build": [{
          "number": "123",
          "status": "SUCCESS",
          "statusText": "Tests passed: 35"
        }]
      }
    }, {
      "name": "build 4",
      "builds": {
        "build": [{
          "number": "3.1.54.17253",
          "status": "SUCCESS",
          "statusText": "Tests passed: 35"
        }]
      }
    }, {
      "name": "build 5",
      "builds": {
        "build": [{
          "number": "3.1.54.17287",
          "status": "FAILURE",
          "statusText": "Tests failed: 4 (1 new), passed: 31"
        }]
      }
    }, {
      "name": "build 6",
      "builds": {
        "build": [{
          "number": "1.2.54.17287",
          "status": "FAILURE",
          "statusText": "Tests failed: 2, passed: 33; snapshot dependency failed: Main :: Data Quality Tests :: build 6"
        }]
      }
    }, {
      "name": "build 7",
      "builds": {
        "build": [{
          "number": "3.5.54.17287",
          "status": "FAILURE",
          "statusText": "Tests failed: 3, passed: 32; snapshot dependency failed: Main :: Data Quality Tests :: build 7"
        }]
      }
    }, {
      "name": "build 8",
      "builds": {
        "build": [{
          "number": "3.5.87.17287",
          "status": "SUCCESS",
          "statusText": "Tests failed: 8 (1 new), passed: 27; snapshot dependency failed: Main :: Data Quality Tests :: build 8"
        }]
      }
    }, {
      "name": "build 9",
      "builds": {
        "build": [{
          "number": "3.5.99.17287",
          "status": "FAILURE",
          "statusText": "Tests failed: 13, passed: 22; snapshot dependency failed: Main :: Data Quality Tests :: build 9"
        }]
      }
    }, {
      "name": "build 10",
      "builds": {
        "build": [{
          "number": "3.5.99.21",
          "status": "FAILURE",
          "statusText": "Tests failed: 10, passed: 25"
        }]
      }
    }]
  };
});
define('services/teamcitystub/team-city-latest-running-builds-response',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    "buildType": [{
      "name": "build 1",
      "builds": {
        "build": [{
          "number": "3.1.70.17328",
          "status": "SUCCESS",
          "statusText": "Tests passed: 198, ignored: 9"
        }]
      }
    }, {
      "name": "build 25",
      "builds": {
        "build": [{
          "number": "3.1.6965.17318",
          "status": "SUCCESS",
          "statusText": "Tests passed: 2391, ignored: 6"
        }]
      }
    }, {
      "name": "build 3",
      "builds": {
        "build": [{
          "number": "120",
          "status": "FAILURE",
          "statusText": "Tests passed: 35"
        }]
      }
    }, {
      "name": "build 4",
      "builds": {
        "build": [{
          "number": "3.1.54.17255",
          "status": "FAILURE",
          "statusText": "Tests passed: 35"
        }]
      }
    }]
  };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"css/custom.css\"></require>\r\n  <router-view></router-view>\r\n</template>"; });
define('text!css/custom.css', ['module'], function(module) { module.exports = "@keyframes fadeIn { \r\n  from { opacity: 0; } \r\n}\r\n\r\n.draw-attention {\r\n    animation: fadeIn 1s infinite alternate;\r\n}"; });
define('text!failed-build-overview.html', ['module'], function(module) { module.exports = "<template>\r\n\t<require from=\"./elements/build-overview\"></require>\r\n\t<build-overview builds.bind=\"builds\"></build-overview>\r\n</template>"; });
define('text!running-build-overview.html', ['module'], function(module) { module.exports = "<template>\r\n\t<require from=\"./elements/build-overview\"></require>\r\n\t<build-overview builds.bind=\"builds\"></build-overview>\r\n</template>"; });
define('text!elements/build-overview.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n\r\n            <div class=\"col-md-4 text-center\" repeat.for=\"build of builds\">\r\n                <div class=\"${getBuildStatusCssClass(build)} ${getDrawAttentionCssClass(build)} alert\"\r\n                    role=\"alert \">\r\n                    <h1>${build.name}</h1>\r\n                    <p>${build.statusText}</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map