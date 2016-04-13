var playing = true;
var tempo = localStorage.getItem('tempo');
var q11vol = localStorage.getItem('q11vol');
var totalQ = 10;
var allData;
Chart.defaults.global.responsive = true;

$(document).ready(function(){
    getSendInfo();
});

window.onload = function() {
	playAudio();
};

function findIndex(ans) {
    for (var i = 0; i < allData.length; i++) {
            if (allData[i].answer == ans)
                return i;
        }
    return -1;
}

function getSendInfo() {
    // Creates a new XMLHttpRequest to get all of our data from a static JSON file.
    // Once this is connected to a server, we will rearrange it so that it gets info
    // from a Mongo database.

    var url = "https://intense-bastion-7836.herokuapp.com/sendSongData";
    var param = "q2=" + localStorage.getItem('q2') + "&q3=" + localStorage.getItem('q3')
              + "&q4=" + localStorage.getItem('q4') + "&q5=" + localStorage.getItem('q5')
              + "&q6=" + localStorage.getItem('q6') + "&q7=" + localStorage.getItem('q7')
              + "&q8=" + localStorage.getItem('q8') + "&q9=" + localStorage.getItem('q9')
              + "&q10=" + localStorage.getItem('q10');

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			data = xhr.responseText;
			allData = JSON.parse(data);
            loadGraphs();
        }
        else if (xhr.readyState == 4 && xhr.status != 200)
			alert("We had trouble retrieving our data. Some parts of the page may not load fully as a result.");
    }

    xhr.send(param);
}

function loadGraphs() {
    for (qnumber = 2; qnumber <= totalQ; qnumber++) // Change numbers to reflect number of questions
        drawGraphs(qnumber);
};

function drawGraphs(i) {
    var question = "q" + i; // ex q1, q2, q3, etc
    var myAnswer = localStorage.getItem(question);
    var data = [];          // data we will put on our graph

    for (num = 1; findIndex(question + "a" + num) != -1; num++) // propogate data with info from json
    {
        var index = findIndex(question + "a" + num);
        if (myAnswer == "a" + num) {
            var dataColor = chooseColor(i);
            var dataHighlight = "#696969";
            allData[index].value = allData[index].value + 1;
        }

        else { // for all answers other than the one from the user
            var dataColor = "#B8B8B8";      // grey color
            var dataHighlight = "#D0D0D0";
        }

        data.push({ // add appropriate label, count, color for each part of the graph
            label: toLetter(num),
            value: allData[index].value,
            color: dataColor,
            highlight: dataHighlight
        });
    }

    var ctx = document.getElementById(question + 'Graph').getContext('2d');
    new Chart(ctx).Doughnut(data);
};

function toLetter(num) {
    if (num == 1)
        return 'a';
    if (num == 2)
        return 'b';
    if (num == 3)
        return 'c';
    if (num == 4)
        return 'd';
    if (num == 5)
        return 'e';

    else return "err";
};

function chooseColor(num) {
    if (num == 2)
        return "#45B29D";
    if (num == 3)
        return "#EFC94C";
    if (num == 4)
        return "#3366FF";
    if (num == 5)
        return "#FF6666";
    if (num == 6)
        return "#663399";
    if (num == 7)
        return "#880000";
    if (num == 8)
        return "#99CCFF";
    if (num == 9)
        return "#7d7de8";
    if (num == 10)
        return "#a32985";
    else
        return "#F7464A";      // red color
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