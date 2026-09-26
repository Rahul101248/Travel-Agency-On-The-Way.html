// =========================
// MENU TOGGLE
// =========================

function toggleMenu() {

    let nav =
        document.getElementById("navLinks");

    if (!nav) return;

    if (nav.style.display === "block") {

        nav.style.display = "none";

    } else {

        nav.style.display = "block";
    }
}


// =========================
// SEARCH PACKAGE
// =========================

function searchPackage() {

    let input =
        document.getElementById("searchInput");

    if (!input) return;

    let filter =
        input.value.toUpperCase();

    let cards =
        document.getElementsByClassName(
            "package-card"
        );

    let found = false;

    for (let i = 0; i < cards.length; i++) {

        let title =
            cards[i]
            .getElementsByTagName("h3")[0];

        if (
            title.innerHTML
            .toUpperCase()
            .indexOf(filter) > -1
        ) {

            cards[i].style.display =
                "";

            found = true;

        } else {

            cards[i].style.display =
                "none";
        }
    }

    let msg =
        document.getElementById(
            "notFoundMessage"
        );

    if (msg) {

        msg.innerHTML =
            found
                ? ""
                : "No Package Found";
    }
}


// =========================
// PACKAGE DETAILS
// =========================

function viewDetails(packageName) {

    localStorage.setItem(
        "selectedPackage",
        packageName
    );

    window.location.href =
        "package-details.html";
}


function loadPackageDetails() {

    let packageName =
        localStorage.getItem(
            "selectedPackage"
        );

    let packageBox =
        document.getElementById(
            "packageDetails"
        );

    if (!packageBox) return;

    let packages = {

        Bandarban: {
            image:
                "images/bandarban.jpg",
            price: "7500",
            duration: "4 Days",
            description:
                "Beautiful mountains and nature."
        },

        Sylhet: {
            image:
                "images/sylhet.jpg",
            price: "5500",
            duration: "3 Days",
            description:
                "Tea gardens and waterfalls."
        },

        Rangamati: {
            image:
                "images/rangamati.jpg",
            price: "5000",
            duration: "3 Days",
            description:
                "Lake and hill experience."
        },

        Sundarbans: {
            image:
                "images/sundarbans.jpg",
            price: "6500",
            duration: "3 Days",
            description:
                "Largest mangrove forest."
        },

        CoxsBazar: {
            image:
                "images/coxsbazar.jpg",
            price: "8000",
            duration: "5 Days",
            description:
                "Longest sea beach."
        }
    };

    let data =
        packages[packageName];

    if (!data) return;

    packageBox.innerHTML = `

    <div class="card">

        <img src="${data.image}">

        <h2>${packageName}</h2>

        <p>
        Duration:
        ${data.duration}
        </p>

        <p>
        Price:
        ৳${data.price}
        </p>

        <p>
        ${data.description}
        </p>

        <button
        class="btn"
        onclick="bookPackage()">

        Book Now

        </button>

    </div>

    `;
}


function bookPackage() {

    let packageName =
        localStorage.getItem(
            "selectedPackage"
        );

    localStorage.setItem(
        "bookingPackage",
        packageName
    );

    window.location.href =
        "booking.html";
}


// =========================
// BOOKING
// =========================

function loadBookingPackage() {

    let packageField =
        document.getElementById(
            "package"
        );

    if (!packageField) return;

    packageField.value =
        localStorage.getItem(
            "bookingPackage"
        );
}


function bookingFormHandler() {

    let form =
        document.getElementById(
            "bookingForm"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();

            let bookingData = {

                name:
                    document.getElementById(
                        "name"
                    ).value,

                email:
                    document.getElementById(
                        "email"
                    ).value,

                phone:
                    document.getElementById(
                        "phone"
                    ).value,

                gender:
                    document.getElementById(
                        "gender"
                    ).value,

                age:
                    document.getElementById(
                        "age"
                    ).value,

                package:
                    document.getElementById(
                        "package"
                    ).value,

                tourDate:
                    document.getElementById(
                        "tourDate"
                    ).value
            };

            if (
                bookingData.name === "" ||
                bookingData.email === "" ||
                bookingData.phone === "" ||
                bookingData.gender === "" ||
                bookingData.age === "" ||
                bookingData.tourDate === ""
            ) {

                alert(
                    "Please fill all fields"
                );

                return;
            }

            localStorage.setItem(
                "bookingData",
                JSON.stringify(
                    bookingData
                )
            );

            window.location.href =
                "payment.html";
        }
    );
}


// =========================
// PAYMENT
// =========================

function confirmPayment() {

    let method =
        document.getElementById(
            "paymentMethod"
        );

    if (!method) return;

    if (method.value === "") {

        alert(
            "Select payment method"
        );

        return;
    }

    let bookingData =
        JSON.parse(
            localStorage.getItem(
                "bookingData"
            )
        );

    let bookingId =
        "OTW" +
        Math.floor(
            Math.random() * 10000
        );

    let loginId =
        "USER" +
        Math.floor(
            Math.random() * 1000
        );

    let password =
        "PASS" +
        Math.floor(
            Math.random() * 1000
        );

    let finalBooking = {

        ...bookingData,

        bookingId:
            bookingId,

        loginId:
            loginId,

        password:
            password,

        paymentMethod:
            method.value,

        paymentStatus:
            "Paid",

        bookingStatus:
            "Confirmed"
    };

    localStorage.setItem(
        "finalBooking",
        JSON.stringify(
            finalBooking
        )
    );

    document.getElementById(
        "paymentResult"
    ).innerHTML = `

    <h2>
    Payment Successful
    </h2>

    <p>
    Booking ID:
    ${bookingId}
    </p>

    <p>
    Login ID:
    ${loginId}
    </p>

    <p>
    Password:
    ${password}
    </p>

    <a href="login.html"
    class="btn">

    Go To Login

    </a>
    `;
}


// =========================
// LOGIN
// =========================

function loginUser() {

    let loginId =
        document.getElementById(
            "loginId"
        ).value;

    let password =
        document.getElementById(
            "password"
        ).value;

    let user =
        JSON.parse(
            localStorage.getItem(
                "finalBooking"
            )
        );

    if (!user) {

        alert(
            "No Account Found"
        );

        return;
    }

    if (
        loginId === user.loginId &&
        password === user.password
    ) {

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        window.location.href =
            "dashboard.html";

    } else {

        alert(
            "Invalid Login"
        );
    }
}


// =========================
// DASHBOARD
// =========================

function loadDashboard() {

    let user =
        JSON.parse(
            localStorage.getItem(
                "currentUser"
            )
        );

    let box =
        document.getElementById(
            "dashboardContent"
        );

    if (!box) return;

    if (!user) {

        window.location.href =
            "login.html";

        return;
    }

    box.innerHTML = `

    <div class="card">

        <h2>
        Welcome
        ${user.name}
        </h2>

        <p>
        Booking ID:
        ${user.bookingId}
        </p>

        <p>
        Package:
        ${user.package}
        </p>

        <p>
        Payment:
        ${user.paymentStatus}
        </p>

        <p>
        Status:
        ${user.bookingStatus}
        </p>

    </div>

    `;
}


function logoutUser() {

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
        "login.html";
}


// =========================
// REVIEWS
// =========================

function addReview() {

    let name =
        document.getElementById(
            "reviewName"
        ).value;

    let rating =
        document.getElementById(
            "reviewRating"
        ).value;

    let text =
        document.getElementById(
            "reviewText"
        ).value;

    if (
        name === "" ||
        rating === "" ||
        text === ""
    ) {

        alert(
            "Fill all fields"
        );

        return;
    }

    let reviews =
        JSON.parse(
            localStorage.getItem(
                "reviews"
            )
        ) || [];

    reviews.push({

        name: name,
        rating: rating,
        text: text
    });

    localStorage.setItem(
        "reviews",
        JSON.stringify(reviews)
    );

    location.reload();
}


// =========================
// CONTACT
// =========================

function submitContactForm() {

    let name =
        document.getElementById(
            "contactName"
        ).value;

    let email =
        document.getElementById(
            "contactEmail"
        ).value;

    let subject =
        document.getElementById(
            "contactSubject"
        ).value;

    let message =
        document.getElementById(
            "contactMessage"
        ).value;

    if (
        name === "" ||
        email === "" ||
        subject === "" ||
        message === ""
    ) {

        alert(
            "Fill all fields"
        );

        return;
    }

    let messages =
        JSON.parse(
            localStorage.getItem(
                "contactMessages"
            )
        ) || [];

    messages.push({

        name: name,
        email: email,
        subject: subject,
        message: message
    });

    localStorage.setItem(
        "contactMessages",
        JSON.stringify(messages)
    );

    alert(
        "Message Sent Successfully"
    );
}


// =========================
// AUTO LOAD
// =========================

window.onload = function () {

    loadPackageDetails();

    loadBookingPackage();

    bookingFormHandler();

    loadDashboard();
};
