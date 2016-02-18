COMP 20 Group Project

#20 for 20
### URL: http://tuftsdev.github.io/comp20-f2015-team14/
### Names: Jared Gall, Sara Goldstein-Weiss, Kayden Mimmack, Yennie Jun, Ronna ten Brink

##Problem Statement
You learned in your freshman philosophy class how to look deeply inside yourself, and possibly, to find yourself. But do you really know yourself? The answer is, not yet.  You want to know how your personality can be shaped into an element that can be properly sensed and experienced.

##Solution
We will provide a gripping sensory journey to let you experience your true self as reflected through a set of personality tests. With every answer, we reveal the rhythms and melodies that reflect YOU completely and truly. At the end, you can save and send yourself an mp3 that perfectly encapsulates your id, ego and superego. In 20 Questions we will reduce - or exalt - your "self" into music!

The user is asked a question pertaining to their day or to their personality. By answering the first question, the user is given a very simple skeleton to what their "song" will eventually become. With each ensuing question, more and more elements are added to the user's personality song. Elements we will incorporate include beat, tempo, instrumentation, timbre, dyanimcs, dissonance, and syncopation. 

At the end, the user will have the option to share their finalized song and revisit it with the usage of a "song code". Users can also compare their results to others. They can see what percentage of other quiz-takers answered the same as them. 

Note: This project is a prototype. Thus, there are so far only 11 questions for the user. 

##Absolute Requirements
1. HTML5
2. JavaScript, jQuery, Ajax 
3. GitHub 
4. Desktop and mobile web user interfaces
5. Server-side framework (Node.js)
6. Web/RESTful APIs with JSON parsing (facebook login, charts.js)

##Features (Pick 5)
1. Geolocation
2. Server-side data persistence (MongoDB)
3. Client-side data persistence (local storage)
4. Front-end framework using Bootstrap
5. Reporting with charts and graphs

##Data Collected and Used
The system primarily draws from a set of audio files used to compile the melody.  Each question's answer corresponds with different audio files, volumes, or tempos. As questions are answered, the user hears their melody built in real-time. The ids of each audio file are stored in Local Storage. 

The system also collects the answer values to each of the questions that are given to the client. These values are stored in MongoDB. This information is able to be viewed in comparison to other users’ data of the same value (in the results page), to compare the answers and the respective melodies that were generated from these answers.

##Algorithms
We will have an algorithm to correspond each answer to each question on the quiz to a unique element of the song. For example, answer a gives a fast tempo while answer b gives a slow tempo, or answer a gives a flute tone while answer b gives a wooden block noise. 

##APIs Used 
1. GeoLocation (Google Maps) 
2. Charts.js
3. Facebook Login API

##Mock-Ups
![Question 1](/Question1.jpg)
![Question 2](/Question2.jpg)
![Question 3](/Question3.jpg)
![Question 4](/Question4.jpg)
![End of Quiz](/EndOfQuiz.jpg)
![Chart Away](/ChartAway.jpg)

#Comments by Ming
* You fell into a trap I didn't want you to fall into. You listed a bunch for technologies for features but for what will they be used for what? Example: for what will charts or graphs be used for?  And what will you be screen scraping?
* No list of possible APIs
