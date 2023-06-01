/*
  Caroline Engqvist (caen1500)
  caen1500
  caen1500@student.miun.se
 */

function browser() {
    let sBrowser, sUsrAg = navigator.userAgent;

    // The order matters here, and this may report false positives for unlisted browsers.

    if (sUsrAg.indexOf("Firefox") > -1) {
        sBrowser = "Mozilla Firefox";
        // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
    } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
        sBrowser = "Samsung Internet";
        // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
    } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
        sBrowser = "Opera";
        // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
    } else if (sUsrAg.indexOf("Trident") > -1) {
        sBrowser = "Microsoft Internet Explorer";
        // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
    } else if (sUsrAg.indexOf("Edge") > -1) {
        sBrowser = "Microsoft Edge";
        // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
    } else if (sUsrAg.indexOf("Chrome") > -1) {
        sBrowser = "Google Chrome or Chromium";
        // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
    } else if (sUsrAg.indexOf("Safari") > -1) {
        sBrowser = "Apple Safari";
        // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
    } else {
        sBrowser = "unknown";
    }
    document.getElementById("javaScript").innerHTML = "You are browsing on: " + sBrowser;
}

// visning av stor bild
function display( imgfile ) {
    let bigImage = document.getElementById("imgCover");
  // bigImage.setAttribute("style", "width: 0px; height: 0px;");
    bigImage.setAttribute("src", "img/" + imgfile);
    bigImage.setAttribute("alt", "Large version of " + imgfile );
}
// Förstorar bilden man klickar på
function thumb(images) {
    document.getElementById(images[0]).addEventListener("click", function() { display(images[1]); }, false);
    document.getElementById(images[2]).addEventListener("click", function() { display(images[3]); }, false);
    document.getElementById(images[4]).addEventListener("click", function() { display(images[5]); }, false);
    document.getElementById(images[6]).addEventListener("click", function() { display(images[7]); }, false);
}
/* Ritar upp platserna i en 2d array om ingen array finns sparad så är alla platser gröna
   och om array finns sparad kontrolleras färgen med den sparade arrayen. för varje plats
   sparas platsnummer och färg. */
function drawSeatMap() {
    let doc = document.getElementById('seats'),
        ctx = doc.getContext('2d');
    let seatNr = 0;
    let color = 'green';
    let newSeatArray;
    let seats = JSON.parse(sessionStorage.getItem("seats")); // Laddar eventuellt sparad array
    ctx.beginPath();
    newSeatArray = new Array(6);
    for (let y = 0; y < 6; y++) {
        newSeatArray[y] = new Array(3);
        for (let x = 0; x < 3; x++) {
            if (seats !== null) {
                color = seats[y][x].Status;
            }
            seatNr++;
            ctx.save();
            ctx.fillStyle = color;
            ctx.translate(x * 30, y * 30);
            ctx.fillRect(0, 0, 25, 25);
            ctx.restore();
            newSeatArray[y][x] = {Nr: seatNr, Status: color};
        }
    }
    ctx.closePath();
    sessionStorage.setItem("seats", JSON.stringify(newSeatArray)); // Sparar arrayen
}
/* Om det klickas i platskartan kontrolleras kordinaterna samt viken färg det är där det klickas
*  Rutan blir blå endast om det från början är grönt och ingen annan ruta är blå. Är rutan röd går
* den ej att reservera och om rutan är blå så ändras den till grön och labels med nummer och klass
* nollställs.
* */
function reserveSeat(e) {
    let doc = document.getElementById('seats'),
        ctx = doc.getContext('2d');
    let klass;
    let seat;
    let seats = JSON.parse(sessionStorage.getItem("seats"));
    if (ctx.getImageData(e.offsetX,
        e.offsetY, 1, 1).data.toString() === "0,0,255,255") {   // om rutan är blå
        ctx.fillStyle = 'green';
        ctx.fillRect(Math.floor(e.offsetX / 30) * 30, Math.floor(e.offsetY / 30) * 30, 25, 25);
        seats[Math.floor(e.offsetY / 30)][Math.floor(e.offsetX / 30)].Status = 'green'; // Ändrar färg till grön
        document.getElementById("seat").value ="";
        document.getElementById("klass").value ="";

    } else if (ctx.getImageData(e.offsetX,
        e.offsetY, 1, 1).data.toString() === "255,0,0,255") {   // Om rutan är röd
        alert("Platsen är ej bokningsbar!");
    } else if (ctx.getImageData(e.offsetX,  // om rutan är grön samt inget värde finns för lablel seat.
        e.offsetY, 1, 1).data.toString() === "0,128,0,255" && document.getElementById("seat").value === "") {
        ctx.fillStyle = 'blue';
        ctx.fillRect(Math.floor(e.offsetX / 30) * 30, Math.floor(e.offsetY / 30) * 30, 25, 25);
        seat = seats[Math.floor(e.offsetY / 30)][Math.floor(e.offsetX / 30)].Nr;
        seats[Math.floor(e.offsetY / 30)][Math.floor(e.offsetX / 30)].Status = 'blue'; // ändrar för till blå
        document.getElementById("seat").value = seat; // tilldelar seat label vilken plats som resarveras
        if (seat > 0 && seat < 7)
            klass = "Affärsklass";
        else if (seat > 6 && seat < 19)
            klass = "Ekonomiklass";
        document.getElementById("klass").value = klass; // tilldelar klass label vilken klass platsen har.

    }
    sessionStorage.setItem("seats", JSON.stringify(seats)); // Sparar ändringar i plats arrayen.
    sessionSet(); // sparar bokningformuläret.
}

/* När knappen book klickas, ändras värdet på färg för den reserverade platsen i arrayen
* om plats inte är reserverad slutförs inte bokningen
* */
function booking() {
    let seats = JSON.parse(sessionStorage.getItem("seats"));
    let first = document.getElementById("firstName");
    let last = document.getElementById("lastName");
    let sec = document.getElementById("secNr");
    let seat = document.getElementById("seat");
    if (seat.value !== "" && first.value !== "" && last.value !== "" && sec.value !== "") {
        for (let i = 0; i < seats.length; i++) {
            let row = seats[i];
            for (let j = 0; j < row.length; j++) {
                if (seats[i][j].Nr.toString() === seat.value) {
                    seats[i][j].Status = 'red';
                }
            }
        }
        sessionStorage.setItem("seats", JSON.stringify(seats));
        sessionSet(); // Säkerställer att inskrivna uppgifter finns sparade
        boardingCard();
    }
    else
        alert("Du måste ange alla uppgifter för att boka!");
}
/* Boarding pass öppnas i ny sida med namn, personnummer, plats och klass som bokningen gäller */
function boardingCard() {

    let boardingCardW = window.open('', 'mywindow', 'status=1,width=400,height=400');
    boardingCardW.document.write('<html><head><title>Boarding card</title><link rel="stylesheet" href="css/style.css"></head>');
    boardingCardW.document.write('<body class ="pass">');
    boardingCardW.document.write('<p id = "name"></p>');
    boardingCardW.document.write('<p id = "sec"></p>');
    boardingCardW.document.write('<p id = "seatAndClass"></p>');
    boardingCardW.document.write('</body></html>');
    boardingCardW.document.getElementById("name").innerText = "Namn: " + sessionStorage.getItem("firstName") + " " + sessionStorage.getItem("lastName");
    boardingCardW.document.getElementById("sec").innerText = "Personnummer: " + document.getElementById("secNr").value;
    boardingCardW.document.getElementById("seatAndClass").innerText = "Seat: " + sessionStorage.getItem("seat") + " Class: " + sessionStorage.getItem("klass");
    reset();    // Reservationen är nu bokad och formuläret nollställs
}
/* Tar bort inmatade uppgifter och ändrar eventuell blå ruta till grön.
* röda (redan bokade) påverkas ej.
* */
function reset () {
    let seats = JSON.parse(sessionStorage.getItem("seats"));
    for(let i = 0; i < seats.length; i++) {
        let row = seats[i];
        for(let j = 0; j < row.length; j++) {
            if (seats[i][j].Status === 'blue') {
                seats[i][j].Status = 'green';
            }
        }
    }
    sessionStorage.clear();
    sessionStorage.setItem("seats", JSON.stringify(seats));
    sessionLoad();
    location.reload(); // Laddar om sidan för att platskartan ska uppdateras med rätt färg
}
/* sparar aktuell inmatning till sessionstorage */
function sessionSet() {
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let secNr = document.getElementById("secNr");
    let seat = document.getElementById("seat");
    let klass = document.getElementById("klass");
    sessionStorage.setItem("firstName", firstName.value);
    sessionStorage.setItem("lastName", lastName.value);
    sessionStorage.setItem("secNr", secNr.value);
    sessionStorage.setItem("seat", seat.value);
    sessionStorage.setItem("klass", klass.value);
}
/* Laddar sparad info till inmatningfältet */
function sessionLoad() {
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let secNr = document.getElementById("secNr");
    let seat = document.getElementById("seat");
    let klass = document.getElementById("klass");
    firstName.value = sessionStorage.getItem("firstName");
    lastName.value = sessionStorage.getItem("lastName");
    secNr.value = sessionStorage.getItem("secNr");
    seat.value = sessionStorage.getItem("seat");
    klass.value = sessionStorage.getItem("klass");
}
// Funktionsväljare
function start() {
    if (window.location.pathname.includes("employees.html")) {
        let employees = ["1a", "anstalld1L.jpg", "2a", "anstalld2L.jpg", "3a", "anstalld3L.jpg", "4a", "anstalld4L.jpg"];
        thumb(employees);
    }
    if (window.location.pathname.includes("ourfleet.html")) {
        let fleet = ["1f", "flyg1L.jpg", "2f", "flyg2L.jpg", "3f", "flyg3L.jpg", "4f", "flyg4L.jpg"];
        thumb(fleet);
    }
    if (window.location.pathname.includes("contact.html")) {
        browser();
    }
    if (window.location.pathname.includes("booking.html")) {

        addEventListener('pageshow', sessionLoad, false);
        drawSeatMap();
        document.getElementById("seats").addEventListener('click', reserveSeat, false);
        document.getElementById("bookButton").addEventListener('click', booking, false);
        document.getElementById("clearButton").addEventListener('click', reset, false);
        addEventListener('pagehide', sessionSet, false);
    }
}
window.addEventListener("load", start, false);