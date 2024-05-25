const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
};

/**
 * Initial the data, calendar and eventList when the web load.
 */
window.onload = function() {
    initialData().then(() => {
        initialCalendar();
        initialEventList();
    });
}

/**
 * Initial sample data from sample.json to the localstorage.
 */
async function initialData() {
    const response = await fetch("../javascript/sample.json");
    const data = await response.json();
    localStorage.setItem("data", JSON.stringify(data));
}


/**
 * initial the Calendar with the current date
 */
function initialCalendar() {
    var year = document.getElementById("year");
    var month = document.getElementById("month");
    var date = new Date();
    //set the year from 1990 to 2030
    for(var i = 2030; i >= 1990; i--) {
        var sel = document.createElement("option");
        sel.value = i;
        sel.innerText = i;
        if (i == date.getFullYear()) {
            sel.selected = true;
        }
        year.appendChild(sel);
    }
    //set the month from 1 to 12
    for(var i = 1; i <= 12; i++) {
        var sel = document.createElement("option");
        sel.value = i;
        sel.innerText = months[i];
        if (i == date.getMonth() + 1) {
            sel.selected = true;
        }
        month.appendChild(sel);
    }
    setDate();
}

document.querySelector("#year").addEventListener("change", () => {
    setDate();
});

document.querySelector("#month").addEventListener("change", () => {
    setDate();
});

/**
 * Fill calendar with dates
 */
function setDate() {
    var week = 0;
    var day = 1;
    var days = 30;
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;
    var tBody = document.getElementById("tbody");
    var date = new Date(year + "-" + month + "-1"); //get the selected date

    //clear the calendar
    var clearList = document.getElementsByClassName("trList");
    for(var i = 0; i < clearList.length;) {
        clearList[0].remove();
    }

    //get the numbers of day in a month
    var data = new Date(year, month, 0);
    days = data.getDate();

    //fill out the blank date at the beginning of the month
    var newtr = document.createElement("tr");
    newtr.classList.add("trList");
    for (var i = 0; i < date.getDay(); i++) {
        if (week == 7) {
            week = 0;
        }
        var newtd = document.createElement("td");
        newtr.appendChild(newtd);
        week++;
    }
    //fill out the rest day of the first week
    if (week <= 6) {
        for (; week <= 6; week++, day++) {
            var newtd = document.createElement("td");
            newtd.innerText = day;
            newtd.id = `${year}-${month}-${day}`;
            newtr.appendChild(newtd);
        }
    }

    //fill out the calendar
    tBody.appendChild(newtr);
    week = 0;
    newtr = document.createElement("tr");
    newtr.classList.add("trList");
    for(; day <= days; day++, week++) {
        if (week == 7) {
            week = 0;
            tBody.appendChild(newtr);
            newtr = document.createElement("tr");
            newtr.classList.add("trList");
        }
        var newtd = document.createElement("td");
        newtd.innerText = day;
        newtd.id = `${year}-${month}-${day}`;
        newtr.appendChild(newtd);
    }
    tBody.appendChild(newtr);
    initialEventList();
}

/**
 * initial the event list to the calendar when the mouse hover
 */
function initialEventList() {
    var data = JSON.parse(localStorage.getItem("data"));
    var eventList = data.EventList;
    console.log(eventList);
    for (var i = 0; i < eventList.length; i++) {
        var date = eventList[i].date;
        var td = document.querySelector(`td[id="${date}"]`);
        if (td) {
            //if the event already show in the calendar, continue.
            if (document.querySelector(`div[id=${eventList[i].eventId}]`)) {
                continue;
            }

            //create a eventDiv div for the color box
            var eventDiv = document.createElement("div");
            eventDiv.classList.add("event");
            eventDiv.textContent = eventList[i].eventName;
            eventDiv.id = eventList[i].eventId;
            eventDiv.style.backgroundColor = eventList[i].color;

            // Create a tooltip div for the event details
            var tooltipDiv = document.createElement("div");
            tooltipDiv.className = 'tooltip';
            
            //event content detail
            var textContent = 
            `${eventList[i].eventName}
            <br>
            <br>
            deadline:&nbsp;${eventList[i].date}&nbsp;${eventList[i].time}
            <br>
            <br>
            ${eventList[i].description}
            <br>
            <br>
            completeteness: ${eventList[i].completeness}%
            `;
            tooltipDiv.innerHTML = textContent;

            eventDiv.appendChild(tooltipDiv);

            td.appendChild(eventDiv);
        } else {
            console.log(`No event found on ${date}`);
        }
    }
}