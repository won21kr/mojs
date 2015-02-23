(function() {
  var MotionPath, coords;

  MotionPath = window.mojs.MotionPath;

  coords = 'M0.55859375,593.527344L0.55859375,593.527344';

  describe('MotionPath ->', function() {
    var ns;
    ns = 'http://www.w3.org/2000/svg';
    describe('enviroment ->', function() {
      it('SVG should be supported', function() {
        var isSVG;
        isSVG = !!(typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg").createSVGRect : void 0);
        return expect(isSVG).toBeTruthy();
      });
      it('SVG path should have getTotalLength method', function() {
        var path;
        path = document.createElementNS(ns, "path");
        return expect(path.getTotalLength).toBeDefined();
      });
      it('SVG path should have getPointAtLength method', function() {
        var path;
        path = document.createElementNS(ns, "path");
        return expect(path.getPointAtLength).toBeDefined();
      });
      it('document.querySelector should be defined', function() {
        return expect(document.querySelector).toBeDefined();
      });
      it('style propety should be defined on DOM node', function() {
        var div, path;
        path = document.createElementNS(ns, "path");
        div = document.createElement('div');
        expect(path.style).toBeDefined();
        return expect(div.style).toBeDefined();
      });
      it('transforms should be supported', function() {
        var isTransforms;
        isTransforms = function() {
          var div, i, isProp, prefixes, trS;
          trS = "transform WebkitTransform MozTransform OTransform msTransform";
          prefixes = trS.split(" ");
          i = 0;
          while (i < prefixes.length) {
            div = document.createElement("div");
            isProp = div.style[prefixes[i]] !== 'undefined';
            if (isProp) {
              return prefixes[i];
            }
            i++;
          }
          return false;
        };
        return expect(isTransforms()).toBeTruthy();
      });
      return it('HTML el should have offsetWidth/offsetHeight propety', function() {
        var div;
        div = document.createElement('div');
        expect(div.offsetWidth).toBeDefined();
        return expect(div.offsetHeight).toBeDefined();
      });
    });
    describe('defaults ->', function() {
      var el, mp;
      el = document.createElement('div');
      mp = new MotionPath({
        path: 'M0.55859375,593.527344L0.55859375,593.527344',
        el: el
      });
      it('delay should be defined', function() {
        return expect(mp.delay).toBeDefined();
      });
      it('resize should be defined', function() {
        return expect(mp.resize).toBeDefined();
      });
      it('duration should be defined', function() {
        return expect(mp.duration).toBeDefined();
      });
      it('offsetX should be defined', function() {
        return expect(mp.offsetX).toBeDefined();
      });
      it('isReverse should be defined', function() {
        return expect(mp.isReverse).toBeDefined();
      });
      it('offsetY should be defined', function() {
        return expect(mp.offsetY).toBeDefined();
      });
      it('isAngle should be defined', function() {
        return expect(mp.isAngle).toBeDefined();
      });
      it('isRunLess should be defined', function() {
        return expect(mp.isRunLess).toBeDefined();
      });
      it('easing should be defined', function() {
        expect(mp.easing).toBeDefined();
        return expect(mp.easings).toBeDefined();
      });
      it('yoyo should be defined', function() {
        return expect(mp.yoyo).toBeDefined();
      });
      return it('repeat should be defined', function() {
        return expect(mp.repeat).toBeDefined();
      });
    });
    describe('run ability ->', function() {
      var div;
      div = document.createElement('div');
      coords = 'M0.55859375,593.527344L0.55859375,593.527344';
      it('should not run with isRunLess option passed', function(dfr) {
        var isDelayed, isStarted, mp;
        isStarted = false;
        isDelayed = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          isRunLess: true,
          duration: 20,
          onStart: function() {
            return isStarted = true;
          }
        });
        return setTimeout((function() {
          expect(isStarted).toBe(false);
          return dfr();
        }), 100);
      });
      return it('should extend defaults', function(dfr) {
        var mp;
        div = document.createElement('div');
        coords = 'M0,0 L500,00';
        mp = new MotionPath({
          path: coords,
          el: div,
          isRunLess: true,
          duration: 50
        });
        mp.run({
          path: 'M0,0 L600,00'
        });
        return setTimeout(function() {
          var pos;
          pos = div.style.transform.split(/(translate\()|\,|\)/)[2];
          pos = parseInt(pos, 10);
          expect(pos).toBe(600);
          return dfr();
        }, 100);
      });
    });
    describe('callbacks ->', function() {
      var div;
      div = document.createElement('div');
      coords = 'M0.55859375,593.527344L0.55859375,593.527344';
      describe('onStart callback ->', function() {
        it('should run on start', function(dfr) {
          var isStarted, mp;
          isStarted = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 64,
            onStart: function() {
              return isStarted = true;
            }
          });
          return setTimeout((function() {
            expect(isStarted).toBe(true);
            return dfr();
          }), 100);
        });
        return it('should have the scope of MotionPath', function(dfr) {
          var isRightScope, mp;
          isRightScope = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            onStart: function() {
              return isRightScope = this instanceof MotionPath;
            }
          });
          return setTimeout((function() {
            expect(isRightScope).toBe(true);
            return dfr();
          }), 100);
        });
      });
      describe('onComplete callback ->', function() {
        it('onComplete callback should work', function(dfr) {
          var isCompleted, mp;
          isCompleted = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 5,
            onComplete: function() {
              return isCompleted = true;
            }
          });
          return setTimeout(function() {
            expect(isCompleted).toBe(true);
            return dfr();
          }, 100);
        });
        return it('should have the scope of MotionPath', function(dfr) {
          var isRightScope, mp;
          isRightScope = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 5,
            onComplete: function() {
              return isRightScope = this instanceof MotionPath;
            }
          });
          return setTimeout(function() {
            expect(isRightScope).toBe(true);
            return dfr();
          }, 100);
        });
      });
      return describe('onUpdate callback ->', function() {
        it('onUpdate callback should work', function(dfr) {
          var isOnUpdate, mp;
          isOnUpdate = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 5,
            onUpdate: function() {
              return isOnUpdate = true;
            }
          });
          return setTimeout(function() {
            expect(isOnUpdate).toBe(true);
            return dfr();
          }, 100);
        });
        it('onUpdate callback should have "progress" argument', function(dfr) {
          var isOnUpdate, mp;
          isOnUpdate = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 5,
            onUpdate: function(progress) {
              if (progress != null) {
                return isOnUpdate = true;
              }
            }
          });
          return setTimeout(function() {
            expect(isOnUpdate).toBe(true);
            return dfr();
          }, 100);
        });
        return it('should have the scope of MotionPath', function(dfr) {
          var isRightScope, mp;
          isRightScope = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 5,
            onUpdate: function() {
              return isRightScope = this instanceof MotionPath;
            }
          });
          return setTimeout(function() {
            expect(isRightScope).toBe(true);
            return dfr();
          }, 100);
        });
      });
    });
    describe('fill ->', function() {
      var container, div;
      div = null;
      container = null;
      beforeEach(function() {
        var size;
        container = document.createElement('div');
        div = document.createElement('div');
        size = 200;
        container.style.width = "" + size + "px";
        container.style.height = "" + size + "px";
        container.style.position = 'absolute';
        container.style.top = '-100%';
        container.setAttribute('id', 'js-container');
        return document.body.appendChild(container);
      });
      it('container could be specified by selector or DOM node', function() {
        var mp;
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: div,
          fill: {
            container: '#js-container'
          }
        });
        return expect(mp.container instanceof HTMLElement).toBe(true);
      });
      it('if fill is specified it should have container, fillRule, cSize', function() {
        var mp;
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: div,
          fill: {
            container: container
          }
        });
        expect(mp.container).toBeDefined();
        expect(mp.fillRule).toBeDefined();
        return expect(mp.cSize).toBeDefined();
      });
      it('if fillRule is "all" it should keep container\'s size', function(dfr) {
        var isFilled, motionPath;
        isFilled = false;
        motionPath = new MotionPath({
          path: 'M0,0 L500,500',
          el: div,
          duration: 64,
          fill: {
            container: container
          },
          all: true,
          isIt: true,
          onComplete: function() {
            var args, height, isHeight, isWidth, width;
            args = motionPath.el.style.transform.split(/(translate\()|\,|\)/);
            width = parseInt(args[2], 10);
            height = parseInt(args[4], 10);
            isWidth = width === container.offsetWidth;
            isHeight = height === container.offsetHeight;
            return isFilled = isWidth && isHeight;
          }
        });
        return setTimeout((function() {
          expect(isFilled).toBe(true);
          return dfr();
        }), 100);
      });
      it("if fillRule is \"width\" it should keep container\'s width and set \"height\" with aspect ratio", function(dfr) {
        var isFilled, mp;
        isFilled = false;
        mp = new MotionPath({
          path: 'M0,0 L500,250',
          el: div,
          duration: 50,
          fill: {
            container: container,
            fillRule: 'width'
          },
          all: true,
          onComplete: function() {
            var args, height, isHeight, isWidth, width;
            args = mp.el.style.transform.split(/(translate\()|\,|\)/);
            width = parseInt(args[2], 10);
            height = parseInt(args[4], 10);
            isWidth = width === container.offsetWidth;
            isHeight = height === (width / 2);
            return isFilled = isWidth && isHeight;
          }
        });
        return setTimeout(function() {
          expect(isFilled).toBe(true);
          return dfr();
        }, 100);
      });
      it("if fillRule is \"height\" it should keep container\'s height and set \"width\" with aspect ratio", function(dfr) {
        var isFilled, mp;
        isFilled = false;
        mp = new MotionPath({
          path: 'M0,0 L250,500',
          el: div,
          duration: 50,
          fill: {
            container: container,
            fillRule: 'height'
          },
          onComplete: function() {
            var args, height, isHeight, isWidth, width;
            args = mp.el.style.transform.split(/(translate\()|\,|\)/);
            width = parseInt(args[2], 10);
            height = parseInt(args[4], 10);
            isWidth = width === (height / 2);
            isHeight = height === container.offsetHeight;
            return isFilled = isWidth && isHeight;
          }
        });
        return setTimeout(function() {
          expect(isFilled).toBe(true);
          return dfr();
        }, 100);
      });
      return it('if container size was changed should recalc scaler', function(dfr) {
        var c, el, isSizeChange, mp, size, x;
        isSizeChange = false;
        el = document.createElement('div');
        c = document.createElement('div');
        size = 200;
        c.style.width = "" + size + "px";
        c.style.height = "" + size + "px";
        c.style.position = 'absolute';
        c.style.top = '-100%';
        c.setAttribute('id', 'js-container2');
        document.body.appendChild(c);
        x = -1;
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: el,
          duration: 50,
          fill: {
            container: c
          },
          onUpdate: function(proc) {
            if (proc >= .1 && !isSizeChange) {
              mp.container.style.width = '100px';
              return isSizeChange = true;
            }
          },
          onComplete: function() {
            return x = mp.el.style.transform.split(/(translate\()|\,|\)/)[2];
          }
        });
        return setTimeout(function() {
          expect(parseInt(x, 10)).toBe(100);
          return dfr();
        }, 100);
      });
    });
    describe('functionality ->', function() {
      var div;
      div = document.createElement('div');
      coords = 'M0.55859375,593.527344L0.55859375,593.527344';
      describe('angleOffset ->', function() {
        it('angleOffset should work with positive angles', function(dfr) {
          var isEqual, mp;
          coords = 'M0,0 L10,0 L10,10';
          isEqual = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 50,
            angleOffset: 90,
            isAngle: true,
            onComplete: function() {
              return isEqual = mp.angle === 180;
            }
          });
          return setTimeout((function() {
            expect(isEqual).toBe(true);
            return dfr();
          }), 100);
        });
        it('angleOffset should work with negative angles', function(dfr) {
          var isEqual, mp;
          coords = 'M0,0 L10,0 L10,10';
          isEqual = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 50,
            angleOffset: -90,
            isAngle: true,
            onComplete: function() {
              return isEqual = mp.angle === 0;
            }
          });
          return setTimeout((function() {
            expect(isEqual).toBe(true);
            return dfr();
          }), 100);
        });
        it('should be evaluated if a function', function(dfr) {
          var isFunction, mp;
          coords = 'M0,0 L10,0 L10,10';
          isFunction = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 50,
            angleOffset: function(angle) {
              isFunction = true;
              return angle;
            }
          });
          return setTimeout((function() {
            expect(isFunction).toBe(true);
            return dfr();
          }), 100);
        });
        it('should get current angle', function(dfr) {
          var angleSum1, angleSum2, isOnAngle, mp;
          coords = 'M0,0 L10,0 L10,10';
          isOnAngle = false;
          angleSum1 = 0;
          angleSum2 = 0;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 50,
            isAngle: true,
            angleOffset: function(angle) {
              angleSum1 += angle;
              angleSum2 += mp.angle;
              return angle;
            },
            onComplete: function() {
              return isOnAngle = angleSum1 === angleSum2;
            }
          });
          return setTimeout((function() {
            expect(isOnAngle).toBe(true);
            return dfr();
          }), 100);
        });
        it('should set current angle', function(dfr) {
          var angleShift, currAngle, isAnglesArray, isSet, mp;
          coords = 'M0,0 L10,0 L10,10';
          isSet = false;
          currAngle = 0;
          isAnglesArray = [];
          angleShift = 5;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 50,
            angleOffset: function(angle) {
              currAngle = angle;
              return angle + angleShift;
            },
            onUpdate: function() {
              return isAnglesArray.push(currAngle + angleShift === mp.angle);
            },
            onComplete: function() {
              var i, isSetItem, _i, _len, _results;
              _results = [];
              for (i = _i = 0, _len = isAnglesArray.length; _i < _len; i = ++_i) {
                isSetItem = isAnglesArray[i];
                if (!isSetItem) {
                  _results.push(isSet = true);
                } else {
                  _results.push(void 0);
                }
              }
              return _results;
            }
          });
          return setTimeout((function() {
            expect(isSet).toBe(false);
            return dfr();
          }), 100);
        });
        it('angleOffset should get current progress as second parameter', function(dfr) {
          var isProgress, mp, proc;
          coords = 'M0,0 L10,0 L10,10';
          isProgress = false;
          proc = -1;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 50,
            angleOffset: function(angle, progress) {
              proc = progress;
              return angle;
            },
            onComplete: function() {
              return isProgress = proc === 1;
            }
          });
          return setTimeout((function() {
            expect(isProgress).toBe(true);
            return dfr();
          }), 100);
        });
        return it('should work with positive offsetX', function(dfr) {
          var isEqual, mp, x;
          coords = 'M0,0 L0,10';
          x = 0;
          isEqual = false;
          return mp = new MotionPath({
            path: coords,
            el: div,
            offsetX: 10,
            duration: 50,
            isAngle: true,
            onComplete: function() {
              x = div.style.transform.split(/(translate\()|,|\)/)[2];
              return isEqual = parseInt(x, 10) === 10;
            }
          }, setTimeout((function() {
            expect(isEqual).toBe(true);
            return dfr();
          }), 100));
        });
      });
      it('should work with negative offsetX', function(dfr) {
        var isEqual, mp, x;
        coords = 'M0,0 L0,10';
        x = 0;
        isEqual = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          offsetX: -10,
          duration: 50,
          onComplete: function() {
            x = div.style.transform.split(/(translate\()|,|\)/)[2];
            x = parseInt(x, 10);
            return isEqual = x === -10;
          }
        });
        return setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 100);
      });
      it('should work with positive offsetY', function(dfr) {
        var isEqual, mp, y;
        coords = 'M0,0 L10,0';
        y = 0;
        isEqual = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          offsetY: 10,
          duration: 50,
          onComplete: function() {
            y = div.style.transform.split(/(translate\()|,|\)/)[4];
            y = parseInt(y, 10);
            return isEqual = y === 10;
          }
        });
        return setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 100);
      });
      it('should work with negative offsetY', function(dfr) {
        var isEqual, mp, y;
        coords = 'M0,0 L10,0';
        y = 0;
        isEqual = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          offsetY: -10,
          duration: 50,
          onComplete: function() {
            y = div.style.transform.split(/(translate\()|,|\)/)[4];
            return isEqual = parseInt(y, 10) === -10;
          }
        });
        return setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 100);
      });
      it('should calculate current angle', function(dfr) {
        var angle, detect, isEqual, isEquial2, mp;
        coords = 'M0,0 L10,0 L10,10';
        angle = 0;
        isEqual = false;
        isEquial2 = false;
        detect = {};
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 50,
          isAngle: true,
          onUpdate: function() {
            if (detect.firstAngle == null) {
              detect.firstAngle = mp.angle;
            }
            return isEquial2 = detect.firstAngle === 0;
          },
          onComplete: function() {
            return isEqual = mp.angle === 90;
          }
        });
        return setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 100);
      });
      it('should calculate current angle with isReverse', function(dfr) {
        var angle, detect, isEqual, isEquial2, mp;
        coords = 'M0,0 L10,0 L10,10';
        angle = 0;
        isEqual = false;
        isEquial2 = false;
        detect = {};
        return mp = new MotionPath({
          path: coords,
          el: div,
          duration: 50,
          isAngle: true,
          isReverse: true,
          onUpdate: function() {
            if (detect.firstAngle == null) {
              detect.firstAngle = mp.angle;
            }
            return isEquial2 = detect.firstAngle === 90;
          },
          onComplete: function() {
            return isEqual = mp.angle === 0;
          }
        }, setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 100));
      });
      it('should have transform-origin', function(dfr) {
        var isComplete, mp;
        coords = 'M0,0 L10,0 L10,10';
        isComplete = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 50,
          transformOrigin: '50% 50%',
          onComplete: function() {
            return isComplete = true;
          }
        });
        return setTimeout(function() {
          expect(mp.el.style.transformOrigin.length >= 1).toBe(true);
          return dfr();
        }, 100);
      });
      return it('transform-origin could be a function', function(dfr) {
        var isAngle, isProgress, mp;
        coords = 'M0,0 L10,0 L10,10';
        isAngle = false;
        isProgress = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 50,
          transformOrigin: function(angle, proc) {
            var isFunction;
            isFunction = true;
            isAngle = angle != null;
            isProgress = proc != null;
            return '50% 50%';
          }
        });
        return setTimeout((function() {
          expect(isAngle && isProgress).toBe(true);
          return dfr();
        }), 100);
      });
    });
    describe('setProgress function ->', function(dfr) {
      return it('should have own function for setting up current progress', function() {
        var div, mp, pos;
        div = document.createElement('div');
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: div,
          isRunLess: true
        });
        mp.setProgress(.5);
        pos = parseInt(div.style.transform.split(/(translate\()|\,|\)/)[2], 10);
        return expect(pos).toBe(250);
      });
    });
    describe('preset position ->', function() {
      it('should preset initial position by default if isRunLess', function() {
        var div, mp, pos;
        div = document.createElement('div');
        mp = new MotionPath({
          path: 'M50,0 L500,0',
          el: div,
          isRunLess: true
        });
        pos = parseInt(div.style.transform.split(/(translate\()|\,|\)/)[2], 10);
        return expect(pos).toBe(50);
      });
      return it('should not set initial position if isPresetPosition is false', function() {
        var div, mp, pos;
        div = document.createElement('div');
        mp = new MotionPath({
          path: 'M50,0 L500,0',
          el: div,
          isRunLess: true,
          isPresetPosition: false
        });
        pos = parseInt(div.style.transform.split(/(translate\()|\,|\)/)[2], 10);
        return expect(pos).toBe(50);
      });
    });
    describe('progress bounds ->', function() {
      it('should start from pathStart position', function() {
        var div, mp, pos;
        div = document.createElement('div');
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: div,
          isRunLess: true,
          pathStart: .5
        });
        pos = parseInt(div.style.transform.split(/(translate\()|\,|\)/)[2], 10);
        return expect(pos).toBe(250);
      });
      return it('should end at pathEnd position', function(dfr) {
        var div, mp, pos;
        div = document.createElement('div');
        pos = -1;
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: div,
          duration: 50,
          pathEnd: .5,
          onComplete: function() {
            pos = div.style.transform.split(/(translate\()|\,|\)/)[2];
            return pos = parseInt(pos, 10);
          }
        });
        return setTimeout((function() {
          expect(pos).toBe(250);
          return dfr();
        }), 100);
      });
    });
    describe('path option ->', function() {
      it('should have a getPath method', function() {
        var div, mp;
        div = document.createElement('div');
        mp = new MotionPath({
          path: coords,
          el: div
        });
        return expect(mp.getPath).toBeDefined();
      });
      it('getPath should return a path when was specified by coordinates', function() {
        var div, mp;
        div = document.createElement('div');
        mp = new MotionPath({
          path: coords,
          el: div
        });
        return expect(mp.getPath() instanceof SVGElement).toBe(true);
      });
      it('getPath should return a path when it was specified by SVG path', function() {
        var div, mp, path;
        path = document.createElementNS(ns, 'path');
        div = document.createElement('div');
        mp = new MotionPath({
          path: path,
          el: div
        });
        return expect(mp.getPath() instanceof SVGElement).toBe(true);
      });
      return it('getPath should return a path when it was specified selector', function() {
        var div, id, mp, path, svg;
        id = 'js-path';
        div = document.createElement('div');
        svg = document.createElementNS(ns, 'svg');
        path = document.createElementNS(ns, 'path');
        path.setAttribute('id', id);
        path.setAttribute('class', id);
        svg.appendChild(path);
        document.body.appendChild(svg);
        mp = new MotionPath({
          path: "#" + id,
          el: div
        });
        expect(mp.getPath() instanceof SVGElement).toBe(true);
        mp = new MotionPath({
          path: "." + id,
          el: div
        });
        return expect(mp.getPath() instanceof SVGElement).toBe(true);
      });
    });
    return describe('el option ->', function() {
      it('should return an el when it was specified by selector', function() {
        var div, id, mp;
        id = 'js-el';
        div = document.createElement('div');
        div.setAttribute('id', id);
        div.setAttribute('class', id);
        document.body.appendChild(div);
        mp = new MotionPath({
          path: coords,
          el: "#" + id
        });
        expect(mp.el instanceof HTMLElement).toBe(true);
        mp = new MotionPath({
          path: coords,
          el: "." + id
        });
        return expect(mp.el instanceof HTMLElement).toBe(true);
      });
      return it('getPath should return an el when an element was passed', function() {
        var div, mp;
        div = document.createElement('div');
        mp = new MotionPath({
          path: coords,
          el: div
        });
        return expect(mp.el instanceof HTMLElement).toBe(true);
      });
    });
  });

}).call(this);
