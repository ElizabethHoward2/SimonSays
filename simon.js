$(document).ready(function() {
    const maxTurns = 11;

    var interval;

    var counter = 0;
    var turnCount = 1;

    var computerClicks = [];
    var userClicks = [];

    var userTurn = false;
    var finished = false;

    var colors = ["red", "green", "blue"];
    var audioRed = $("#redSound")[0];
    var audioGreen = $("#greenSound")[0];
    var audioBlue = $("#blueSound")[0];

    //navbar hover menu
    $('ul.nav li.dropdown').hover(function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(500); //hover shows menu
    }, function() {
        $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(500);  //hide dropdown after hover
    });

    // will be called on click
    function fullTurn() {
        $(".gamebtn").prop("disabled", false);
        $("#start").prop("disabled", true);
        computerClicks = [];
        userClicks = [];

        // generate random array of clicks
        for (i = 0; i < turnCount; i++) {
            randomColor = colors[Math.floor(Math.random() * colors.length)];
            computerClicks.push(randomColor);
        }

        // every 1.5 sec click another one
        interval = setInterval(clickOnOneItem, 1500);

        if (turnCount < maxTurns) {
            turnCount++;
        } else {
            alert("You Won!");
        }
    }

    function compareClicks() {
        for (i = 0; i < userClicks.length; i++) {
            if (computerClicks[i] !== userClicks[i]) {
                alert("Simon says wrong move");
                userTurn = false;
            }
            // stop when user has clicked as many times as computer
            if (userClicks.length == computerClicks.length) {
                userTurn = false;
                userClicks = [];

                // need a delay so that the button effects can finish
                setTimeout(function() {
                    alert("Simon says you did good");
                    $("#start").prop("disabled", false);
                }, 1000);

                return true;
            }
        }
    }

    function clickOnOneItem() {
        // if no elements left in the array of moves
        if (counter >= computerClicks.length) {
            finished = true;
            counter = 0;
            clearInterval(interval);
            alert("Your turn");
            userTurn = true;
            return;
        }
        console.log(computerClicks[counter]);
        //  trigger a click by computer (pick it from array in order)
        $("#" + computerClicks[counter]).trigger("click");
        counter++;
    }

    // handles red/green/blue adding a class like brightBlue
    function btnClick() {
        var id = this.id;

        $("#" + id).addClass("bright" + id.charAt(0).toUpperCase() + id.slice(1));

        audioBlue.play();

        // second later remove the effect
        setTimeout(function() {
            $("#" + id).removeClass("bright" + id.charAt(0).toUpperCase() + id.slice(1));
        }, 800);


        if (userTurn) {
            userClicks.push(id);
            // if true then we won but have a small delay for audio / button effects
            // prevent user from pressing another button by disabling them in meantime
            if (compareClicks()) {
                $(".gamebtn").prop("disabled", true);
            }
        }
    }

    $("#red").click(btnClick);
    $("#green").click(btnClick);
    $("#blue").click(btnClick);

    $("#start").click(fullTurn);
});