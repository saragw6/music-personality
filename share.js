var playing = true;
var totalQ = 10;
var tempo = localStorage.getItem('tempo');
var q11vol = localStorage.getItem('q11vol');
var playing = true;

$(document).ready(function() {
	sendCode();
});

window.onload = function() {
	playAudio();
};

function sendCode() {
	code = "";

	for (var i = 2; i < 11; i++) {
		var answer = localStorage.getItem("q" + i);
		code = code + answer[1];
	}

	if (q11vol == 0.2)
        code = code + 0;
    else if (q11vol = 0.4)
        code = code + 1;
    else if (q11vol = 0.6)
        code = code + 2;
    else if (q11vol = 0.8)
        code = code + 3;
    else // (q11vol = 2)
        code = code + 4;

	$('#code').html(code);
}

function playAudio() {
	for (var i = 2; i < totalQ + 2; i++) {
		var currAudio = document.getElementById(localStorage[i]);
		if (currAudio != null) {
			currAudio.playbackRate = tempo;
			if (i == 11)
				currAudio.volume = q11vol;
			else if (i == 5)
				currAudio.volume = .15
			else if (i == 3)
				currAudio.volume = 1;
			else
				currAudio.volume = .5;
			currAudio.play();
		}
	}
}

function playpause() {
	if (playing == true) {
		var icon = document.getElementById('ppicon');
		icon.className="glyphicon glyphicon-play";
		$('audio').each(function(){
		    this.pause(); // Stop playing
		    this.currentTime = 0; // Reset time
		});
		playing = false;
	}
	else {
		var icon = document.getElementById('ppicon');
		icon.className="glyphicon glyphicon-pause";
		playAudio(totalQ);
		playing = true;
	}
}

// facebook login code. some code lifted from developers.facebook.com documentation

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '{211136332553370}',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.5
  });

  // Now that we've initialized the JavaScript SDK, we call
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.
  }; //end AsyncInit

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=211136332553370";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!' + '<p><button onclick="postResults()">Post to Facebook</button></p>';
    });
  }

function postResult() {
  //FB.api('/me/feed', 'post', {message: 'This personality quiz tells you what music describes who you are! My song code is ' + code + '. You can listen to my song or take the quiz. Let me know what you get! http://tuftsdev.github.io/comp20-f2015-team14/'});
  FB.ui({
    method: 'share',
    href: 'http://saragw6.github.io/music-personality/',
  }, function(response){
    console.log(response);
        if (response && !response.error_message) {
      alert('Posting completed.');
    } else {
      alert('Error while posting.');
    }
  });
}; //end postResults

function playpause() {
    console.log("called playpause");
    if (playing == true) {
        var icon = document.getElementById('ppicon');
        icon.className="glyphicon glyphicon-play";
        $('audio').each(function(){
            this.pause();     /* Stop playing */
            this.currentTime = 0; /* Reset time */
        });
        playing = false;
    }
    else {
        var icon = document.getElementById('ppicon');
        icon.className="glyphicon glyphicon-pause";
        playAudio();
        playing = true;
    }
}
