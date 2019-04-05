// Create an object called game to set all functions within the game...
// Two things I want to do:
// Difficulty adjustments for the game Easy or Hard (higher P) I did this!
// use a sprite sheet to show images (lower P)




var game = {
    // variables for the game
    crystalSum : 0,
    magicNumber : 0,
    wins : 0,
    losses : 0,
    shopkeerObject : {
        isRandomChatter : false,
        chatterCountdown : 4,
        imageArray : ["./assets/images/Marlin.png", "./assets/images/Reese.png"],
        randomText : ["I wonder if Tom will stop by today... we've been behind on rent", "I'm surprised we haven't gone broke from all the things we buy from you!", "The cake is a lie.", "Thanks for being such a great mayor!", "We haven't seen you in a while, mayor. Thanks for dropping by.", "Isabella keeps the place tidy when you're off on your adventures.", "Rumor has it that this game is really easy if there's something worth 10 Bells..."]
    },
    // Can change difficulty to challenging or stay as standard
    difficulty : "challenging",
    // arrays that are helpful for the game
    crystalValueArray : [],
    // The values don't actually matter.... since the calculation of the magic number is based on the length of the array + 1.
    // Shows that the maximum number of each item for optimal solution is 4.
    gameSize : [1, 2, 3, 4],
    crystalImageArray : ["./assets/images/1.png", "./assets/images/2.png", "./assets/images/3.png", "./assets/images/4.png", 
    "./assets/images/5.png", "./assets/images/6.png", "./assets/images/7.png", "./assets/images/8.png",
    "./assets/images/9.png", "./assets/images/10.png", "./assets/images/11.png", "./assets/images/12.png",
    "./assets/images/13.png", "./assets/images/14.png", "./assets/images/15.png", "./assets/images/16.png", "./assets/images/17.png"],
        // Game isvariables
    isGameOn : false,
    // functions required for the game
    gameStart : function() {
        game.crystalValueArray = [7, 8, 9, 10, 11, 12];
        game.crystalImageLength = 17;
        game.crystalNumberArray = ["Zero", "One", "Two", "Three", "Four"]
        game.shuffle(game.crystalImageArray);
        $("#gems").text("");
        game.magicNumber = 0;
        game.crystalSum = 0;
        game.newCrystal();
        // shopkeeper elements. Chatbubble needs to be now so the gameon can check to see if text needs to be overwritten
        game.shopkeerObject.isRandomChatter = true;
        $("#chatbubble").text("Click on items to sell us stuff. Try to sell a total value equal to the magic number!");

        if(game.isGameOn === true) {
            $("#chatbubble").text("Looks like you're starting over! Maybe you'll have better luck this time.");
            game.losses += 1;
            $("#losses").text("Losses : " + game.losses);
        }
        game.magicNumber = Math.ceil(Math.random() * (game.gameSize.length + 1)) * $("#gemOne").attr("value") +
            Math.ceil(Math.random() * (game.gameSize.length + 1)) * $("#gemTwo").attr("value") +
            Math.ceil(Math.random() * (game.gameSize.length + 1)) * $("#gemThree").attr("value") +
            Math.ceil(Math.random() * (game.gameSize.length + 1)) * $("#gemFour").attr("value")
            // console.log(game.magicNumber)
        game.isGameOn = true;
        $("#magicnumberelement").text("Magic Number : " + game.magicNumber);
        $("#crystalsumelement").text("Crystal Sum : " + game.crystalSum);
        $("#wins").text("Wins : " + game.wins);
        $("#losses").text("Losses : " + game.losses);

        // console.log("Game has been started!")
        // console.log(game.crystalSum);
        // console.log(game);
    },
    newCrystal : function() {
        // crystal.color = "";
        // var arrayValue = Math.floor(Math.random() * game.crystalValueArray.length)
        // crystal.value = game.crystalValueArray[arrayValue];
        // game.crystalValueArray.splice(arrayValue, 1);


        // First create a for loop that creates 4 objects
        for(i=1; i<5; i++) {
            // Create a div with a class of col-3 and another blank class for now
            var gemDiv = $("<div>");
            gemDiv.addClass("col-6 col-sm-3 gemcolclass");
            // Create an image with a unique ID based on the loop description
            var gemImage = $("<img>");
            gemImage.attr("id", "gem"+game.crystalNumberArray[i]);
            // Assign the various properties required: image, category, value
            gemImage.attr("src", game.crystalImageArray[i-1]);
            gemImage.addClass("gemclass img-fluid mx-auto d-block float-left");
            // Do the thing to get the value
            var arrayValue = Math.floor(Math.random() * game.crystalValueArray.length);
            gemImage.attr("value", game.crystalValueArray[arrayValue]);
            gemImage.attr("quantity", 5);
            gemImage.attr("wordnumber", game.crystalNumberArray[i]);
            // Splice the value so each thing has a different value
            game.crystalValueArray.splice(arrayValue, 1);
            // Insert the image into the div
            gemDiv.append(gemImage);
            if(game.difficulty === "challenging") {
                var gemQuantity = $("<div>");
                gemQuantity.attr("id", "quantitygem"+game.crystalNumberArray[i]);
                gemQuantity.text("x5");
                gemDiv.append(gemQuantity);
            };
            // Append the div into the <div id="gems">
            $("#gems").append(gemDiv);
        }
    },
    shuffle : function(array) {
        for(i=0; i<array.length; i++) {
            var randIndex = Math.floor(Math.random() * array.length);
            var tempValue = array[i];
            array[i] = array[randIndex];
            array[randIndex] = tempValue;
        }
    }
// The this set the game's values.
    // testFunction : function() {
    //     this.color = "";
    //     this.value = 0;
    // },
    // color : "red",
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~ for all files in a folder, create an image that has the properties based on the base folder



console.log(game);

$("#shopkeeper").click(function() {
    game.gameStart();
})

// When you dynamically create things, the onclick needs something to attach to in order for it to exist. This script attaches as soon as the page is run/gets to this point
$(document).on("click", ".gemclass", function() {
    // console.log("this click worked!")
    // console.log(Math.ceil(Math.random() * (game.gameSize.length + 1)) * $("#gemOne").attr("value"))
    if(game.isGameOn === true) {
        // Check the difficulty of the game... and if it's challenging whether the quantity is greater than 0.
        if((game.difficulty === "challenging" && parseInt($(this).attr("quantity"))>0) || game.difficulty ==="standard") {
            // Update the crystal sum with the value
            game.crystalSum = game.crystalSum + parseInt($(this).attr("value"));
            $("#crystalsumelement").text("Crystal Sum : " + game.crystalSum);

            // Update the attribute quantity for all games, but only consider it in the logic for challenging games
            $(this).attr("quantity", parseInt($(this).attr("quantity")) - 1);
            console.log($(this));
            console.log($(this).attr("wordnumber"));
            // Update the div #quantitygemNumber with new text for the value
            // document.getElementById("#quantitygem"+$(this).gemnumber).innerText = "x"+$(this).quantity
            $("#quantitygem"+$(this).attr("wordnumber")).text("x"+$(this).attr("quantity"));
            // console.log(game.crystalSum);
            // Random Chatter
            if(game.shopkeerObject.isRandomChatter === true) {
                game.shopkeerObject.chatterCountdown -= 1;
                if(game.shopkeerObject.chatterCountdown === 0) {
                    game.shopkeerObject.chatterCountdown = Math.floor(Math.random() * 4 + 4)
                    $("#chatbubble").text(game.shopkeerObject.randomText[Math.floor(Math.random() * game.shopkeerObject.randomText.length)]);
                }
            };
        }
        // This triggers when the quantity is 0 for challenging games, but the shopkeer alerts you that you ran out of that item and need to try selling something else
        else {
            $("#chatbubble").text("You ran out of that item to sell! You'll need to try selling something else.");
        }
            // Game win conditions
        if(game.crystalSum >= game.magicNumber) {
            if(game.crystalSum === game.magicNumber) {
                game.shopkeerObject.isRandomChatter = false;
                $("#chatbubble").text("Hey, you did it! Show me you can do it one more time!");
                game.wins += 1;
                $("#wins").text("Wins : " + game.wins);
                game.isGameOn = false;
            }
            else {
                game.shopkeerObject.isRandomChatter = false;
                $("#chatbubble").text("Aww, you were so close! Maybe you should try again!");
                game.losses += 1;
                $("#losses").text("Losses : " + game.losses);
                game.isGameOn = false;
                console.log(game)
            }
        }
    }
})

