var totalQ = 10;
var tempo = localStorage.getItem('tempo');
var q11vol = localStorage.getItem('q11vol');
var playing = true;

$(document).ready(function(){
	$('#title').html("Nice song, " + localStorage.getItem('q1') + "!");
});

window.onload = function() {
	playAudio();
};

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
