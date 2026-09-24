/* =========================
   MAIN ACCOUNT TYPE
========================= */

const typeButtons =
    document.querySelectorAll(".type-button");

const providerOptions =
    document.getElementById("providerOptions");

const leftTitle =
    document.getElementById("leftTitle");

const leftDescription =
    document.getElementById("leftDescription");

const benefits =
    document.getElementById("benefits");


let accountType = "customer";
let providerType = "individual";


typeButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        /* Remove active from both buttons */

        typeButtons.forEach(function(item) {
            item.classList.remove("active");
        });


        /* Add active to clicked button */

        button.classList.add("active");


        /* Get selected account */

        accountType = button.dataset.type;


        /* =========================
           ADMIN SELECTED
        ========================= */

        if (accountType === "admin") {

            /* Show Service Provider section */

            providerOptions.classList.remove("hidden");


            /* Change left side */

            leftTitle.innerHTML =
                "Manage your<br>service business.";

            leftDescription.textContent =
                "Join HelpHub as a service provider and connect with customers who need your services.";

            benefits.innerHTML = `
                <li>Choose individual or organization</li>
                <li>Get local job leads</li>
                <li>Build reviews & reputation</li>
                <li>Grow your service business</li>
            `;

        }


        /* =========================
           CUSTOMER SELECTED
        ========================= */

        else {

            /* Hide Service Provider */

            providerOptions.classList.add("hidden");


            /* Change left side back */

            leftTitle.innerHTML =
                "Get the help<br>you need.";

            leftDescription.textContent =
                "Access thousands of trusted local service providers. Post jobs, get quotes, and connect instantly.";

            benefits.innerHTML = `
                <li>Free to post jobs</li>
                <li>Verified providers only</li>
                <li>Secure & transparent payments</li>
            `;
        }

    });

});


/* =========================
   INDIVIDUAL / ORGANIZATION
========================= */

const providerButtons =
    document.querySelectorAll(".provider-type");


providerButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        /* Remove active */

        providerButtons.forEach(function(item) {
            item.classList.remove("active");
        });


        /* Add active */

        button.classList.add("active");


        /* Save provider type */

        providerType =
            button.dataset.provider;

    });

});


/* =========================
   FORM
========================= */

const form =
    document.getElementById("signupForm");


form.addEventListener("submit", function(event) {

    event.preventDefault();


    const fullName =
        document.getElementById("fullName");

    const email =
        document.getElementById("email");

    const phone =
        document.getElementById("phone");

    const password =
        document.getElementById("password");


    clearErrors();


    /* Full Name */

    if (fullName.value.trim() === "") {

        showError(
            fullName,
            "Please enter your full name."
        );

        return;
    }


    /* Email */

    if (email.value.trim() === "") {

        showError(
            email,
            "Please enter your email."
        );

        return;
    }


    /* Phone */

    if (phone.value.trim() === "") {

        showError(
            phone,
            "Please enter your phone number."
        );

        return;
    }


    /* Password */

    if (password.value.length < 8) {

        showError(
            password,
            "Password must be at least 8 characters."
        );

        return;
    }


    /* =========================
       SUCCESS
    ========================= */

    let message =
        "Account type: " +
        (
            accountType === "customer"
                ? "Customer"
                : "Admin"
        );


    /* If Admin */

    if (accountType === "admin") {

        message +=
            "\nService Provider type: " +
            (
                providerType === "individual"
                    ? "Individual"
                    : "Organization"
            );
    }


    message +=
        "\n\nStep 1 completed successfully!";


    alert(message);

});


/* =========================
   ERROR FUNCTION
========================= */

function showError(input, message) {

    const error =
        document.createElement("div");

    error.className =
        "error-message";

    error.textContent =
        message;


    input.parentElement.appendChild(error);

    input.focus();
}


/* =========================
   CLEAR ERRORS
========================= */

function clearErrors() {

    document
        .querySelectorAll(".error-message")
        .forEach(function(error) {

            error.remove();

        });
}


/* =========================
   REMOVE ERROR WHILE TYPING
========================= */

document
    .querySelectorAll("input")
    .forEach(function(input) {

        input.addEventListener("input", function() {

            const error =
                input.parentElement
                    .querySelector(".error-message");

            if (error) {
                error.remove();
            }

        });

    });