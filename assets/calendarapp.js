




//function to access and sign out 

const CLIENT_ID = '291615247325-m7onfiaasm8b1gfqvnjt5subllp6kjfk.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDoVq1ZqFtgMxdPLv9VlmNdB7Y4lucghlo';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events';

let tokenClient;
let gapiInited = false;
let gisInited = false;

document.getElementById('authorize_button').className = "card-footer-item has-background-info has-text-info-light ";
document.getElementById('signout_button').className = "card-footer-item is-invisible";
document.getElementById('googleEventsBtn').className = "card-footer-item is-invisible";
document.getElementById('googleEvents').innerText = "You can view Google Calendar Events here when Logged in!";

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  gapi.load('client', intializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function intializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
  maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById('authorize_button').className = "card-footer-item has-background-info has-text-info-light";
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    document.getElementById('signout_button').className = "card-footer-item has-background-info-dark has-text-link-light";
    document.getElementById('googleEventsBtn').className = "card-footer-item has-background-info-dark has-text-link-light";
    document.getElementById('authorize_button').className = "card-footer-item is-invisible";
    // loading();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({ prompt: '' });
  }
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    document.getElementById('googleEvents').innerText = "You can view Google Calendar Events here when Logged in!";
    document.getElementById('authorize_button').className = "card-footer-item has-background-info has-text-info-light";
    document.getElementById('signout_button').className = "card-footer-item is-invisible";
    document.getElementById('googleEventsBtn').className = "card-footer-item is-invisible";
  }
}


/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
async function listUpcomingEvents() {
  let response;
  try {
    const request = {
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime',
    };
    response = await gapi.client.calendar.events.list(request);
  } catch (err) {
    document.getElementById('googleEvents').innerText = "[Error Message: " + err.message + " ]";
    return;
  }

  const events = response.result.items;
  if (!events || events.length == 0) {
    document.getElementById('googleEvents').innerText = 'No events found.';
    return;
  }

  // Flatten to string to display
  const output = events.reduce(
    (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
    'Events:\n');
  document.getElementById('googleEvents').innerText = output;
}

// function loading() {
//   document.getElementById('googleEvents').innerText = ' events found.';
//   var event = {
//     'summary': 'Google I/O 2022',
//     'location': '800 Howard St., San Francisco, CA 94103',
//     'description': 'A chance to hear more about Google\'s developer products.',
//     'start': {
//       'dateTime': '2022-05-28T09:00:00-07:00',
//       'timeZone': 'America/Los_Angeles'
//     },
//     'end': {
//       'dateTime': '2022-05-28T17:00:00-07:00',
//       'timeZone': 'America/Los_Angeles'
//     },
//     'recurrence': [
//       'RRULE:FREQ=DAILY;COUNT=2'
//     ],
//     'attendees': [
//       { 'email': 'lpage@example.com' },
//       { 'email': 'sbrin@example.com' }
//     ],
//     'reminders': {
//       'useDefault': false,
//       'overrides': [
//         { 'method': 'email', 'minutes': 24 * 60 },
//         { 'method': 'popup', 'minutes': 10 }
//       ]
//     }
//   };

//   gapi.client.load('calendar', 'v3').then(function () {
//     var request = gapi.client.calendar.events.insert({
//       'calendarId': 'primary',
//       'resource': event
//     });

//     request.execute(function (event) {
//       appendPre('Event created: ' + event.htmlLink);
//     });
//   })


// }


//Calendar Function
const date = new Date();

const renderCalendar = () => {
  date.setDate(1);


  const monthDays = document.getElementById("days");

  const lastDay = new Date(date.getFullYear(),
    date.getMonth() + 1, 0).getDate();

  const prevLastDay = new Date(date.getFullYear
    (), date.getMonth(), 0).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.getElementById('monthname').innerHTML
    = months[date.getMonth()];

  let days = "";

  //for(let i = 1; i <= lastDay; i++){
  // days += `<div>${i}</div>`;
  //monthDays.innerHTML = days;
  //   }

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<span class="prev-date is-size-4 py-6">${prevLastDay - x + 1}</span>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i === new Date().getDate() && date.
      getMonth() === new Date().getMonth()) {
      days += `<span class="today is-size-4 py-6">${i}</span>`;
    } else {
      days += `<span class="is-size-4 py-6">${i}</span>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<span class="next-date is-size-4 py-6">${j}</span>`;
    monthDays.innerHTML = days;
  }
  //if(i=== new Date().getDate()&& date.
  //getMonth()=== new Date().getMonth())
}



document.getElementById('prev').
  addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1)
    renderCalendar();
  });

document.getElementById('next').
  addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1)
    renderCalendar();
  });

renderCalendar();

// add events section
//variables
let eventbg = document.querySelector(".event-bg");
let addevent = document.querySelector("#addevent");
let eventname = document.querySelector(".eventname");
let eventbtn = document.querySelector("#event-btn");

eventbtn.addEventListener("click", () => {
  eventbg.classList.add("is-flex");
})

addevent.addEventListener("click", () => {
  eventbg.classList.remove("none");
})

//todays event modal

let dayEvent = document.querySelector(".eventmodal-bg");
let dailyclosebtn = document.querySelector("#dailyclose-btn");
let today = document.querySelector(".today");


today.addEventListener("click", () => {
  dayEvent.classList.add("is-flex");
})

dailyclosebtn.addEventListener("click", () => {
  dayEvent.classList.remove("none");
})

let evntname = document.querySelector("#eventname");
let evntdes = document.querySelector("#eventdes");
let evnttype = document.querySelector("#type");
let evntinfo = document.querySelector("#info");

function EvntTypeInput() {

  evnttype.innerHTML = evntname.value;

}

function EvntDesInput() {

  evntinfo.innerHTML = evntdes.value;

}
