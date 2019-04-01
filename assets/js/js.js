document.getElementById("test").innerText = "This is the replacement text"

// Create an object called game to set all functions within the game...
var game = {
    // variables for the game
    crystalOne : {
        color : "",
        value : 0,
    },
    crystalTwo : {},
    crystalThree : this.newCrystal,
    crystalFour : {},
    // arrays that are helpful for the game

    // functions required for the game
    initialize : function() {

    },
    newCrystal : function() {
        this.color = "";
        this.value = 0;
    },
}

Object.assign(game.crystalTwo, game.crystalOne);

console.log(game.crystalOne);
console.log(game);
