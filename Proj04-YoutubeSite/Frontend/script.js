let isOpen = open;

function openMenu() {
    const menuSmall = document.getElementById("menu");
    const menuLarge = document.getElementById("menuLarge");
    const main = document.getElementById("main");

    if (window.innerWidth <= 768) {
        menuSmall.style.display = "block";
        return;
    }

    if (isOpen) {
        menuLarge.classList.remove("visible");
        
        setTimeout(() => {
            menuSmall.classList.remove("hidden");
        }, 100);

        main.classList.remove("open");
        main.style.marginLeft = "70px";
        isOpen = false;
    } else {
        menuSmall.classList.add("hidden");

        setTimeout(() => {
            menuLarge.classList.add("visible");
            menuLarge.scrollTop = 0;
        }, 50);

        main.classList.add("open");
        main.style.marginLeft = "240px";
        isOpen = true;
    }
}

openMenu();

function handleSubscribe(isClick = true) {
    const button = document.getElementById("SubscribeButton");
    let status = localStorage.getItem("subscribed");

    if (isClick) {
        status = (status === "true") ? "false" : "true";
        localStorage.setItem("subscribed", status);
    }

    if (status === "true") {
        button.innerHTML = "<i class='bi bi-bell-fill'></i>Inscrito<i class='bi bi-chevron-down'></i>";
        button.style.display = "flex";
        button.style.justifyContent = "center";
        button.style.alignItems = "center";
        button.style.gap = "5px";
        button.style.width = "150px";
        button.style.backgroundColor = "#404040ff";
        button.style.color = "#ffffff";
    } else {
        button.innerText = "Inscrever-se";
        button.style.backgroundColor = "#ffffff";
        button.style.color = "#000000ff";
    }
}

handleSubscribe(false);

const videoData = [
    { title: "I Survived 50 Hours in a Desert", author: "MrBeast", views: "12M", time: "2 days ago"},
    { title: "$1 vs $10,000,000 Job!", author: "MrBeast", views: "15M", time: "3 days ago"},
    { title: "Extreme Hide and Seek", author: "MrBeast", views: "22M", time: "5 days ago"}
];

function renderVideos() {
    const width = window.innerWidth;
    const desktopContainers = document.querySelectorAll(".videoSection");
    const mobileContainers = document.querySelectorAll(".videosList.Mobile");
    
    const author = "MrBeast";
    const profile = "./Assets/profile.jpg";

    let desktopLimit;
    if (width >= 1920) desktopLimit = 7;
    else if (width >= 1600) desktopLimit = 7;
    else if (width >= 1440) desktopLimit = 5;
    else if (width >= 1024) desktopLimit = 4;
    else desktopLimit = 0;

    desktopContainers.forEach(container => {
        container.innerHTML = "";
        for (let i = 0; i < desktopLimit; i++) {
            const video = videoData[i % videoData.length];
            
            const thumbNumber = i % 5; 
            const currentThumb = thumbNumber === 0 ? "./Assets/thumb.jpg" : `./Assets/thumb${thumbNumber}.jpg`;

            container.innerHTML += `
                <div class="DesktopVideo">
                    <img src="${currentThumb}" alt="">
                    <div class="videoInfo">
                        <h1>${video.title}</h1>
                        <span>${author}</span>
                        <p>${video.views} views • ${video.time}</p>
                    </div>
                </div>`;
        }
    });

    const mobileLimit = 10;
    mobileContainers.forEach(container => {
        container.innerHTML = "";
        for (let i = 0; i < mobileLimit; i++) {
            const video = videoData[i % videoData.length];

            const thumbNumber = i % 5;
            const currentThumb = thumbNumber === 0 ? "./Assets/thumb.jpg" : `./Assets/thumb${thumbNumber}.jpg`;

            container.innerHTML += `
                <div class="video">
                    <img src="${currentThumb}" alt="Video">
                    <div class="videoInfo">
                        <img src="${profile}" alt="">
                        <div class="videoText">
                            <h1>${video.title}</h1>
                            <div class="videoStats">
                                <span>${author}</span>
                                <span>${video.views} views</span>
                                <p>${video.time}</p>
                            </div>
                        </div>
                        <i class="bi bi-three-dots-vertical"></i>
                    </div>
                </div>`;
        }
    });
}

renderVideos();
window.addEventListener('resize', renderVideos);

const modal = document.getElementById("modal");

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function openModal() {
    const modal = document.getElementById("modal");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    modal.showModal();
}

function closeModal() {
    const modal = document.getElementById("modal");
    
    modal.classList.add("hide");

    setTimeout(() => {
        modal.close();
        document.body.style.overflow = "auto";
    }, 300); 
}

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

