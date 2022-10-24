let fixedBar = document.querySelector(".allHead");
let hadih = document.querySelector(".hadih");
let next = document.querySelector(".next");
let prew = document.querySelector(".prew");
let number = document.querySelector(".number");
let btn = document.querySelector(".btn");
let hadbihss = document.getElementById("hadbihs");
let section = document.querySelectorAll("section");
let allqoran = document.querySelector(".allqoran");
let popUp = document.querySelector(".popUp");
let topBtn = document.querySelector("#top");
let coranWtite = document.querySelector(".coranWtite");
let mainTime = document.querySelector(".mainTime");
let closes = document.querySelector(".close i");
let links = document.querySelectorAll(".links li a");
let loading = document.querySelector(".loading");
let loading2 = document.querySelector(".loading2");
let loading3 = document.querySelector(".loading3");
let loading4 = document.querySelector(".loading4");
let length = 0;
topBtn.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}
links.forEach((linkc) => {
    linkc.addEventListener("click", () => {
        let target = linkc.dataset.filter;
        section.forEach((sec) => {
            if (sec.id == target) {
                links.forEach((lin) => {
                    lin.classList.remove("active");
                });
                linkc.classList.add("active");
                sec.scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    });
});
window.onscroll = () => {
    section.forEach((ele, i) => {
        if (section[i].offsetTop <= window.scrollY && window.scrollY <= section[i + 1].offsetTop) {
            links.forEach((e) => {
                e.classList.remove("active")
            })
            links[i].classList.add("active")
        }
    })
}
btn.onclick = () => {
    hadbihss.scrollIntoView({
        behavior: "smooth",
    });
};
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        fixedBar.classList.add("active");
        topBtn.classList.add("open")
    } else {
        fixedBar.classList.remove("active");
        topBtn.classList.remove("open")

    }
});
function fetchData(url,cl ,location){
    loadingFun(true ,location)
    fetch(url)
        .then((res) => res.json())
        .then((data) => cl(data))
        .catch((erro) => console.log("erro"));
}
function getData(e) {
    loadingFun(false, loading)
    let preHadnh = Object.keys(e.data.hadiths).length;
    let preHadnh2 = Object.keys(e.data.hadiths).length;
    let preHadnh1;
    hadih.innerHTML = `${e.data.hadiths[length].arab}`;
    number.innerHTML = `${preHadnh}/${length + 1}`;
    if (length >= preHadnh) {
    } else {
        next.addEventListener("click", function () {
            if (preHadnh1) {
                if (preHadnh2 < preHadnh) {
                    preHadnh2 += 1;
                    hadih.innerHTML = `${e.data.hadiths[preHadnh2 - 1].arab}`;
                    number.innerHTML = `${preHadnh}/${preHadnh2}`;
                } else {
                    hadih.innerHTML = `${e.data.hadiths[length].arab}`;
                    number.innerHTML = `${preHadnh}/${length + 1}`;
                    length += 1;
                }
            } else {
                length += 1;
                hadih.innerHTML = `${e.data.hadiths[length].arab}`;
                number.innerHTML = `${preHadnh}/${length + 1}`;
            }
            if (length + 1 == preHadnh) {
                length = 0 - 1;
            }
        });
        prew.onclick = () => {
            if (length > 0) {
                length -= 1;
                hadih.innerHTML = `${e.data.hadiths[length].arab}`;
                number.innerHTML = `${preHadnh}/${length + 1}`;
                preHadnh2 = Object.keys(e.data.hadiths).length - 1;
            }
            if (length == 0) {
                preHadnh2 -= 1;
                hadih.innerHTML = `${e.data.hadiths[preHadnh2 - 1].arab}`;
                number.innerHTML = `${preHadnh}/${preHadnh2}`;
                preHadnh1 = 1;
            }
        };
    }
}
function dataQoran(e) {
    loadingFun(false, loading2)
    let sora = e.data.surahs.references;
    let soraCount = Object.keys(e.data.surahs.references).length;
    sora.forEach((e, i) => {
        allqoran.innerHTML += `
        <div class="soraName">
            <h4>${e.name}</h4>
            <p>${e.englishName}</p>
        </div>`;
    });
    let soraName = document.querySelectorAll(".soraName");
    soraName.forEach((sora, i) => {
        sora.onclick = () => {
            popUp.style.display = "block";
            document.body.classList.add("stopscroll");
            closes.onclick = () => {
                popUp.style.display = "none";
                document.body.classList.remove("stopscroll");
            };
            loadingFun(true, loading4)
            fetch(`https://api.alquran.cloud/v1/surah/${i + 1}/ar.alafasy`)

                .then((res) => res.json())
                .then((data) => {
                    loadingFun(false, loading4)
                    let dataAyat = data.data.ayahs;
                    coranWtite.innerHTML = "";
                    dataAyat.forEach((ele, i) => {
                        coranWtite.innerHTML += `<div class="container"><p>${ele.text} <span> ${i}</span></P></div>`;
                    });
                })
                .catch((err) => console.log("err"));
        };
    });
}
function getDataTime(e) {
    loadingFun(false, loading3)
    let timeName = e.data.timings
    for (let time in timeName) {
        mainTime.innerHTML += `
                        <div class="timeBox">
                            <div class="textBox">
                                <h5></h5>
                                <span>${timeName[time]}</span>
                            </div>
                            <p>${time}</p>
                        </div>
        `
    }
}
function loadingFun(status , location){
    status ? location.classList.remove("hidden") : location.classList.add("hidden")
}
window.onload = () => {
    fetchData("https://api.hadith.gading.dev/books/bukhari?range=300-500", getData, loading)
    fetchData("https://api.alquran.cloud/v1/meta", dataQoran, loading2)
    fetchData("https://api.aladhan.com/v1/timingsByCity?city=Dubai&country=United%20Arab%20Emirates&method=8", getDataTime, loading3)
};
