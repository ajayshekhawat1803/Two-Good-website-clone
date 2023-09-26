const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

const videoCont = document.querySelector('.video-cont')
const play = document.querySelector("#play")

// gsap.to("#nav1 svg",{
//     transform: "translateY(-100%)",
//     scrollTrigger:{
//         trigge:"#page-1",
//         scroller: "#main",
//         markers: true,
//         start: "top 0",
//         end:"top -5%",
//         scrub: true,
//     }
// })
// gsap.to(".nav2 #links",{
//     transform: "translateY(-100%)",
//     scrollTrigger:{
//         trigge:"#page-1",
//         scroller: "#main",
//         markers: true,
//         start: "top 0",
//         end:"top -5%",
//         scrub: true,
//     }
// })

const videoAnimation = () => {

    videoCont.addEventListener("mouseover", () => {
        gsap.to(play, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
        })
    })
    videoCont.addEventListener("mouseleave", () => {
        gsap.to(play, {
            opacity: 0,
            scale: 0,
            duration: 0.3,
        })
    })
    videoCont.addEventListener("mousemove", (dt) => {
        gsap.to(play, {
            y: dt.y - 35,
            x: dt.x - 35
        })
    })
}
const loadingAnimation = () => {
    gsap.from("#page-1 h1", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3
    })
    gsap.from(videoCont, {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        delay: 0.7
    })
}
const moveCursor = () => {

    document.addEventListener("mousemove", (dets) => {
        gsap.to("#cursor", {
            top: dets.y,
            left: dets.x
        })
    })
    document.querySelectorAll('.child').forEach((elem) => {
        elem.addEventListener("mouseover", () => {
            gsap.to("#cursor", {
                transform: 'translate(-50%,-50%) scale(1)',
            })
        })
    })
    document.querySelectorAll('.child').forEach((elem) => {
        elem.addEventListener("mouseout", () => {
            gsap.to("#cursor", {
                transform: 'translate(-50%,-50%) scale(0)',
            })
        })
    })

}
const Locomotiveanimation = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}



Locomotiveanimation();
videoAnimation();
loadingAnimation();
moveCursor();