let animation;
let countClicks = 0;
let svgGroup;
let buttonAnimation;
const animationKeyFrames = [13, 37, 49, 73, 80];
const firstDate = new Date('3/28/2019');
const currentDate = new Date();
const diffTime = Math.abs(currentDate - firstDate);
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
const clickTarget = diffDays;
const clicksMilestones = animationKeyFrames.map(k => Math.round((k / animationKeyFrames[animationKeyFrames.length - 1]) * clickTarget));
window.addEventListener("load", () => {
    document.getElementById("title").innerText = `${diffDays} Days With Nugget`;
    svgGroup = document.getElementById("svg-group");
    animation = lottie.loadAnimation({
        container: document.getElementById("lottie-container"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/egg-lottie.json'
    });
    addEventListeners();
});

const addEventListeners = () => {
    svgGroup.addEventListener("click", handleClick);
    svgGroup.addEventListener("mousedown", popButton);
    svgGroup.addEventListener("touchstart", popButton);
    svgGroup.addEventListener("mouseup", unPopButton);
    svgGroup.addEventListener("mouseleave", unPopButton);
    svgGroup.addEventListener("touchend", unPopButton);
    svgGroup.addEventListener("touchmove", unPopButton);
    svgGroup.addEventListener("touchcancel", unPopButton);
}

const removeEventListeners = () => {
    svgGroup.removeEventListener("click", handleClick);
    svgGroup.removeEventListener("mousedown", popButton);
    svgGroup.removeEventListener("touchstart", popButton);
    svgGroup.removeEventListener("mouseup", unPopButton);
    svgGroup.removeEventListener("mouseleave", unPopButton);
    svgGroup.removeEventListener("touchend", unPopButton);
    svgGroup.removeEventListener("touchmove", unPopButton);
    svgGroup.removeEventListener("touchcancel", unPopButton);
}

const popButton = () => {
    document.getElementById("button").classList.add("pop");
}

const unPopButton = () => {
    document.getElementById("button").classList.remove("pop");
}

const handleClick = () => {
    countClicks++;
    document.getElementById("days").innerText = countClicks;
    if (countClicks === clickTarget) {
        removeEventListeners();
        animation.goToAndPlay(animationKeyFrames[clicksMilestones.indexOf(clickTarget)], true);
    } else if (clicksMilestones.includes(countClicks)) {
        animation.goToAndStop(animationKeyFrames[clicksMilestones.indexOf(countClicks)], true);
    }
}