function currentTime() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";

    if (hh == 0) {
        hh = 12;
    }
    if (hh > 12) {
        hh = hh - 12;
        session = "PM";
    }

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;

    let time = hh + ":" + mm + ":" + ss + " " + session;

    document.getElementById("clock").innerText = time;
    let t = setTimeout(function () { currentTime() }, 1000);
}
currentTime();
// display date
const userDate = new Date();
const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
const userdate2 = userDate.toLocaleDateString('en-US', options);
console.log(userdate2);
document.getElementById("monthDay").innerText = userdate2;

// time dependant greeting message

function updateTime() {

    //display the greeting message base on the hour range
    if (userDate.getHours() >= 6 && userDate.getHours() < 12) {
        document.getElementById('greeting').innerHTML = "Good Morning, &nbsp";
    } else if (userDate.getHours() > 12 && userDate.getHours() < 18) {
        document.getElementById('greeting').innerHTML = "Good Afternoon, &nbsp";
    } else if (userDate.getHours() >= 18 || userDate.getHours() < 6) {
        document.getElementById('greeting').innerHTML = "Good Evening, &nbsp";
    }

    //do the next check to the next full hour and 1 minute
    setTimeout(updateTime, (60 - userDate.getMinutes() + 1) * 60 * 1000);
}



document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    updateTime();

    function openModal($el) {
        localStorage.removeItem('username');
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });
});

// getting user's text input

function saveName() {
    const userInput = document.getElementById('userTyped').value;

    console.log("Saving user's name: " + userInput + "!");
    localStorage.setItem("username", userInput);




    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }
    closeAllModals();
    displayName();
}

function displayName() {
    const nameDisplay = document.getElementById("results");
    const userName = localStorage.getItem("username");

    nameDisplay.innerHTML = "<p> " + userName + " </p>"

    return false;
}


// displayName();

function checkUser() {



    function openModal() {
        document.getElementById("nameModal").classList.add('is-active');
    }


    if (localStorage.getItem("username") === null) {
        console.log("fuck!Fuck!")
        openModal();
    } else {
        displayName();
    }
}
document.body.addEventListener("load", checkUser());
console.log(localStorage.getItem("username"));