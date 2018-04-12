/*
 * Create a list that holds all of your cards
 */
var guesses = 0
var deck = []
var card = null
deck = $('.card')

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    window.alert('Shuffled')
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
function deal(card) {
    document.getElementsByClassName("deck").children[0].innerHTML += "<li>"+card+"</li>";

}
*/

$('.restart').click(function() {
            restart()
            guesses = 0
        })


function restart() {
    $('.card').removeClass('match')
    $('.card').removeClass('open show')
    guesses = 0
    $('.moves').html('<span class="moves">'+guesses+'</span>')
    shuffle(deck) // use the shuffle function to re-order the elements in the deck

    // loop through each card, and append it to the deck in HTML??
    for (i=0; i<deck.length; i++) {
        card = deck[i];
        $('.deck').append(card)

    }
}

var instructions = `Welcome to this memory matching game.
Your goal is to get all cards face up. You do this by
finding pairs of cards with the same image on the
reverse. Choose a card and click to turn it over. Once
you memorize the image on the back of the card, click
another card that you think has the same image on its
reverse. If both images are the same, both cards will
stay face up. If the images are not the same, the cards
will turn back over. OK to play, Cancel to quit.`    

restart()

var play
function myFunction () {
    play = window.confirm(instructions);

    if (play === true) {
    $('.card').on("click")

        // Define needed variables//
        //------------------------//
        var thisGuess = 0
        var upCard1 = null
        var upCard2 = null
        var clickCount = 0
        var showCards = []

        // Define needed functions//
        //------------------------//        
        
        function turnCard(card) {
            card.addClass('match')
        }

        $('.card').click(function() {
            if (clickCount === 0) {
                turnCard($(this))
                clickCount += 1
                upCard1 = $(this)
                upCard1Class = upCard1.children().attr('class')   
            }

            else if (clickCount === 1) {
                clickCount += 1
                guesses +=1
                $('.moves').html('<span class="moves">'+guesses+'</span>')
                turnCard($(this))
                upCard2 = $(this)
                upCard2Class = upCard2.children().attr('class')
            
                if (upCard2Class === upCard1Class) {
                    upCard1.removeClass('match')
                    upCard1.addClass('open show')
                    upCard2.removeClass('match')
                    upCard2.addClass('open show')
                    clickCount = 0

                    shownCards = $('.show')
                    if (shownCards.length === 16) {
                        play = false
                        window.confirm('Win with '+guesses+' moves! Press "OK" to play again, "Cancel" to quit.')
                        // need to finish this function to get the play again to work
                    }
                }
                else {
                    clickCount = 0
                    setTimeout( function() {
                        upCard1.removeClass('match')
                        upCard2.removeClass('match')    
                    }, 700) 
                }
            }

            // need to add a else if (clickCount > 1) to stop turning cards over and reset
            
            // clickCount in case user keeps clicking around    
        })

        // indent level for if play === true 
//-------------------------------------------------------
    } // close bracket for the if play === true condition      
    
    // Not playing
    else {
        window.alert('Thank you, Goodbye!')}
}

/*
Things that are still broken
- Double clicking a card gets an open show
- Multi fast clicking more than one card shows multiple cards
- Need a stopwatch to time the game


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
