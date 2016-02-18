/* Note: Question responses are put in local storage in key value pairs in the
   following format: {'q#': 'a#'} where the pound signs are replaced with the
   appropriate number of the question/answer. Local storage is cleared upon page
   refresh so that answers from previous sessions are not taken into account.
*/

var tempo = 0;
var playing = true;
var cur_song = 0;
var totalQ = 10;

// NOTE: Maybe keep these audio files in an array in local storage, but
// saved as globals for now


$(document).ready(function(){
	cleanStorage();
	q1submit();
	q2submit();
	q3submit();
	q4submit();
	q5submit();
	q6submit();
	q7submit();
	q8submit();
	q9submit();
	q10submit();
});

// Clears answers from any previous session. Need to update totalQ when adding
// More questions.
function cleanStorage() {
	for (i = 1; i < totalQ; i++)
		localStorage.setItem(i, '');

	for (i = 1; i <= totalQ; i++)
	{
		var q = 'q'+i;
		document.cookie = q + "=";
	}
}

function disableButton(id) {
	$(id).attr("disabled", true);
}

function scrollToElem(id) {
	$('html, body').animate({
		scrollTop: $(id).offset().top
	}, 1500);
}

function playpause() {
	if (playing == true) {
		console.log("playing");
		var icon = document.getElementById('ppicon');
		icon.className="glyphicon glyphicon-pause";
		$('audio').each(function(){
		    this.pause(); // Stop playing
		    this.currentTime = 0; // Reset time
		});
		playing = false;
	}
	else {
		console.log("not playing");
		var icon = document.getElementById('ppicon');
		icon.className="glyphicon glyphicon-play";
		playAudio(cur_song);
		playing = true;
	}
}

function playAudio(questionNumber) {

	$('audio').each(function(){
	    this.pause(); // Stop playing
	    this.currentTime = 0; // Reset time
	});

	for (var i = 2; i <= questionNumber; i++) {
		var currAudio = document.getElementById(localStorage[i]);
		if (localStorage[i] != '') {
			currAudio.playbackRate = tempo;
			if (i == questionNumber) {
				currAudio.volume = 1;
			}
			if (i == 5) {
				currAudio.volume = .15
			}
			else {
				currAudio.volume = .5;
			}
			currAudio.play();
		}
	}
}


function q1submit() {
	$('#q1submit').click(function(event){
		if ($('#name').prop('value')) {
			var name = $('#name').prop('value');
			var nameLetters = name.split("");
			localStorage.setItem('q1', name[0]);
			console.log(localStorage.getItem('q1'));
			disableButton("#q1submit");
			scrollToElem("#question2");
			$("#unanswered1").html("");
			endpage();
		}
		else alert("Please enter a name");
	});
}

function q2submit() {
	var q2_audio = document.getElementById("snare");
	$('#q2submit').click(function(event){
		if ($('#q2a1').prop('checked')) {
			tempo = 1.4;
			localStorage.setItem('q2', 'a1');
		}
		else if ($('#q2a2').prop('checked')) {
			tempo = 1.2;
			localStorage.setItem('q2', 'a2');
		}
		else if ($('#q2a3').prop('checked')) {
			tempo = 1;
			localStorage.setItem('q2', 'a3');
		}
		else if ($('#q2a4').prop('checked')) {
			tempo = 0.8;
			localStorage.setItem('q2', 'a4');
		}
		else if ($('#q2a5').prop('checked')) {
			tempo = 0.6;
			localStorage.setItem('q2', 'a5');
		}
		else {
			alert('Please select an answer.');
			scrollToElem("#question2");
			return;
		}

		localStorage[2] = "snare";
		playAudio(2);
		cur_song = 2;
		disableButton("#q2submit");
		$("#unanswered2").html("");
		endpage();
		scrollToElem("#question3");

	});
}

function q3submit() {
	var q3_audio;
	$('#q3submit').click(function(event){
		if (tempo == 0) {
			alert("Please answer Question 2 first.");
			scrollToElem("#question2");
			return;
		}
		else if ($('#q3a1').prop('checked')) {
			q3_audio = "bass1";
			localStorage.setItem('q3', 'a1');
		}
		else if ($('#q3a2').prop('checked')) {
			q3_audio = "bass2";
			localStorage.setItem('q3', 'a2');
		}
		else if ($('#q3a3').prop('checked')) {
			q3_audio = "bass3";
			localStorage.setItem('q3', 'a3');
		}
		else {
			alert('Please select an answer.');
			scrollToElem("#question3");
			return;
		}

		localStorage[3] = q3_audio;
		playAudio(3);
		cur_song = 3;
		disableButton("#q3submit");
		$("#unanswered3").html("");
		endpage();
		scrollToElem("#question4");

	});
}

function q4submit() {
	var q4_audio;
	$('#q4submit').click(function(event){
		if (tempo == 0) {
			alert("Please answer Question 2 first.");
			scrollToElem("#question2");
			return;
		}
		else if ($('#q4a1').prop('checked')) {
			q4_audio = "hihat1";
			localStorage.setItem('q4', 'a1');
		}
		else if ($('#q4a2').prop('checked')) {
			q4_audio = "hihat2";
			localStorage.setItem('q4', 'a2');
		}
		else {
			alert('Please select an answer.');
			scrollToElem("#question4");
			return;
		}

		localStorage[4] = q4_audio;
		playAudio(4);
		cur_song = 4;
		disableButton("#q4submit");
		$("#unanswered4").html("");
		endpage();
		scrollToElem("#question5");

	});
}

function q5submit() {
	var q5_audio;
	$('#q5submit').click(function(event){
		if (tempo == 0) {
			alert("Please answer Question 2 first.");
			scrollToElem("#question2");
			return;
		}
		else if ($('#q5a1').prop('checked')) {
			q5_audio = "soprano";
			localStorage.setItem('q5', 'a1');
		}
		else if ($('#q5a2').prop('checked')) {
			q5_audio = "alto";
			localStorage.setItem('q5', 'a2');
		}
		else if ($('#q5a3').prop('checked')) {
			q5_audio = "tenor";
			localStorage.setItem('q5', 'a3');
		}
		else {
			alert('Please select an answer.');
			localStorage.setItem('q5', 'a4');
			return;
		}

		localStorage[5] = q5_audio;
		playAudio(5);
		cur_song = 5;
		disableButton("#q5submit");
		$("#unanswered5").html("");
		endpage();
		scrollToElem("#question6");

	});
}

function q6submit() {
	var q6_audio;
	$('#q6submit').click(function(event){
		if (tempo == 0) {
			alert("Please answer Question 2 first.");
			scrollToElem("#question2");
			return;
		}
		else if ($('#q6a1').prop('checked')) {
			q6_audio = "castanet";
			localStorage.setItem('q6', 'a1');
		}
		else if ($('#q6a2').prop('checked')) {
			q6_audio = "woodblocks";
			localStorage.setItem('q6', 'a2');
		}
		else if ($('#q6a3').prop('checked')) {
			q6_audio = "sleigh";
			localStorage.setItem('q6', 'a3');
		}
		else {
			alert('Please select an answer.');
			scrollToElem("#question6");
			return;
		}

		localStorage[6] = q6_audio;
		playAudio(6);
		cur_song = 6;
		disableButton("#q6submit");
		$("#unanswered6").html("");
		endpage();
		scrollToElem("#question7");

	});
}


function q7submit() {
	var q7_audio;
	$('#q7submit').click(function(event){
		if (tempo == 0) {
			alert("Please answer Question 2 first.");
			scrollToElem("#question2");
			return;
		}
		else if ($('#q7a1').prop('checked')) {
			q7_audio = "triangle";
			localStorage.setItem('q7', 'a1');
		}
		else if ($('#q7a2').prop('checked')) {
			q7_audio = "cymbals";
			localStorage.setItem('q7', 'a2');
		}
		else {
			alert('Please select an answer.');
			scrollToElem("#question7");
			return;
		}

		localStorage[7] = q7_audio;
		playAudio(7);
		cur_song = 7;
		disableButton("#q7submit");
		$("#unanswered7").html("");
		endpage();
		scrollToElem("#question8");

	});
}

function q8submit() {
	var q8_audio;
	$('#q8submit').click(function(event){
		if (tempo == 0) {
			alert("Please answer Question 2 first.");
			scrollToElem("#question2");
			return;
		}
		else if ($('#q8a1').prop('checked')) {
			q8_audio = "tam1";
			localStorage.setItem('q8', 'a1');
		}
		else if ($('#q8a2').prop('checked')) {
			q8_audio = "tam2";
			localStorage.setItem('q8', 'a2');
		}
		else if ($('#q8a3').prop('checked')) {
			q8_audio = "tam3";
			localStorage.setItem('q8', 'a3');
		}
		else {
			alert('Please select an answer.');
			scrollToElem("#question8");
			return;
		}

//		disableButton("#q8submit");
		localStorage[8] = q8_audio;
		playAudio(8);
		cur_song = 8;
		disableButton("#q8submit");
		scrollToElem("#question9");

	});
}



function q9submit() {
	var q9_audio;
	$('#q9submit').click(function(event){
		if (tempo == 0) {
			alert("Please answer Question 2 first.");
			scrollToElem("#question2");
			return;
		}
		else if ($('#q9a1').prop('checked')) {
			q9_audio = "bells_up";
			localStorage.setItem('q9', 'a1');
		}
		else if ($('#q9a2').prop('checked')) {
			q9_audio = "bells_down";
			localStorage.setItem('q9', 'a2');
		}
		else {
			alert('Please select an answer.');
			scrollToElem("#question9");
			return;
		}

//		disableButton("#q9submit");
		localStorage[9] = q9_audio;
		playAudio(9);
		cur_song = 9;
		disableButton("#q9submit");
		scrollToElem("#question10");

	});
}


function q10submit() {
	var q10_audio;
	$('#q10submit').click(function(event){
		if (tempo == 0) {
			alert("Please answer Question 2 first.");
			scrollToElem("#question2");
			return;
		}
		else if ($('#q10a1').prop('checked')) {
			q10_audio = "vib_maj";
			localStorage.setItem('q10', 'a1');
		}
		else if ($('#q10a2').prop('checked')) {
			q10_audio = "vib_min";
			localStorage.setItem('q10', 'a2');
		}
		else {
			alert('Please select an answer.');
			scrollToElem("#question10");
			return;
		}

//		disableButton("#q10submit");
		localStorage[10] = q10_audio;
		playAudio(10);
		cur_song = 10;
		disableButton("#q10submit");
		scrollToElem("#question11");

	});
}


function endpage() {
	var allAnswered = true;
	for (i = 1; i <= totalQ; i++)
	{
		var u = "#unanswered" + i
		if ($(u).html() != "")
			allAnswered = false;
	}

	if (allAnswered == true)
	{
		$('#endTitle').html("Finish your quiz...");
		var buttons = '<div class="btn-group-vertical" data-toggle="buttons" style="display: static; width: 100%">'
		+ '<input type="submit" id="finish" style="margin-top:20px;" class="btn btn-default" value="FINISH">'
			+ '</div>';
		$('#endBody').html(buttons);
	}
}
