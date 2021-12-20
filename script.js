let animation;
let countClicks = 0;
let button;
let buttonAnimation;
const animationKeyFrames = [13, 37, 49, 73, 80];
const firstDate = new Date('3/28/2019');
const currentDate = new Date();
const diffTime = Math.abs(currentDate - firstDate);
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
const clickTarget = diffDays;
const clicksMilestones = animationKeyFrames.map(k => Math.round((k / animationKeyFrames[animationKeyFrames.length - 1]) * clickTarget));
window.addEventListener("load", () => {
    document.getElementById("title").innerText = `${diffDays} Days`;
    button = document.getElementById("button");
    animation = lottie.loadAnimation({
        container: document.getElementById("lottie-container"),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: 'assets/egg-lottie.json'
    });
    document.getElementById("svg-group").addEventListener("click", handleClick);
    // buttonAnimation = document.getElementById("heart").animate(
    buttonAnimation = button.animate(
        [
            { transform: 'scale(1)' },
            { transform: 'scale(1.1)' },
            { transform: 'scale(1)' }
        ], {
        duration: 200,
        easing: "ease-out"
    });
    buttonAnimation.pause();
});

const handleClick = () => {
    buttonAnimation.play();
    // button.classList.add("pop");
    countClicks++;
    document.getElementById("days").innerText = countClicks;
    if (countClicks === clickTarget) {
        document.getElementById("svg-group").removeEventListener("click", handleClick);
        animation.goToAndPlay(animationKeyFrames[clicksMilestones.indexOf(clickTarget)], true);
    } else if (clicksMilestones.includes(countClicks)) {
        animation.goToAndStop(animationKeyFrames[clicksMilestones.indexOf(countClicks)], true);
    }
}