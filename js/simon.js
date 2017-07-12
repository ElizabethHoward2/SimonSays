$(document).ready(function() {
  var colors = ["red", "green", "blue"];
  var turns = ["oneTurn", "oneTurn"];
  var computerClicks = [];
  var userClicks = [];
  var userTurn = false;
  var counter = 0;
  var finished = false;
  var interval;
 
  // functions called in computer Turn
  function getRandom() {
    randomColor = colors[Math.floor(Math.random() * colors.length)];
    computerClicks.push(randomColor);
    console.log("get random result is = " + computerClicks);
  }
  function generatePattern() {
    for (i = 0; i < turns.length; i++) {
      getRandom();
    }
  }
 
  function addTurns() {
    if (turns.length < 11) {
      turns.push("oneTurn");
      console.log(turns);
    } else {
      alert("You Won!");
    }
  }
  // will be called on click
  function fullTurn() {
    $(".gamebtn").prop("disabled", false);
    $("#start").prop("disabled", true);
    computerClicks = [];
    userClicks = [];
    // gets random values in accordance to turns.length
    generatePattern();
    createClick();
    // adds to turns.length
    addTurns();
  }
  // sound effects on click
  $("#start").click(fullTurn);
 

function compareClicks() {
  for (i=0; i < userClicks.length; i++) {
    if (computerClicks[i] !== userClicks[i]) {
      console.log("computer's clicks " + computerClicks[i] + "user's clicks " + userClicks[i]);
      alert ("Simon says wrong move");
      userTurn = false;
      console.log("user turn is false");
    }
    if (userClicks.length == computerClicks.length) {
      userTurn = false;
      console.log("user turn is false");
      console.log("computer's clicks " + computerClicks[i] + "user's clicks " + userClicks[i]);
      alert ("Simon says you did good");
      userClicks = [];
      $(".gamebtn").prop("disabled", true);
      $("#start").prop("disabled", false);
    }
  }
}

  function createClick() {
    interval = setInterval(clickOnOneItem, 1000);
  }
 
  function clickOnOneItem() {
    // if no elements left in the array of moves
    if (counter >= computerClicks.length) {
      finished = true;
      counter = 0;
      clearInterval(interval);
      console.log("Clearing interval");
      alert("Your turn");
      userTurn = true;
      console.log("user turn is true");
      return;
    }

    var item = computerClicks[counter];
    handleColorClick(item);
    counter++;
  }
 
  function handleColorClick(item) {
    console.log("computer clicked " + item);
    $("#" + item).trigger("click");
  }
 
  var audioRed = $("#redSound")[0];
  var audioGreen = $("#greenSound")[0];
  var audioBlue = $("#blueSound")[0];

  function turnButtonOffGreen() {
    setTimeout(function(){$("#green").removeClass("brightGreen"); }, 3000);
  }
  function turnButtonOffRed() {
    setTimeout(function(){$("#red").removeClass("brightRed"); }, 3000);
  }
  function turnButtonOffBlue() {
    setTimeout(function(){$("#blue").removeClass("brightBlue"); }, 3000);
  }
 
  function testRed() {
    $("#green").removeClass("brightGreen");
    $("#blue").removeClass("brightBlue");
    $("#red").addClass("brightRed");
    audioRed.play();
    turnButtonOffRed();
    if (userTurn === true) {
      console.log("it is logging user clicks");
      console.log("pushing " + "blue" + " into userClicks")
      userClicks.push("red");
      compareClicks();
    }
  }
 
  function testGreen() {
    $("#red").removeClass("brightRed");
    $("#blue").removeClass("brightBlue");
    $("#green").addClass("brightGreen");
    audioGreen.play();
    turnButtonOffGreen();
    if (userTurn === true) {
      console.log("it is logging user clicks");
      console.log("pushing " + "blue" + " into userClicks")
      userClicks.push("green");
      compareClicks();
    }
  }
 
  function testBlue() {
    $("#red").removeClass("brightRed");
    $("#green").removeClass("brightGreen");
    $("#blue").addClass("brightBlue");
    audioBlue.play();
    turnButtonOffBlue();
    if (userTurn === true) {
      console.log("it is logging user clicks");
      console.log("pushing " + "blue" + " into userClicks")
      userClicks.push("blue");
      compareClicks();
    }
  }

  function doNothing() {
    console.log("spinning");
    buttonClicked = true;
  }
 
  $("#red").click(function() {
    testRed();
  });
 
  $("#green").click(function() {
    testGreen();
  });
 
  $("#blue").click(function() {
    testBlue();
  });
});