

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



        typeButtons.forEach(function(item) {
            item.classList.remove("active");
        });


   

        button.classList.add("active");




        accountType = button.dataset.type;


        if (accountType === "admin") {

          

            providerOptions.classList.remove("hidden");


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


    
        else {


            providerOptions.classList.add("hidden");



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



const providerButtons =
    document.querySelectorAll(".provider-type");


providerButtons.forEach(function(button) {

    button.addEventListener("click", function() {


        providerButtons.forEach(function(item) {
            item.classList.remove("active");
        });



        button.classList.add("active");


        providerType =
            button.dataset.provider;

    });

});



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


    if (fullName.value.trim() === "") {

        showError(
            fullName,
            "Please enter your full name."
        );

        return;
    }



    if (email.value.trim() === "") {

        showError(
            email,
            "Please enter your email."
        );

        return;
    }


   

    if (phone.value.trim() === "") {

        showError(
            phone,
            "Please enter your phone number."
        );

        return;
    }


    

    if (password.value.length < 8) {

        showError(
            password,
            "Password must be at least 8 characters."
        );

        return;
    }


    let message =
        "Account type: " +
        (
            accountType === "customer"
                ? "Customer"
                : "Admin"
        );



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
        "\n\nStep completed successfully!";


    alert(message);

});



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


function clearErrors() {

    document
        .querySelectorAll(".error-message")
        .forEach(function(error) {

            error.remove();

        });
}


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