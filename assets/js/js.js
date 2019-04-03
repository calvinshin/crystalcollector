// Create an object called game to set all functions within the game...
var game = {
    // variables for the game
    crystalSum : 0,
    magicNumber : 0,
    wins : 0,
    losses : 0,
    shopkeerObject : {
        isRandomChatter : false,
        imageArray : ["./assets/images/Marlin.png", "./assets/images/Reese.png"]
    },
    // arrays that are helpful for the game
    crystalValueArray : [],
    gameSize : [1, 2, 3, 4],
    crystalImageArray : ["./assets/images/marlin.png", "./assets/images/fossil.png", "./assets/images/snail.png", "./assets/images/The Nightwatch.jpg"],
    // Game isvariables
    isGameOn : false,
    // functions required for the game
    gameStart : function() {
        game.crystalValueArray = [7, 8, 9, 10, 11, 12];
        game.crystalImageArray = ["./assets/images/marlin.png", "./assets/images/fossil.png", "./assets/images/snail.png", "./assets/images/The Nightwatch.jpg"];
        game.crystalNumberArray = ["Zero", "One", "Two", "Three", "Four"]
        $("#gems").text("");
        game.magicNumber = 0;
        game.crystalSum = 0;
        game.newCrystal();
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
        // shopkeeper elements
        game.shopkeerObject.isRandomChatter = true;
        $("#chatbubble").text("Try to sell us stuff equal to the magic number!");
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
            gemImage.addClass("gemclass img-fluid mx-auto d-block");
            // Do the thing to get the value
            var arrayValue = Math.floor(Math.random() * game.crystalValueArray.length);
            gemImage.attr("value", game.crystalValueArray[arrayValue]);
            // Splice the value so each thing has a different value
            game.crystalValueArray.splice(arrayValue, 1);
            // Insert the image into the div
            gemDiv.append(gemImage);
            // Append the div into the <div id="gems">
            $("#gems").append(gemDiv);
        }
    },
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
    console.log("this click worked!")
    // console.log(Math.ceil(Math.random() * (game.gameSize.length + 1)) * $("#gemOne").attr("value"))
    if(game.isGameOn === true) {
        game.crystalSum = game.crystalSum + parseInt($(this).attr("value"));
        console.log(game.crystalSum);
        $("#crystalsumelement").text("Crystal Sum : " + game.crystalSum);
        if(game.crystalSum >= game.magicNumber) {
            if(game.crystalSum === game.magicNumber) {
                game.shopkeerObject.isRandomChatter = false;
                $("#chatbubble").text("Hey, you did it! Just show me you can do it one more time!");
                game.wins += 1;
                $("#wins").text("Wins : " + game.wins);
            }
            else {
                game.shopkeerObject.isRandomChatter = false;
                $("#chatbubble").text("Aww, you were close! Maybe you should try again!");
                game.losses += 1;
                $("#losses").text("Losses : " + game.losses);
            }
        }
    }
})

