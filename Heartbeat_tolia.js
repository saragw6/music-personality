
var context = new AudioContext()

// Create lineOut
var lineOut = new WebAudiox.LineOut(context)
lineOut.volume  = 1

var analyser  = context.createAnalyser()
analyser.connect(lineOut.destination);
lineOut.destination = analyser;

// load a sound and play it immediatly
var audioSRC = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2361/04_Lines.mp3"
//"http://www.freesound.org/data/previews/106/106018_1799321-lq.ogg";

WebAudiox.loadBuffer(context, audioSRC, function(buffer){
  var source  = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true
  source.connect(lineOut.destination);
  source.start(0);
}, false, function (progress){
  dude.progressLoad = progress
});


var canvas  = document.createElement('canvas');
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var ctx   = canvas.getContext("2d");  
document.body.appendChild(canvas)

var Dude = function(analyser, canvas){
  var canvasCtx       = canvas.getContext("2d")
  var analyser2volume = new WebAudiox.Analyser2Volume(analyser)
  var histogram       = new Float32Array(10)
  var centerX         = canvas.width/2
  var centerY         = canvas.height/2
  var rawValue
  var smoothedValue
  this.progressLoad = 0

  var componentToHex = function (c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
  }

  var rgbToHex = function (r,g,b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
  }

  var intermediateValue = function (a,b,ratio) {
    var diff = a - b 
    return a - Math.round(diff*ratio)
  }

  var updateVariables = function () {
    rawValue      = analyser2volume.rawValue()
    smoothedValue = analyser2volume.smoothedValue()
    getHistogram()
  }

  var getHistogram = function () {
    var freqData = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(freqData)
    WebAudiox.ByteToNormalizedFloat32Array(freqData, histogram)
  }

  var drawEllipse = function (x, y, w, h) {
    var kappa = .5522848,
        ox = (w / 2) * kappa, // control point offset horizontal
        oy = (h / 2) * kappa, // control point offset vertical
        xe = x + w,           // x-end
        ye = y + h,           // y-end
        xm = x + w / 2,       // x-middle
        ym = y + h / 2;       // y-middle

    canvasCtx.moveTo(x, ym);
    canvasCtx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    canvasCtx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    canvasCtx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    canvasCtx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  }

  var drawEllipseByCenter = function(cx, cy, w, h) {
    drawEllipse(cx - w/2, cy - h/2, w, h);
  }

  var FaceConstructor = (function() {
    function FaceConstructor(centerX,centerY) {
      this.colorStart  = [60, 180, 255]
      this.colorStop   = [255, 100, 60]
      this.centerX     = centerX
      this.centerY     = centerY
      this.minRadius   = Math.min(canvas.height, canvas.width) * 0.5;
      this.maxRadius   = Math.min(canvas.height, canvas.width) * 0.7;
      this.radiusH     = this.minRadius
      this.radiusW     = this.maxRadius
      this.radiusValue = 0
      this.colorValue  = 0
    }
    FaceConstructor.prototype.getHRadius = function () {
      val = Math.min( rawValue * 3, 1 )
      return this.radiusH = intermediateValue(this.minRadius,this.maxRadius, val)
    }
    FaceConstructor.prototype.draw = function () {
      var X          = Math.min( smoothedValue * 3, 1 ) 
      var colorR     = intermediateValue(this.colorStart[0],this.colorStop[0],X)
      var colorG     = intermediateValue(this.colorStart[1],this.colorStop[1],X)
      var colorB     = intermediateValue(this.colorStart[2],this.colorStop[2],X)
      var color      = rgbToHex(colorR,colorG,colorB) 
      canvasCtx.beginPath()
      canvasCtx.fillStyle = color
      drawEllipseByCenter(this.centerX, this.centerY, this.radiusW, this.getHRadius())
      canvasCtx.closePath()
      canvasCtx.fill()
    }
    return FaceConstructor
   })();
  
  var EyeConstructor = (function() {
    function EyeConstructor(face,centerX) {
      this.face        = face
      this.centerX     = centerX
      this.centerY     = face.centerY - face.radiusH*0.1
      this.minRadius   = face.minRadius*0.025
      this.maxRadius   = face.maxRadius*0.25
      this.radius      = this.minRadius
    }
    EyeConstructor.prototype.drawPupil = function() {
      pupilRadius = 1 + this.maxRadius/2 * histogram[3]
      canvasCtx.beginPath()
      canvasCtx.fillStyle = "#222"
      canvasCtx.arc(this.centerX, this.centerY, pupilRadius, 0, Math.PI*2, true)
      canvasCtx.closePath()
      canvasCtx.fill()
    }
    EyeConstructor.prototype.setRadius = function(val) {
      this.radius = intermediateValue(this.minRadius,this.maxRadius,val)
    }
    EyeConstructor.prototype.draw = function() {
      canvasCtx.beginPath()
      canvasCtx.fillStyle = "#ffffff"
      canvasCtx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI*2, true)
      canvasCtx.closePath()
      canvasCtx.fill()
      this.drawPupil()
    }
    return EyeConstructor;
  })();

  var MouthConstructor = (function() {
    function MouthConstructor(face) {
      this.face        = face
      this.centerX     = face.centerX
      this.centerY     = face.centerY + face.maxRadius/4
      this.minRadius   = 0
      this.maxRadius   = face.maxRadius*2/5
      this.radiusH     = this.minRadius
      this.radiusW     = this.maxRadius
      this.bg          = canvasCtx.createLinearGradient(0,0,0,canvas.height);
      this.bg.addColorStop(0.5,"#000");
      this.bg.addColorStop(1,"#fff");
    }
    MouthConstructor.prototype.setRadius = function(val) {
      this.radiusH = 1 + intermediateValue(this.minRadius,this.maxRadius,val)
    }
    MouthConstructor.prototype.draw = function(points) {
      var width = this.radiusW * (1 + smoothedValue * 4)
      canvasCtx.beginPath()
      canvasCtx.fillStyle = this.bg
      drawEllipseByCenter(this.centerX, this.centerY, width, this.radiusH)
      canvasCtx.closePath()
      canvasCtx.fill()
    }
    return MouthConstructor
  })();

  var face  = new FaceConstructor(centerX,centerY)
  var eyeXR = face.centerX + face.radiusH*1/4
  var eyeXL = face.centerX - face.radiusH*1/4
  var eyeR  = new EyeConstructor(face,eyeXR)
  var eyeL  = new EyeConstructor(face,eyeXL)
  var mouth = new MouthConstructor(face)

  this.update = function(){
    updateVariables()
    face.draw()
    eyeR.setRadius(histogram[2])
    eyeR.draw()
    eyeL.setRadius(histogram[1])
    eyeL.draw()
    mouth.setRadius(histogram[0])
    mouth.draw()
    this.loaderProgress()
  }

  this.loaderProgress = function() {
    if (this.progressLoad < 1) {
      var angle = Math.PI*2*this.progressLoad || 0
      canvasCtx.beginPath()
      canvasCtx.arc(face.centerX, face.centerY, face.maxRadius*0.6, 0, angle, true)
      canvasCtx.strokeStyle = "#fff"
      canvasCtx.lineWidth   = 1
      canvasCtx.stroke()
    }
  }
}

// create the object
var dude = new Dude(analyser, canvas)

var WebAudiox = WebAudiox || {}

// loop and update
requestAnimationFrame(function update() {
  requestAnimationFrame(update);
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // put the sound in the canvas
  dude.update()
})

dude.update()
