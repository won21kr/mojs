h  = mojs.helpers

describe 'Helpers ->', ->
  it 'should have logBadgeCss', ->
    expect(h.logBadgeCss).toBeDefined()
  it 'should have RAD_TO_DEG CONSTANT', ->
    expect(h.RAD_TO_DEG).toBe 180/Math.PI
  it 'should have remBase', ->
    expect(typeof h.remBase).toBe 'number'
  describe 'prefix', ->
    it 'should have prefix', ->
      expect(h.prefix).toBeDefined()
      expect(h.prefix.js).toBeDefined()
      expect(h.prefix.css).toBeDefined()
      expect(h.prefix.lowercase).toBeDefined()
      expect(h.prefix.dom).toBeDefined()
  describe 'browsers detection', ->
    it 'should have browsers flag', ->
      expect(h.isFF).toBeDefined()
      expect(h.isIE).toBeDefined()
      expect(h.isOldOpera).toBeDefined()
  describe 'tween related map ->', ->
    it 'should be a map of tween related options ->', ->
      expect(h.chainOptionMap.duration)         .toBe 1
      expect(h.chainOptionMap.delay)            .toBe 1
      expect(h.chainOptionMap.repeat)           .toBe 1
      expect(h.chainOptionMap.easing)           .toBe 1
      expect(h.chainOptionMap.yoyo)             .toBe 1
      expect(h.chainOptionMap.onStart)          .toBe 1
      expect(h.chainOptionMap.onComplete)       .toBe 1
      expect(h.chainOptionMap.onCompleteChain)  .toBe 1
      expect(h.chainOptionMap.onUpdate)         .toBe 1
      expect(h.chainOptionMap.points)           .toBe 1
      mapLen = Object.keys(h.chainOptionMap).length
      expect(mapLen)                            .toBe 10
  describe 'pure tween props ->', ->
    it 'should be a map of tween related options ->', ->
      expect(h.tweenOptionMap.duration)           .toBe 1
      expect(h.tweenOptionMap.delay)              .toBe 1
      expect(h.tweenOptionMap.repeat)             .toBe 1
      expect(h.tweenOptionMap.easing)             .toBe 1
      expect(h.tweenOptionMap.yoyo)               .toBe 1
      expect(Object.keys(h.tweenOptionMap).length).toBe 5
  describe 'methods ->', ->
    describe 'extend method', ->
      it 'should extend object by other one', ->
        obj1 = a: 1
        obj2 = b: 1
        h.extend(obj1, obj2)
        expect(obj1.a).toBe 1
        expect(obj1.b).toBe 1
        expect(obj2.a).not.toBeDefined()
        expect(obj2.b).toBe 1


    describe 'parseRand method', ->
      it 'should get random number from string', ->
        rand = h.parseRand 'rand(10,20)'
        expect(typeof rand).toBe 'number'
        expect(rand).toBeGreaterThan 9
        expect(rand).not.toBeGreaterThan 20
      it 'should get random number with units', ->
        rand = h.parseRand 'rand(10%,20%)'
        expect(parseFloat rand).toBeGreaterThan      9
        expect(parseFloat rand).not.toBeGreaterThan  20
        expect(rand.match(/\%/)).toBeTruthy()

    describe 'parseIfRand method', ->
      it 'should get random number from string if it is rand', ->
        rand = h.parseIfRand 'rand(10,20)'
        expect(typeof rand).toBe 'number'
        expect(rand).toBeGreaterThan 9
        expect(rand).not.toBeGreaterThan 20
      it 'should return the value if it is not a string', ->
        rand = h.parseIfRand 20
        expect(typeof rand).toBe 'number'
        expect(rand).toBe 20

    describe 'rand method', ->
      it 'should return random digit form range', ->
        expect(h.rand(10, 20)).toBeGreaterThan      9
        expect(h.rand(10, 20)).not.toBeGreaterThan  20
      it 'should work with negative numbers', ->
        expect(h.rand(-10, -20)).toBeGreaterThan      -20
        expect(h.rand(-10, -20)).not.toBeGreaterThan  -10
      it 'should work with mixed numbers', ->
        expect(h.rand(-10, 20)).toBeGreaterThan      -10
        expect(h.rand(-10, 20)).not.toBeGreaterThan  20
      it 'should work with float numbers', ->
        expect(h.rand(.2, .9)).toBeGreaterThan      .1
        expect(h.rand(.2, .9)).not.toBeGreaterThan  .9
    describe 'getDelta method', ->
      describe 'numeric values ->', ->
        it 'should calculate delta', ->
          delta = h.parseDelta 'radius', {25: 75}
          expect(delta.start)   .toBe   25
          expect(delta.delta)   .toBe   50
          expect(delta.type)    .toBe   'number'
        it 'should calculate delta with string arguments', ->
          delta = h.parseDelta 'radius', {25: 75}
          expect(delta.start)   .toBe   25
          expect(delta.delta)   .toBe   50
        it 'should calculate delta with float arguments', ->
          delta = h.parseDelta 'radius',  {'25.50': 75.50}
          expect(delta.start)   .toBe   25.5
          expect(delta.delta)   .toBe   50
        it 'should calculate delta with negative start arguments', ->
          delta = h.parseDelta 'radius',  {'-25.50': 75.50}
          expect(delta.start)   .toBe   -25.5
          expect(delta.delta)   .toBe   101
        it 'should calculate delta with negative end arguments', ->
          delta = h.parseDelta 'radius',  {'25.50': -75.50}
          expect(delta.start)   .toBe   25.5
          expect(delta.end)     .toBe   -75.5
          expect(delta.delta)   .toBe   -101
      describe 'color values ->', ->
        it 'should calculate color delta', ->
          delta = h.parseDelta 'stroke',  {'#000': 'rgb(255,255,255)'}
          expect(delta.start.r)    .toBe   0
          expect(delta.end.r)      .toBe   255
          expect(delta.delta.r)    .toBe   255
          expect(delta.type)       .toBe   'color'
        it 'should ignore stroke-linecap prop, use start prop and warn', ->
          spyOn console, 'warn'
          delta = h.parseDelta 'strokeLinecap', {'round': 'butt'}
          expect(-> h.parseDelta 'strokeLinecap', {'round': 'butt'})
            .not.toThrow()
          expect(console.warn).toHaveBeenCalled()
          expect(delta.type).not.toBeDefined()
      describe 'array values ->', ->
        it 'should calculate array delta', ->
          delta = h.parseDelta 'strokeDasharray', { '200 100': '300' }
          expect(delta.start.join(' ')).toBe   '200 100'
          expect(delta.end.join(' '))  .toBe   '300 0'
          expect(delta.delta.join(' ')).toBe   '100 -100'
          expect(delta.type)           .toBe   'array'
      describe 'unit values ->', ->
        it 'should calculate unit delta', ->
          delta = h.parseDelta 'x', {'0%': '100%'}
          expect(delta.start.string)    .toBe   '0%'
          expect(delta.end.string)      .toBe   '100%'
          expect(delta.delta)           .toBe   100
          expect(delta.type)            .toBe   'unit'
      describe 'tween-related values ->', ->
        it 'should not calc delta for tween related props', ->
          delta = h.parseDelta 'duration', {'2000': 1000}
          expect(delta.type).not.toBeDefined()
      describe 'rand values ->', ->
        it 'should calculate unit delta', ->
          delta = h.parseDelta 'x', { 'rand(2, 20)': 'rand(0, 5)' }
          expect(delta.start.value).toBeGreaterThan     -1
          expect(delta.start.value).not.toBeGreaterThan 20
          expect(delta.end.value).toBeGreaterThan     -1
          expect(delta.end.value).not.toBeGreaterThan 5

    describe 'computedStyle method', ->
      it 'should return computed styles',->
        document.body.style['fontSize'] = '10px'
        expect(h.computedStyle(document.body).fontSize).toBe '10px'
      it 'should call getComputedStyle under the hood',->
        spyOn window, 'getComputedStyle'
        h.computedStyle(document.body)
        expect(window.getComputedStyle).toHaveBeenCalled()
    describe 'getRemBase method', ->
      it 'should return remBase', ->
        expect(h.getRemBase()).toBeDefined()
        expect(typeof h.getRemBase()).toBe 'number'
      it 'should set remBase to h', ->
        h.getRemBase()
        expect(h.remBase).toBe 16
    describe 'logging methods', ->
      describe 'prepareForLog method', ->
        it 'should prepare for arguments for logging', ->
          prepared = h.prepareForLog [ 'message' ]
          expect(prepared[0]).toBe '%cmo·js%c'
          expect(prepared[1]).toBe h.logBadgeCss
          expect(prepared[2]).toBe '::'
          expect(prepared[3]).toBe 'message'
      describe 'log method', ->
        it 'should log to console',->
          spyOn console, 'log'
          h.log 'something'
          expect(console.log).toHaveBeenCalled()
        it 'should prepend mojs badge to message',->
          spyOn console, 'log'
          h.log 'smth'
          expect(console.log)
            .toHaveBeenCalledWith '%cmo·js%c', h.logBadgeCss, '::', 'smth'
      describe 'warn method', ->
        it 'should warn to console',->
          spyOn console, 'warn'
          h.warn 'something'
          expect(console.warn).toHaveBeenCalled()
        it 'should prepend mojs badge to message',->
          spyOn console, 'warn'
          h.warn 'smth'
          expect(console.warn)
            .toHaveBeenCalledWith '%cmo·js%c', h.logBadgeCss, '::', 'smth'
      describe 'error method', ->
        it 'should error to console',->
          spyOn console, 'error'
          h.error 'something'
          expect(console.error).toHaveBeenCalled()
        it 'should prepend mojs badge to message',->
          spyOn console, 'error'
          h.error 'smth'
          expect(console.error)
            .toHaveBeenCalledWith '%cmo·js%c', h.logBadgeCss, '::', 'smth'
    describe 'setPrefixedStyle method', ->
      it 'should set prefixed style', ->
        el = document.createElement 'div'
        h.setPrefixedStyle el, 'transform', 'translate(20px, 10px)'
        prefixed = "#{h.prefix.css}transform"
        expect(el.style[prefixed]).toBe 'translate(20px, 10px)'
        expect(el.style['transform']).toBe         'translate(20px, 10px)'
    describe 'parseUnit method', ->
      it 'should parse number to pixels', ->
        unit = h.parseUnit(100)
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'px'
        expect(unit.string)   .toBe '100px'
      it 'should parse unitless string', ->
        unit = h.parseUnit('100')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'px'
        expect(unit.string)   .toBe '100px'
      it 'should parse pixel string', ->
        unit = h.parseUnit('100px')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'px'
        expect(unit.string)   .toBe '100px'
      it 'should parse percent string', ->
        unit = h.parseUnit('100%')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe '%'
        expect(unit.string)   .toBe '100%'
      it 'should parse rem string', ->
        unit = h.parseUnit('100rem')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'rem'
        expect(unit.string)   .toBe '100rem'
      it 'should parse em string', ->
        unit = h.parseUnit('100em')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'em'
        expect(unit.string)   .toBe '100em'
      it 'should parse ex string', ->
        unit = h.parseUnit('100ex')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'ex'
        expect(unit.string)   .toBe '100ex'
      it 'should parse cm string', ->
        unit = h.parseUnit('100cm')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'cm'
        expect(unit.string)   .toBe '100cm'
      it 'should parse mm string', ->
        unit = h.parseUnit('100mm')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'mm'
        expect(unit.string)   .toBe '100mm'
      it 'should parse in string', ->
        unit = h.parseUnit('100in')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'in'
        expect(unit.string)   .toBe '100in'
      it 'should parse pt string', ->
        unit = h.parseUnit('100pt')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'pt'
        expect(unit.string)   .toBe '100pt'
      it 'should parse pc string', ->
        unit = h.parseUnit('100pc')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'pc'
        expect(unit.string)   .toBe '100pc'
      it 'should parse ch string', ->
        unit = h.parseUnit('100ch')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'ch'
        expect(unit.string)   .toBe '100ch'
      it 'should parse vh string', ->
        unit = h.parseUnit('100vh')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'vh'
        expect(unit.string)   .toBe '100vh'
      it 'should parse vw string', ->
        unit = h.parseUnit('100vw')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'vw'
        expect(unit.string)   .toBe '100vw'
      it 'should parse vmin string', ->
        unit = h.parseUnit('100vmin')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'vmin'
        expect(unit.string)   .toBe '100vmin'
    describe 'strToArr method', ->
      it 'should parse string to array',->
        expect(h.strToArr('200 100').join ' ').toBe '200 100'
      it 'should parse number to array',->
        expect(h.strToArr(200).join ' ').toBe '200'
      it 'should parse string with multiple spaces to array',->
        expect(h.strToArr('200   100').join ' ').toBe '200 100'
      it 'should trim string before parse',->
        expect(h.strToArr(' 200   100 ').join ' ').toBe '200 100'
      it 'should return array of numbers',->
        expect(h.strToArr(' 200.5   100 ')[0]).toBe 200.5
      it 'should throw if parsing fails',->
        expect(-> h.strToArr(' 200.5 ,  100 ')).toThrow()
    describe 'normDashArrays method', ->
      it 'should normalize two inconsistent dash arrays', ->
        arr1 = [100, 500]; arr2 = [150, 200, 300.7]
        h.normDashArrays(arr1, arr2)
        expect(arr1.join(' ')).toBe '100 500 0'
      it 'should normalize MODIFY passed arrays', ->
        arr1 = [100]; arr2 = [150, 200, 25]
        h.normDashArrays(arr1, arr2)
        expect(arr1.join(' ')).toBe '100 0 0'
      it 'should normalize two inconsistent dash arrays #2', ->
        arr1 = [100, 500]; arr2 = [150]
        h.normDashArrays(arr1, arr2)
        expect(arr1.join(' ')).toBe '100 500'
      it 'should normalize two inconsistent dash arrays #3', ->
        arr1 = [100]; arr2 = [150, 200, 17.5]
        h.normDashArrays(arr1, arr2)
        expect(arr2.join(' ')).toBe '150 200 17.5'
      it 'should should throw if one arg or nothing was passed', ->
        expect(-> h.normDashArrays([100, 500])).toThrow()
        expect(-> h.normDashArrays()).toThrow()
    describe 'isArray method', ->
      it 'should check if variable is array', ->
        expect(h.isArray []).toBe true
        expect(h.isArray {}).toBe false
        expect(h.isArray '').toBe false
        expect(h.isArray 2).toBe false
        expect(h.isArray NaN).toBe false
        expect(h.isArray null).toBe false
        expect(h.isArray()).toBe false

    describe 'calcArrDelta method', ->
      it 'should should throw if on of the args are not arrays', ->
        expect(-> h.calcArrDelta([200, 300, 100], 'a')).toThrow()
        expect(-> h.calcArrDelta('a', [200, 300, 100])).toThrow()

      it 'should should throw if less then 2 arrays passed', ->
        expect(-> h.calcArrDelta [200, 300, 100]).toThrow()
        expect(-> h.calcArrDelta()).toThrow()
      it 'should calculate delta of two arrays', ->
        arr1 = [200, 300, 100]; arr2 = [250, 150, 0]
        delta = h.calcArrDelta arr1, arr2
        expect(delta.join ' ').toBe '50 -150 -100'
    describe 'getRadialPoint', ->
      it 'should calculate radial point', ->
        point = h.getRadialPoint
          radius: 50
          angle:  90
          center: x: 50, y: 50
        expect(point.x).toBe 100
        expect(point.y).toBe 50
      it 'should with radiusX and fallback to radius', ->
        point = h.getRadialPoint
          radius: 50
          radiusX:100
          angle:  90
          center: x: 50, y: 50
        expect(point.x).toBe 150
        expect(point.y).toBe 50
      it 'should with radiusY and fallback to radius', ->
        point = h.getRadialPoint
          radius: 50
          radiusY:100
          angle:  0
          center: x: 50, y: 50
        expect(point.x).toBe 50
        expect(point.y).toBe -50
      it 'should return false if 1 of 3 options missed', ->
        point = h.getRadialPoint
          radius: 50
          angle:  90
        expect(point).toBeFalsy()
      it 'should return false only if 1 of 3 options missed but not falsy', ->
        point = h.getRadialPoint
          radius: 0
          angle:  90
          center: x: 0, y: 0
        expect(point).toBeTruthy()
      it 'options should have default empty object', ->
        point = h.getRadialPoint()
        expect(point).toBeFalsy()
        expect(h.getRadialPoint).not.toThrow()

    describe 'cloneObj method', ->
      it 'should clone object', ->
        obj = { a: 2, b: 3 }
        clonedObj = h.cloneObj(obj)
        expect(clonedObj.a).toBe 2
        expect(clonedObj.b).toBe 3
        expect(Object.keys(clonedObj).length).toBe 2
      it 'should exclude defined keys', ->
        obj = { a: 2, b: 3 }
        exclude = { a: 1 }
        clonedObj = h.cloneObj(obj, exclude)
        expect(clonedObj.b).toBe 3
        expect(clonedObj.a).not.toBeDefined()
        expect(Object.keys(clonedObj).length).toBe 1

    describe 'capitalize method', ->
      it 'should capitalize strings', ->
        expect(h.capitalize 'hello there').toBe 'Hello there'
      it 'should should throw if bad string was passed', ->
        expect(-> h.capitalize()).toThrow()
      it 'should should not throw with empty strings', ->
        expect(-> h.capitalize('')).not.toThrow()
    describe 'splitEasing method', ->
      it 'should split easing string to array',->
        expect(h.splitEasing('Linear.None')[0]).toBe 'Linear'
        expect(h.splitEasing('Linear.None')[1]).toBe 'None'
      it 'should return default easing Linear.None if argument is bad', ->
        expect(h.splitEasing(4)[0]).toBe 'Linear'
        expect(h.splitEasing(4)[1]).toBe 'None'
      it 'should return default easing Linear.None if argument is bad #2', ->
        expect(h.splitEasing('')[0]).toBe 'Linear'
        expect(h.splitEasing('')[1]).toBe 'None'
      it 'should return default easing Linear.None if argument is bad #3', ->
        expect(h.splitEasing('Linear..None')[0]).toBe 'Linear'
        expect(h.splitEasing('Linear..None')[1]).toBe 'None'
      it 'should work with lovercase easing', ->
        expect(h.splitEasing('linear..none')[0]).toBe 'Linear'
        expect(h.splitEasing('linear..none')[1]).toBe 'None'
      it 'should work with function easing', ->
        easing = -> console.log 'function'
        expect(h.splitEasing(easing)+'').toBe easing+''
    describe 'color parsing - makeColorObj method', ->
      it 'should have shortColors map', ->
        expect(h.shortColors).toBeDefined()
      it 'should have posPropsMap map', ->
        expect(h.posPropsMap.x).toBe      1
        expect(h.posPropsMap.y).toBe      1
        expect(h.posPropsMap.shiftX).toBe 1
        expect(h.posPropsMap.shiftY).toBe 1
      it 'should have div node', ->
        expect(h.div.tagName.toLowerCase()).toBe 'div'
      it 'should parse 3 hex color', ->
        colorObj = h.makeColorObj '#f0f'
        expect(colorObj.r)  .toBe 255
        expect(colorObj.g)  .toBe 0
        expect(colorObj.b)  .toBe 255
        expect(colorObj.a)  .toBe 1
      it 'should parse 6 hex color', ->
        colorObj = h.makeColorObj '#0000ff'
        expect(colorObj.r)  .toBe 0
        expect(colorObj.g)  .toBe 0
        expect(colorObj.b)  .toBe 255
        expect(colorObj.a)  .toBe 1
      it 'should parse color shorthand', ->
        colorObj = h.makeColorObj 'deeppink'
        expect(colorObj.r)  .toBe 255
        expect(colorObj.g)  .toBe 20
        expect(colorObj.b)  .toBe 147
        expect(colorObj.a)  .toBe 1
      it 'should parse rgb color', ->
        colorObj = h.makeColorObj 'rgb(200,100,0)'
        expect(colorObj.r)  .toBe 200
        expect(colorObj.g)  .toBe 100
        expect(colorObj.b)  .toBe 0
        expect(colorObj.a)  .toBe 1
      it 'should parse rgba color', ->
        colorObj  = h.makeColorObj 'rgba(0,200,100,.1)'
        expect(colorObj.r)  .toBe 0
        expect(colorObj.g)  .toBe 200
        expect(colorObj.b)  .toBe 100
        expect(colorObj.a)  .toBe .1
      it 'should parse rgba color with float starting by 0', ->
        colorObj = h.makeColorObj 'rgba(0,200,100,0.5)'
        expect(colorObj.r)  .toBe 0
        expect(colorObj.g)  .toBe 200
        expect(colorObj.b)  .toBe 100
        expect(colorObj.a)  .toBe .5





