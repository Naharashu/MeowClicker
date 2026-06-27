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
let ach_200_000 = false;

let seen = [];



const sleep = ms => new Promise(r => setTimeout(r, ms));

let clicks = 0;
let cps = 0;

let playerUUID;

function load_storage() {
    const uuid = localStorage.getItem("PlayerUUIDMClicker");
    playerUUID = uuid ? uuid : uuidv4();
    localStorage.setItem("PlayerUUIDMClicker", playerUUID);

    const temp = localStorage.getItem("MeowClicker_total");
    total = temp ? parseInt(temp) : 0;

    const delta_temp = localStorage.getItem("MeowClicker_delta");
    delta = delta_temp ? parseFloat(delta_temp) : 1;

    const step_temp = localStorage.getItem("MeowClicker_step");
    step = step_temp ? parseInt(step_temp) : 1;

    ach_100 = (localStorage.getItem("MeowClicker_ach_100") == 'true') ? true : false;
    ach_1000 = (localStorage.getItem("MeowClicker_ach_1000") == 'true') ? true : false;
    ach_10000 = (localStorage.getItem("MeowClicker_ach_10000") == 'true') ? true : false;
    ach_25000 = (localStorage.getItem("MeowClicker_ach_25000") == 'true') ? true : false;
    ach_50000 = (localStorage.getItem("MeowClicker_ach_50000") == 'true') ? true : false;
    ach_95000 = (localStorage.getItem("MeowClicker_ach_95000") == 'true') ? true : false;
    ach_100_000 = (localStorage.getItem("MeowClicker_ach_100_000") == 'true') ? true : false;
    ach_200_000 = (localStorage.getItem("MeowClicker_ach_200_000") == 'true') ? true : false;

    if (document.title != "MeowClicker") {
        let temp_seen = localStorage.getItem("MeowClicker_seen");
        seen = temp_seen ? JSON.parse(temp_seen) : [];
        for (let i = 0; i < seen.length; i++) {
            document.getElementById(seen[i]).disabled = true;
        }
    }

    if (step > Config.MAX_STEP || delta > Config.MAX_DELTA) {
        Shop.mark();
    }

    if (delta < 1) delta = 1;
    if (step < 1) step = 1;
    if (total < 0) total = 0;

    update_score();
}

const Config = Object.freeze({
    MAX_DELTA: 2.6,
    MAX_STEP: 64,
    MAX_INCOME: 166.5
});

const Shop = (() => {
    let a = false;

    return {
        isValid: () => a,
        mark: () => { a = true; }
    };
})();

Object.freeze(Shop);

document.addEventListener("DOMContentLoaded", () => {
    load_storage();
});

document.addEventListener("mousemove", () => {
    if (Shop.isValid()) {
        document.body.innerHTML = atob("PGgxIHN0eWxlPSJ0ZXh0LWFsaWduOiBjZW50ZXI7IiBjbGFzcz0ibGFiZWwiPllPVSBBUkUgQ0hFQVRFRDwvaDE+");
    }
});

document.addEventListener("keypress", () => {
    if (Shop.isValid()) {
        document.body.innerHTML = atob("PGgxIHN0eWxlPSJ0ZXh0LWFsaWduOiBjZW50ZXI7IiBjbGFzcz0ibGFiZWwiPllPVSBBUkUgQ0hFQVRFRDwvaDE+");
    }
});

document.addEventListener("", () => {
    if (Shop.isValid()) {
        document.body.innerHTML = atob("PGgxIHN0eWxlPSJ0ZXh0LWFsaWduOiBjZW50ZXI7IiBjbGFzcz0ibGFiZWwiPllPVSBBUkUgQ0hFQVRFRDwvaDE+");
    }
});

document.addEventListener("click", () => {
    if (Shop.isValid()) {
        document.body.innerHTML = atob("PGgxIHN0eWxlPSJ0ZXh0LWFsaWduOiBjZW50ZXI7IiBjbGFzcz0ibGFiZWwiPllPVSBBUkUgQ0hFQVRFRDwvaDE+");
    }
});

const meow1 = new Audio('resourse/sounds/meow1.mp3');
const meow2 = new Audio('resourse/sounds/meow2.mp3');
const meow3 = new Audio('resourse/sounds/meow3.mp3');
meow1.volume = 0.9;

Object.defineProperty(window, "play", {
    value: play,
    writable: false,
    configurable: false
});

async function play() {
    clicks++;
    if (cps >= 21) {
        Swal.fire({
            title: `⛔ Stop!`,
            html: `<p style="color: #ec2525;">You clicking too fast, do you use autoclicker?</p>`,
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

        return;
    }
    if (step > Config.MAX_STEP || delta > Config.MAX_DELTA) {
        Swal.fire({
            title: `⛔ Stop!`,
            html: `<p style="color: #fd5050;">Your meows per click exceeded the possible limit.</p>`,
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
        return;
    }
    const temp = step * delta;
    if (temp > Config.MAX_INCOME) {
        Swal.fire({
            title: `⛔ Stop!`,
            html: `<p style="color: #fd5050;">Your income exceeded the possible limit.</p>`,
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
        return;
    }
    total += temp;
    const btn = document.getElementById("play-btn");
    btn.style.transition = "width 0.1s ease-in-out, height 0.1s ease-in-out";
    btn.style.width = "240px";
    btn.style.height = "240px";
    const t = Math.random();
    if (t <= 0.5) {
        meow1.currentTime = 0;
        meow1.play();
    } else if (t >= 0.90) {
        meow3.currentTime = 0;
        meow3.play();
    }
    else {
        meow2.currentTime = 0;
        meow2.play();
    }
    update_score();
    await sleep(88);
    btn.style.width = "256px";
    btn.style.height = "256px";
}

setInterval(() => {
    cps = clicks/30;
    clicks = 0;
    if(cps>=21) {
        Swal.fire({
            title: `⛔ Stop!`,
            html: `<p style="color: #ec2525;">You clicking too fast, do you use autoclicker?</p>`,
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

        return;
    }
    if (cps != 0) {
        fetch("https://clicker-api.sagansi789.workers.dev", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: playerUUID,
                action: "click",
                cps: cps
            })
        })
            .then(r => r.json())
            .then(data => {
                total = data.total;
                delta = data.delta;
                step = data.step;
            })
    }
}, 30000);



function update_score() {
    let element = document.getElementById("score");
    element.innerText = Math.ceil(total);

    if (!ach_100 && total >= 100) {
        showAchievement("True hundred", "get score equal to 100", "");
        ach_100 = true;
        localStorage.setItem("MeowClicker_ach_100", "true");
    } else if (!ach_1000 && total >= 1000) {
        showAchievement("Lucky thousand", "get score equal to 1000", "");
        ach_1000 = true;
        localStorage.setItem("MeowClicker_ach_1000", "true");
    } else if (!ach_10000 && total >= 10000) {
        showAchievement("Hundred hundreds", "get score equal to 10,000", "");
        ach_10000 = true;
        localStorage.setItem("MeowClicker_ach_10000", "true");
    } else if (!ach_25000 && total >= 25000) {
        showAchievement("Love is three quarters curiosity", "get score equal to 25,000", "");
        ach_25000 = true;
        localStorage.setItem("MeowClicker_ach_25000", "true");
    } else if (!ach_50000 && total >= 50000) {
        showAchievement("Halfway through", "get score equal to 50,000", "");
        ach_50000 = true;
        localStorage.setItem("MeowClicker_ach_50000", "true");
    } else if (!ach_95000 && total >= 95000) {
        showAchievement("Almost there", "get score equal to 95,000", "");
        ach_95000 = true;
        localStorage.setItem("MeowClicker_ach_95000", "true");
    } else if (!ach_100_000 && total >= 100000) {
        showAchievement("Many many meows", "get score equal to 100,000", "");
        ach_100_000 = true;
        localStorage.setItem("MeowClicker_ach_100_000", "true");
    } else if (!ach_200_000 && total >= 200000) {
        showAchievement("Double hundred thousand", "get score equal to 200,000", "");
        ach_200_000 = true;
        localStorage.setItem("MeowClicker_ach_200_000", "true");
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



function buy(btnid, step_, delta_, needed) {
    if (total < needed) {
        Swal.fire({
            title: "Opps!",
            text: `You have not enought clicks to buy item! You ${needed - total} short.`,
            icon: "error",
            theme: "auto"
        });
        return;
    } else if (seen.includes(btnid)) {
        Swal.fire({
            title: "Opps!",
            text: `You have bought item!`,
            icon: "error",
            theme: "auto"
        });
        return;
    }
    total -= needed;
    document.getElementById(btnid).disabled = true;
    step *= step_;
    delta += delta_;

    fetch("https://clicker-api.sagansi789.workers.dev", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: playerUUID,
            action: "buy",
            itemID: btnid,
            needed: needed
        })
    })
        .then(r => r.json())
        .then(data => {
            total = data.total;
            delta = data.delta;
            step = data.step;
        })

    localStorage.setItem("MeowClicker_step", step);
    localStorage.setItem("MeowClicker_delta", delta);
    localStorage.setItem("MeowClicker_total", total);
    //update_score();

    seen.push(btnid);
    localStorage.setItem("MeowClicker_seen", JSON.stringify(seen));
}

// Source - https://stackoverflow.com/a/2117523
// Posted by broofa, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-27, License - CC BY-SA 4.0

function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

console.log(uuidv4());