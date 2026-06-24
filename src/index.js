let total = 0;
let delta = 1;
let step = 1;

let ach_100 = false;
let ach_1000 = false;
let ach_10000 = false;
let ach_25000 = false;
let ach_50000 = false;
let ach_95000 = false;
let ach_100_000 = false;

const sleep = ms => new Promise(r => setTimeout(r, ms));


function load_storage() {
    const temp = localStorage.getItem("MeowClicker_total");
    total = temp ? parseInt(temp) : 0;

    const delta_temp = localStorage.getItem("MeowClicker_delta");
    delta = delta_temp ? parseInt(delta_temp) : 1;

    ach_100 = (localStorage.getItem("MeowClicker_ach_100") == 'true') ? true : false;
    ach_1000 = (localStorage.getItem("MeowClicker_ach_1000") == 'true') ? true : false;
    ach_10000 = (localStorage.getItem("MeowClicker_ach_10000") == 'true') ? true : false;
    ach_25000 = (localStorage.getItem("MeowClicker_ach_25000") == 'true') ? true : false;
    ach_50000 = (localStorage.getItem("MeowClicker_ach_50000") == 'true') ? true : false;
    ach_95000 = (localStorage.getItem("MeowClicker_ach_95000") == 'true') ? true : false;
    ach_100_000 = (localStorage.getItem("MeowClicker_ach_100_000") == 'true') ? true : false;

    update_score();
}

document.addEventListener("DOMContentLoaded", () => {
    load_storage();
});

const meow1 = new Audio('resourse/sounds/meow1.mp3');
const meow2 = new Audio('resourse/sounds/meow2.mp3');
const meow3 = new Audio('resourse/sounds/meow3.mp3');
meow1.volume = 0.9;

async function play() {
    const btn = document.getElementById("play-btn");
    btn.style.transition = "width 0.1s ease-in-out, height 0.1s ease-in-out";
    btn.style.width = "240px";
    btn.style.height = "240px";
    const t = Math.random();
    if(t<=0.5) {
        meow1.currentTime = 0;
        meow1.play();
    } else if(t>=0.90) {
        meow3.currentTime = 0;
        meow3.play();
    }
    else {
        meow2.currentTime = 0;
        meow2.play();
    }
    total += step * delta;
    update_score();
    await sleep(88);
    btn.style.width = "256px";
    btn.style.height = "256px";
}

function update_score() {
    let element = document.getElementById("score");
    element.innerText = Math.ceil(total);

    if(!ach_100&&total>=100) {
        showAchievement("True hundred", "get score equal to 100", "");
        ach_100 = true;
        localStorage.setItem("MeowClicker_ach_100", "true");
    } else if(!ach_1000&&total>=1000) {
        showAchievement("Lucky thousand", "get score equal to 1000", "");
        ach_1000 = true;
        localStorage.setItem("MeowClicker_ach_1000", "true");
    } else if(!ach_10000&&total>=10000) {
        showAchievement("Hundred hundreds", "get score equal to 10,000", "");
        ach_10000 = true;
        localStorage.setItem("MeowClicker_ach_10000", "true");
    } else if(!ach_25000&&total>=25000) {
        showAchievement("Love is three quarters curiosity", "get score equal to 25,000", "");
        ach_25000 = true;
        localStorage.setItem("MeowClicker_ach_25000", "true");
    } else if(!ach_50000&&total>=50000) {
        showAchievement("Halfway through", "get score equal to 50,000", "");
        ach_50000 = true;
        localStorage.setItem("MeowClicker_ach_50000", "true");
    } else if(!ach_95000&&total>=95000) {
        showAchievement("Almost there", "get score equal to 95,000", "");
        ach_95000 = true;
        localStorage.setItem("MeowClicker_ach_95000", "true");
    } else if(!ach_100_000&&total>=100000) {
        showAchievement("Many many meows", "get score equal to 100,000", "");
        ach_100_000 = true;
        localStorage.setItem("MeowClicker_ach_100_000", "true");
    }

    localStorage.setItem("MeowClicker_total", total);
}


function showAchievement(title, description, iconUrl) {
    let audio = new Audio('resourse/sounds/ach.mp3');
    audio.play();

    Swal.fire({
        title: `🏆 ${title}`,
        html: `<p style="color: #bbb;">${description}</p>`,
        //imageUrl: iconUrl || 'https://placekitten.com',
        //imageWidth: 60,
        //imageHeight: 60,
        background: '#1e1e24', 
        color: '#fff',
        position: 'top-end',  
        showConfirmButton: false,
        timer: 4000,        
        timerProgressBar: true,
        toast: true,         
        showClass: { popup: 'animate__animated animate__slideInRight' },
        hideClass: { popup: 'animate__animated animate__slideOutRight' }
    });
}

let seen = [];

function buy(btnid, step_, delta_, needed) {
    if(total<needed) {
        Swal.fire({
            title: "Opps!",
            text: `You have not enought clicks to buy item! You ${needed-total} short.`,
            icon: "error",
            theme: "auto"
        });
        return;
    } else if(seen.includes(btnid)) {
        Swal.fire({
            title: "Opps!",
            text: `You have bought item!`,
            icon: "error",
            theme: "auto"
        });
        return;
    }
    document.getElementById(btnid).disabled = true;
    step *= step_;
    delta += delta_;
    seen.push(btnid);
}