//Register
function register(){
    let name= document.getElementById("name").value;
    let email= document.getElementById("email").value;
    let password= document.getElementById("password").value;

    let users= JSON.parse(localStorage.getItem("users")) || [];

    users.push({name, email, password, role:"user"});

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered Successfully!");
    window.location.href = "login.html";
}

//login
function login() {
    let email= document.getElementById("email").value;
    let password=document.getElementById("password").value;

    let users= JSON.parse(localStorage.getItem("users")) || [];
    let user= users.find(u=> u.email=== email && u.password=== password);

    if(email === "admin@gmail.com" && password=== "admin123"){
        window.location.href ="admin.html";
    }
    else if(user){
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href= "dashboard.html";
    }
    else{
        alert("Invalid Credentials");
    }
}

//ADD EVENT
function addEvent(){
    let title = document.getElementById("eventTitle").value;
    let date = document.getElementById("eventDate").value;
    let location = document.getElementById("eventLocation").value;
    
    let events= JSON.parse(localStorage.getItem("events")) || [];
    events.push({title, date, location});

    localStorage.setItem("events", JSON.stringify(events));
    alert("Event Added!");
    loadEvents();
}
 
//load events
function loadEvents(){
    let events= JSON.parse(localStorage.getItem("events")) || [];
    let eventList= document.getElementById("eventList");

    if(!eventList) return;

    eventList.innerHTML=" ";

    events.forEach((event, index) => {
        eventList.innerHTML += `
        <div class= "event-card">
        <h3>${event.title}</h3>
        <p>${event.date}</p>
        <p>${event.location}</p>
        <button onclick = "bookEvent(${index})">Book</button>
        </div>
        `;
    });
    loadBookings();
    }

//book event
function bookEvent(index) {
    let bookings= JSON.parse(localStorage.getItem("bookings")) || [];
    let user= JSON.parse(localStorage.getItem("loggedInUser"));
    let myBookings= document.getElementById("myBookings");

    if(!myBookings || !user) return;

    myBookings.innerHTML ="";
    bookings.forEach(b => {
        if(b.user === user.email){
            let events= JSON.parse(localStorage.getItem("events"));
            let event= events[b.eventIndex];
            myBookings.innerHTML += `
            <div class= "event-card">
            <h3>${event.title}</h3>
            <p>${event.date}</p>
            </div>
            `;
        }
    });
}

//logout
function logout(){
    localStorage.removeItem("loggedInUser");
    window.location.href="login.html";
}
