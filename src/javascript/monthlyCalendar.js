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

const monthsNameToNum = {
    "January": "1",
    "February": "2",
    "March": "3",
    "April": "4",
    "May": "5",
    "June": "6",
    "July": "7",
    "August": "8",
    "September": "9",
    "October": "10",
    "November": "11",
    "December": "12"
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
    let year = document.getElementById("year");
    let month = document.getElementById("month");
    let date = new Date();
    //set the year from 1990 to 2030
    for(let i = 2030; i >= 1990; i--) {
        let sel = document.createElement("option");
        sel.value = i;
        sel.innerText = i;
        if (i == date.getFullYear()) {
            sel.selected = true;
        }
        year.appendChild(sel);
    }
    //set the month from 1 to 12
    for(let i = 1; i <= 12; i++) {
        let sel = document.createElement("option");
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
    let week = 0;
    let day = 1;
    let days = 30;
    let year = document.getElementById("year").value;
    let month = document.getElementById("month").value;
    let tBody = document.getElementById("tbody");
    let date = new Date(year + "-" + month + "-1"); //get the selected date

    //clear the calendar
    let clearList = document.getElementsByClassName("trList");
    for(let i = 0; i < clearList.length;) {
        clearList[0].remove();
    }

    //get the numbers of day in a month
    let data = new Date(year, month, 0);
    days = data.getDate();

    //fill out the blank date at the beginning of the month
    let newtr = document.createElement("tr");
    newtr.classList.add("trList");
    for (let i = 0; i < date.getDay(); i++) {
        if (week == 7) {
            week = 0;
        }
        let newtd = document.createElement("td");
        newtr.appendChild(newtd);
        week++;
    }
    //fill out the rest day of the first week
    if (week <= 6) {
        for (; week <= 6; week++, day++) {
            let newtd = document.createElement("td");
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
        let newtd = document.createElement("td");
        newtd.innerText = day;
        newtd.id = `${year}-${month}-${day}`;
        newtr.appendChild(newtd);
    }
    tBody.appendChild(newtr);
    initialEventList();
}


function convertDate(dateStr) {
    // Separate date string
    const [monthName, day, year] = dateStr.replace(',', '').split(' ');
    // Get the digital representation of the month
    const month = monthsNameToNum[monthName];
    return `${year}-${month}-${day}`;
}

/**
 * initial the event list to the calendar when the mouse hover
 */
function initialEventList() {
    let eventList = JSON.parse(localStorage.getItem("tasks"));
    console.log(eventList);
    for (let i = 0; i < eventList.length; i++) {
        let dateTime = eventList[i].dateTime.split("at");

        let time = dateTime[1];
        let date = convertDate(dateTime[0]);
        let eventId = date + "-" + time;

        let td = document.querySelector(`td[id="${date}"]`);
        if (td) {
            //if the event already show in the calendar, continue.
            if (document.querySelector(`div[id="${eventId}"]`)) {
                continue;
            }

            //create a eventDiv div for the color box
            let eventDiv = document.createElement("div");
            eventDiv.classList.add("event");
            eventDiv.textContent = eventList[i].eventName;
            eventDiv.id = eventId;
            eventDiv.style.backgroundColor = eventList[i].color;

            // Create a tooltip div for the event details
            let tooltipDiv = document.createElement("div");
            tooltipDiv.className = 'tooltip';
            
            //event content detail
            let textContent = 
            `${eventList[i].eventName}
            <br>
            <br>
            deadline:&nbsp;${date}&nbsp;${time}
            <br>
            <br>
            ${eventList[i].description}
            <br>
            <br>
            completeteness: ${eventList[i].checked}
            `;
            tooltipDiv.innerHTML = textContent;

            eventDiv.appendChild(tooltipDiv);

            td.appendChild(eventDiv);
        } else {
            console.log(`No event found on ${date}`);
        }
    }
}