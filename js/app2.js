// Variables //
//-----------//
var clickCount = 0;
var guesses = 0;
var deck = [];
var card = null;
deck = $('.card');
var upCard1 = null;
var upCard2 = null;
var showCards = [];
var starNum = 3;
var displayTimer = $('#timer');

/*
+----------+
| FUNCTIONS|
+----------+
*/
//------------------//
// Shuffle function from http://stackoverflow.com/a/2450976
//------------------//
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

//-------------------//
// Restart function
//-------------------//
function restart() {
    $('.card').removeClass('match');
    $('.card').removeClass('open show');
    stars = 3;
    guesses = 0;
    clickCount = 0;
    upCard1 = null;
    upCard2 = null;
    upCard1Id = undefined;
    upCard2Id = null;
    $('.moves').html('<span class="moves">'+guesses+'</span>');
    shuffle(deck) // use the shuffle function to re-order the elements in the deck

    // loop through each card, and append it to the deck in HTML??
    for (i=0; i<deck.length; i++) {
        card = deck[i];
        $('.deck').append(card);
        };
};

//-------------------//
// Stopwatch function...some code/ideas from this youtube video: https://www.youtube.com/watch?v=jRhB1IG7uAw
//-------------------//
function Stopwatch(element) {
    var time = 0;
    var interval;
    var offset;
    this.isOn = false;

    function update() {
        time += delta();
        var formattedTime = formatTime(time);
        element.html(formattedTime);
    };

    function delta() {
        var now = Date.now();
        var timePassed = now - offset;
        offset = now;
        return timePassed;
    };

    function formatTime(timeInMs) {
        var time = new Date(timeInMs);
        var minutes = time.getMinutes().toString();
        var seconds = time.getSeconds().toString();
        var milliseconds = time.getMilliseconds().toString();

        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }
        if (seconds.length < 2) {
            seconds = '0' + seconds;
        }
        while (milliseconds.length < 3) {
            milliseconds = '0' + milliseconds;
        }
        return minutes + ' : ' + seconds + ' . ' + milliseconds
    }

    this.start = function() {
        time = 0;
        if (!this.isOn) {
            interval = setInterval(update, 10);
            offset = Date.now();
            this.isOn = true;
        }
    };

    this.stop = function() {
        if (this.isOn) {
            clearInterval(interval);
            interval = null;
            this.isOn = false;
        }
    };

    this.reset = function() {
        time = 0;
    };
};

//-------------------//
// Reset Button
//-------------------//
$('.restart').click(function() {
            restart();
            watch.stop();
            watch.reset();
            window.location.reload();
        })
//-------------------//


//==============//
// MAIN PROGRAM //
//==============//

var instructions = `Welcome to this memory matching game.
Your goal is to get all cards face up. You do this by
finding pairs of cards with the same image on the
reverse. Choose a card and click to turn it over. Once
you memorize the image on the back of the card, click
another card that you think has the same image on its
reverse. If both images are the same, both cards will
stay face up. If the images are not the same, the cards
will turn back over. OK to play, Cancel to quit.`;

restart();
var watch = new Stopwatch(displayTimer);
var play;

// This function is activated when the user clicks play now
function myFunction () {

    play = window.confirm(instructions);
    if (play === true) {
        watch.start()

        function turnCard(card) {card.addClass('match')}
        // this is the function that turns our cards on the page by adding 'match' to the class

        $('.card').click(function() {
            clickCount += 1;

            if (clickCount > 2) {
                // prevent cheating by 'fast clicking' mulitple cards
                window.alert('Dont cheat by clicking more than 2 cards a time! Restarting your game...');
                window.location.reload();
            }

            if (clickCount === 1) {
                // users first click will: turn over a card wtih turnCard
                // then get the cards li class (what image is on the card), and
                // get the clicked cards id (for an anti-cheating measure)
                turnCard($(this));
                upCard1 = $(this);
                upCard1Class = upCard1.children().attr('class');
                upCard1Id = upCard1.attr('id');
            }

            else if (clickCount === 2) {
                // users second click will: increment the moves number on the page,
                // turn over the clicked card, get its class and id
                // and implement some anti-cheating and matching logic
                guesses +=1;
                $('.moves').html('<span class="moves">'+guesses+'</span>');
                turnCard($(this));
                upCard2 = $(this);
                upCard2Class = upCard2.children().attr('class');
                upCard2Id = upCard2.attr('id');

                if (upCard2Id === upCard1Id) {
                    // prevent cheating by clicking the same card more than once
                    // uses unique HTML ID's for each card
                    window.alert('Dont cheat by clicking the same card twice! Restarting your game...Press Play Now to play again');
                    window.location.reload();
                }

                if (upCard2Class === upCard1Class) {
                    // if the images (classes) on the cards match they have the match class removed
                    // and the open show class added to have them remain permanently visible
                    upCard1.removeClass('match');
                    upCard1.addClass('open show');
                    upCard2.removeClass('match');
                    upCard2.addClass('open show');
                    clickCount = 0;
                    shownCards = $('.show');

                    if (shownCards.length === 16) {
                        // this is our stopping condition
                        watch.stop();
                        setTimeout( function() {
                        play = false;
                        replay = window.confirm('Congratulations! You won in '+guesses+' moves for a '+starNum+' star rating. You finished in '+$('#timer').text()+'. Press "OK" to play again, "Cancel" to quit.');
                        watch.reset();
                        if (replay === true) {
                            window.location.reload();
                        }
                        else {
                            window.alert('Thanks for playing');
                            window.location.reload();
                        }
                        },200)
                    }
                }

                else {
                    // if the images (classes) on the cards don't match, then they have match
                    // removed which turns the cards back over. The setTimeout function
                    // allows us to specify how long (in ms) to display the images before
                    // turning the cards back over.
                    setTimeout( function() {
                        upCard1.removeClass('match');
                        upCard2.removeClass('match');
                        clickCount = 0;
                    }, 700)
                }
            }

            // Star handling (keeps track of star number AND updates star imagery on the page)
            var stars = $('.stars').find('li')
            if (guesses === 14) {
                if (clickCount === 1) {
                    starNum--;
                    stars[0].remove();
                    stars = $('.stars').find('li');
                }

            }
            else if (guesses === 18) {
                if (clickCount === 1) {
                    starNum--;
                    stars[0].remove();
                    stars = $('.stars').find('li');
                }

            }
            else if (guesses === 22) {
                if (clickCount === 1) {
                    starNum--;
                    stars[0].remove();
                }
            }
        })
//-------------------------------------------------------
    } // close bracket for the if play === true condition

    else {
        watch.stop();
        watch.reset();
        window.alert('Thank you, Goodbye!')}
}

/*

-------
RUBRIC
-------
Game Behavior
+ Memory Game Logic: Randomly shuffle cards, win when all successfully matched
+ Congratulations Popup: When user wins, ask if want to play again, show star rating
  and elapsed time
+ Restart Button: Restarts game board, time, and star rating
+ Star Rating: 1-3 stars, displayed to user
+ Timer: Starts when user acknowleges instructions
+ Move Counter: Display current number of moves a user has made

Interface Design
+ Styling: Uses CSS to style components
- All applications components are usable across modern desktop, tablet,
  and phone browsers

Documentation
- A README file is included detailing the game and dependencies
- Comments are present and effectively explain longer code procedure
- Code is formatted with consistent, logical, and easy-to-read formatting
  as described in the Udacity JavaScript Style Guide


-------
TO DO
-------
- Work on README
- Comments
- Look through code relative to the JavaScript Style Guide
- Test on browsers other than firefox and safari (??)
- Cite Stopwatch function




*/

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)


 */