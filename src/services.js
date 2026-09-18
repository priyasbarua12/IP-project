/* LOAD SERVICES DATA*/

fetch("services.json")
    .then(response => response.json())
    .then(data => {

        createBloodCards(data.bloodDonation);

        createProviderCards(
            data.mechanics,
            "mechanicProviders"
        );

        createProviderCards(
            data.electricians,
            "electricianProviders"
        );

        createProviderCards(
            data.plumbers,
            "plumberProviders"
        );

    })
    .catch(error => {
        console.log("Error loading services:", error);
    });


/* BLOOD DONATION CARDS*/

function createBloodCards(providers) {

    const container =
        document.getElementById("bloodProviders");

    if (!container) {
        return;
    }

    providers.forEach(provider => {

        container.innerHTML += `

            <a href="provider-profile.html"
               class="provider-card">

                <div class="provider-top">

                    <div
                        class="provider-avatar-placeholder"
                        style="background:${provider.avatarColor}"
                    >
                        ${provider.initials}
                    </div>

                    <div class="provider-info">

                        <h3>
                            ${provider.name}

                            <span
                                class="badge badge-red"
                                style="font-size:.7rem"
                            >
                                ${provider.bloodType}
                            </span>
                        </h3>

                        <div class="role">
                            ${provider.role}
                        </div>

                        <div class="location">
                            📍 ${provider.location}
                        </div>

                    </div>

                </div>

                <div class="provider-meta">

                    <span class="badge badge-green">
                        Available
                    </span>

                    <span
                        style="
                            color:var(--green-600);
                            font-weight:600;
                            font-size:.875rem
                        "
                    >
                        Contact →
                    </span>

                </div>

            </a>

        `;
    });
}


/* MECHANIC / ELECTRICIAN / PLUMBER CARDS*/

function createProviderCards(providers, containerId) {

    const container =
        document.getElementById(containerId);

    if (!container) {
        return;
    }

    providers.forEach(provider => {

        let avatar = "";

        /* Image takle image dekabe */

        if (provider.image) {

            avatar = `
                <img
                    src="${provider.image}"
                    alt="${provider.name}"
                    class="provider-avatar"
                >
            `;

        }

        /* Image na takle initials dekabe */

        else {

            avatar = `
                <div
                    class="provider-avatar-placeholder"
                    style="background:${provider.avatarColor}"
                >
                    ${provider.initials}
                </div>
            `;
        }


        /* Badge takle badge dekabe */

        let badge = "";

        if (provider.badge) {

            badge = `
                <span
                    class="badge badge-${provider.badgeType}"
                    style="font-size:.7rem"
                >
                    ${provider.badge}
                </span>
            `;
        }


        /* Card toiri */

        container.innerHTML += `

            <a href="provider-profile.html"
               class="provider-card">

                <div class="provider-top">

                    ${avatar}

                    <div class="provider-info">

                        <h3>
                            ${provider.name}
                            ${badge}
                        </h3>

                        <div class="role">
                            ${provider.role}
                        </div>

                        <div class="location">
                            📍 ${provider.location}
                        </div>

                    </div>

                </div>


                <div class="provider-meta">

                    <div class="rating">

                        <span class="star">★</span>

                        <b>${provider.rating}</b>

                        · ${provider.jobs} jobs

                    </div>

                    <span
                        style="
                            color:var(--green-600);
                            font-weight:600;
                            font-size:.875rem
                        "
                    >
                        View →

                    </span>

                </div>

            </a>

        `;
    });
}