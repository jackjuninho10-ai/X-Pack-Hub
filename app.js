const appsList = document.getElementById("appsList");
const appsCount = document.getElementById("appsCount");

const detailsPage = document.getElementById("detailsPage");
const backButton = document.getElementById("backButton");

const detailsIcon = document.getElementById("detailsIcon");
const detailsName = document.getElementById("detailsName");
const detailsVersionText = document.getElementById("detailsVersionText");
const detailsVersion = document.getElementById("detailsVersion");
const detailsSize = document.getElementById("detailsSize");
const detailsDescription = document.getElementById("detailsDescription");
const detailsChangelog = document.getElementById("detailsChangelog");
const detailsAbout = document.getElementById("detailsAbout");
const detailsDownload = document.getElementById("detailsDownload");

async function loadApps() {
    try {
        const response = await fetch("apps.json?v=" + Date.now());

        if (!response.ok) {
            throw new Error("apps.json não encontrado");
        }

        const apps = await response.json();

        appsCount.textContent = apps.length;
        appsList.innerHTML = "";

        apps.forEach(app => {
            const card = document.createElement("article");
            card.className = "app-card";

            const icon = document.createElement("img");
            icon.className = "app-icon";
            icon.src = app.icon;
            icon.alt = app.name;
            icon.width = 68;
            icon.height = 68;

            const content = document.createElement("div");
            content.className = "app-content";

            const top = document.createElement("div");
            top.className = "app-top";

            const name = document.createElement("h3");
            name.textContent = app.name;

            const version = document.createElement("span");
            version.className = "app-version";
            version.textContent = app.versionName;

            top.appendChild(name);
            top.appendChild(version);

            const desc = document.createElement("p");
            desc.className = "app-description";
            desc.textContent = app.description;

            const meta = document.createElement("div");
            meta.className = "app-meta";

            const size = document.createElement("span");
            size.textContent = app.size;

            const type = document.createElement("span");
            type.textContent = "APK";

            meta.appendChild(size);
            meta.appendChild(type);

            content.appendChild(top);
            content.appendChild(desc);
            content.appendChild(meta);

            card.appendChild(icon);
            card.appendChild(content);

            card.addEventListener("click", () => openDetails(app));

            appsList.appendChild(card);
        });

    } catch (error) {
        appsList.innerHTML = "<p class='loading'>Erro ao carregar o catálogo. Confira o apps.json.</p>";
    }
}

function openDetails(app) {
    detailsIcon.src = app.icon;
    detailsName.textContent = app.name;
    detailsVersionText.textContent = "Versão mais atual • " + app.versionName;

    detailsVersion.textContent = app.versionName;
    detailsSize.textContent = app.size;

    detailsDescription.textContent = app.description;
    detailsChangelog.textContent = app.latestUpdateLog || "Sem changelog disponível.";
    detailsAbout.textContent = app.aboutLog || app.about || "Sem informações adicionais.";
    detailsDownload.href = app.apkUrl;

    detailsPage.hidden = false;
    document.body.classList.add("no-scroll");
}

function closeDetails() {
    detailsPage.hidden = true;
    document.body.classList.remove("no-scroll");
}

backButton.addEventListener("click", closeDetails);

window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeDetails();
    }
});

loadApps();
