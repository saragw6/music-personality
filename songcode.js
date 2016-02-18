var totalQ = 10;
var tempo = 0;
var q11vol = 0;
var songs = new Array(12);  //array of strings

$(document).ready(function(){
	codeSubmit();
});

// We need to make sure this works when the user presses enter as well

function codeSubmit() {
    $('#submit').click(function(event){
        if ($('#code').prop('value')) {
			var code = $('#code').prop('value');
            var arr = validateCode(code);
            if (arr == false) {
                alert("Please enter a valid code");
                return;
            }
            playSong(arr);
		}
		else alert("Please enter a code in the given box");
    });

}

function validateCode(code) {
    var parsed = code.split("");
    if (parsed.length != totalQ)
        return false;

    for (var i = 0; i < totalQ; i++) {
        if (!validNumber((i + 2), parsed[i])) // convert to question number
            return false;
    }

    return parsed;
}

// UPDATE WITH CORRECTED VALUES LATER
function validNumber(q, a) {

    if (q == 2) {
        if (1 <= a && a <= 5)
            return true;
        else return false;
    }

    if (q == 3 || q == 5 || q == 6 || q == 8) {
        if (1 <= a && a <= 3)
            return true;
        else return false;
    }

    if (q == 4 || q == 7 || q == 9 || q == 10) {
        if (1 <= a && a <= 2)
            return true;
        else return false;
    }

    if (q == 11) {
        if (0 <= a && a <= 4)
            return true;
        else return false;
    }
}

function playSong(arr) {
    q2(arr[0]);
    q3(arr[1]);
    q4(arr[2]);
    q5(arr[3]);
    q6(arr[4]);
    q7(arr[5]);
    q8(arr[6]);
    q9(arr[7]);
    q10(arr[8]);
    q11(arr[9]);

    playAudio();
}

function playAudio() {

	for (var i = 2; i < totalQ + 2; i++) {
		var currAudio = document.getElementById(songs[i]);
		currAudio.playbackRate = tempo;
		if (i == 11) {
			currAudio.volume = q11vol;
		}
		else if (i == 5) {
			currAudio.volume = 0.2;
		}
        else if (i == 3) {
            currAudio.volume = 1;
        }
		else {
			currAudio.volume = 0.7;
		}
        currAudio.play();
	}
}

function q2(num) {
    if (num == 1)
        tempo = 1.6;
    else if (num == 2)
        tempo = 1.4;
    else if (num == 3)
        tempo = 1.2;
    else if (num == 4)
        tempo = 1;
    else if (num == 5)
        tempo = 0.8;

    songs[2] = "snare";
}

function q3(num) {
    var noise;
    if (num == 1)
        noise = "bass1";
    else if (num == 2)
        noise = "bass2";
    else if (num == 3)
        noise = "bass3";

    songs[3] = noise;
}

function q4(num) {
    var noise;
    if (num == 1)
        noise = "hihat1";
    else if (num == 2)
        noise = "hihat2";

    songs[4] = noise;
}

function q5(num) {
    var noise;
    if (num == 1)
        noise = "soprano";
    else if (num == 2)
        noise = "alto";
    else if (num == 3)
        noise = "tenor";

    songs[5] = noise;
}

function q6(num) {
    var noise;
    if (num == 1)
        noise = "castanet";
    else if (num == 2)
        noise = "woodblocks";
    else if (num == 3)
        noise = "sleigh";

    songs[6] = noise;
}

function q7(num) {
    var noise;
    if (num == 1)
        noise = "triangle";
    else if (num == 2)
        noise = "cymbals";

    songs[7] = noise;
}

function q8(num) {
    var noise;
    if (num == 1)
        noise = "tam1";
    else if (num == 2)
        noise = "tam2";
    else if (num == 3)
        noise = "tam3";

    songs[8] = noise;
}

function q9(num) {
    var noise;
    if (num == 1)
        noise = "bells_up";
    else if (num == 2)
        noise = "bells_down";

    songs[9] = noise;
}

function q10(num) {
    var noise;
    if (num == 1)
        noise = "vib_maj";
    else if (num == 2)
        noise = "vib_min";

    songs[10] = noise;
}

function q11(num) {
    if (num == 0)
        q11vol = 0.2;
    else if (num == 1)
        q11vol = 0.4;
    else if (num == 2)
        q11vol = 0.6;
    else if (num == 3)
        q11vol = 0.8;
    else if (num == 4)
        q11vol = 2;

    songs[11] = "organ";
}
