// webaudiox.shim.js
// from https://github.com/jeromeetienne/webaudiox/blob/master/lib/webaudiox.shim.js
// shim: shim is a small library that transparently intercepts API calls and
//       changes the arguments passed, handles the operation itself, or redirects
//       the operation elsewhere.

/**
 * shim to get AudioContext
 */
window.AudioContext	= window.AudioContext || window.webkitAudioContext;