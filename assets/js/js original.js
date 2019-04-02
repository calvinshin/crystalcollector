document.getElementById("test").innerText = "This is the replacement text"

// Create an object called game to set all functions within the game...
var game = {
    // variables for the game
    crystalOne : {
        color : "",
        value : 0,
    },
    crystalTwo : {},
    crystalThree : {},
    crystalFour : {},
    crystalSum : 0,
    magicNumber : 0,
    // arrays that are helpful for the game
    crystalValueArray : {},
    gameSize : [1, 2, 3, 4, 5, 6],
    // Game isvariables
    isGameOn : false,
    // functions required for the game
    gameStart : function() {
        game.crystalValueArray = [7, 8, 9, 10, 11, 12];
        game.newCrystal(game.crystalOne);
        game.newCrystal(game.crystalTwo);
        game.newCrystal(game.crystalThree);
        game.newCrystal(game.crystalFour);
        game.magicNumber = Math.round(Math.random() * game.gameSize.length)*game.crystalOne.value +
            Math.round(Math.random() * game.gameSize.length)*game.crystalTwo.value +
            Math.round(Math.random() * game.gameSize.length)*game.crystalThree.value +
            Math.round(Math.random() * game.gameSize.length)*game.crystalFour.value
        game.isGameOn = true;
        console.log("Game has been started!")
        console.log(game);
    },
    newCrystal : function(crystal) {
        crystal.color = "";
        var arrayValue = Math.floor(Math.random() * game.crystalValueArray.length)
        crystal.value = game.crystalValueArray[arrayValue];
        game.crystalValueArray.splice(arrayValue, 1);
        // First create a for loop that creates 4 objects
            // Create a div with a class of col-3 and another blank class for now
            // Create an image with a unique ID based on the loop description
            // Assign the various properties required: image, category, value
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

$(".gem").click(function() {
    if(game.isGameOn === true) {
        game.crystalSum += this.value;
        console.log(this.value);
    }
})

$("#shopkeeper").click(function() {
    game.gameStart();
})