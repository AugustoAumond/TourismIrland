"use strict";
var Premium = Premium || {};


Premium.creative = {
    init: function () {
        /* START OF CUSTOM JS */


        // Premium.video.pauseVideoWhenHidden = true;
        switch (document.body.id) {
            case "body_top":
                // TOP ---------------------------------------------------------------
                Premium.communicator.init(4);

                var animTop = gsap.timeline({ delay: 0.3, paused: true });
                animTop
                    /*.to('#body_top .anim-big-gardem', 1, { opacity: 1, top: "0px", stagger: .2, ease: "power2.out" }, '<+.3')
                    .to('#body_top .anim-date', 1, { opacity: 1,left: '0px', ease: 'power2.out' }, '<+0')
                    /*.to('#body_top .anim-shape', 1, { opacity: 1, left: '0px', ease: 'power2.out'}, '<+.6')
                    .to('#body_top .anim-text', 1, { opacity: 1, ease: 'power2.out'}, '<+.3')*/                    
                    /*.to('.anim-cta', 1, { opacity: 1, ease: 'power2.out', scale: 1 }, '<+.6')*/

                    
                Premium.creative.createVideoPlayerAppended = function(video, container) {
                    Premium.video.switchOnScroll(container, 3);
                    Premium.video.sync(video, 1);
                    var prom = video.play(); // Explicitly play the video
                    if (prom) {
                        prom.catch(function() {})
                    }
                    PremiumJpControls.callOnClickFullScreen(function(el) {
                        video.muted = false;
                        Premium.expand.expand("expanded.html", "width:70vw;height:39.5vw;overflow:hidden;")
                    })
                }

                Premium.communicator.api.receiveMessage(function (e) {
                    if (e.id === 'play') {
                        animTop.play();
                    }
                });

                // animation.animTop()

                // ====================CTA-HOVER====================
                /*var cta = document.querySelector('#container-cta');
                cta.addEventListener('mouseover', () => {
                    gsap.to("#container-cta", .5, { scale: 1.1, ease: 'power2.out' })
                })

                cta.addEventListener('mouseout', () => {
                    gsap.to("#container-cta", .5, { scale: 1, ease: 'power2.out' })
                })*/
                // ====================END-CTA-HOVER====================

                break;

            case "body_left":
                Premium.communicator.init(4)

                Pex.text('.title', 100)
                Pex.text('.text', 100)
                Pex.text('.text-cta', 75)

                var animLeft = gsap.timeline({ delay: 0.3, paused: true });

                animLeft
                .to('#body_left .anim-logo-1', 1, { opacity: 1, x: '0px', ease: "power1.out" }, '<+.3')
                .to('#body_left .anim-logo-2', 1, { opacity: 1, y: '0px', ease: Bounce.easeOut}, '<+.0')
                .to('#body_left .title', 1, { opacity: 1, ease: 'power1.out'}, '<+.3')
                .to('#body_left .text', 1, { opacity: 1, x: '0px', ease: 'power2.out', stagger: .2 }, '<+.3')
                .to('#body_left .anim-cta', 1, { opacity: 1, scale: 1, ease: 'power2.out'}, '<+.3')

                Premium.communicator.api.receiveMessage(function (e) {
                    if (e.id === 'play') {
                    
                    }
                });

                var open = document.querySelector('#container-left');
                var stop = true;

                open.addEventListener('mouseover',(()=>{
                    Premium.communicator.api.sendMessage({ action: "left"});

                    gsap.to('#container-left', 0.7, { width: '90%', left: '0', ease: 'power2.easeOut', delay: 0.6 })
                    gsap.to('.jp-controls-holder', 0.7, { width: '100%', ease: 'power2.easeOut', delay: 0.6 })
                    gsap.to('#container-plus', 0.7, { opacity: 0, ease: 'power2.easeOut', delay: 0.6 })
            

                    carouselObj.autoShowTimer(2500)

                    setTimeout(()=>{
                        Pex.text('.title', 100)
                        Pex.text('.text', 100)
                        Pex.text('.text-cta', 60)

                        animLeft.play();

                        gsap.to('#container-plus', 0.7, { display: 'none', ease: 'power2.easeOut', delay: 0.6 })

                    },[500])

                    setTimeout(()=>{
                        if (stop === true){
                            carouselObj.autoShowTimer(0)
                        } else {
                            setTimeout(()=>{
                                carouselObj.autoShowTimer(0)
                            },[7600])

                            stop = true; 
                        }
                    },[7600])

                }))

                Premium.communicator.api.receiveMessage(function(mess) {           
                    
                    if (mess.action === "right"){
                        gsap.to('#container-left', 0.7, { width: '450px', left: '-408px', ease: 'power2.easeOut', delay: 0.6 })

                        gsap.to('#container-plus', 0.7, { opacity: 1, display: 'unset', ease: 'power2.easeOut', delay: 0.1 })

                        carouselObj.autoShowTimer(0)

                        stop = false;
                    }
                })

                /*CAROUSEL*/
                //carousel
                var carouselEl = document.getElementById('carousel-wrapper')

                var carouselObj = new JPCarousel(carouselEl, JPCarousel.Horiz, JPCarousel.Bottom, true, 'assets/arrow.png')
                carouselObj.setIsFadeOutOtherItems(true)
                carouselObj.setTweenEase(Power2.easeOut)
                carouselObj.setTweenTime(0.3)
                
                gsap.to('#carousel-container', 0.7, { opacity: 1, ease: 'power2.easeOut', delay: 0.6 })

                // LEFT ---------------------------------------------------------------

                // ====================CTA-HOVER====================
                var cta = document.querySelector('#container-cta');
                if (cta){
                    cta.addEventListener('mouseover', () => {
                        gsap.to("#container-cta", .5, { scale: 1.1, ease: 'power2.out' })
                    })
    
                    cta.addEventListener('mouseout', () => {
                        gsap.to("#container-cta", .5, { scale: 1, ease: 'power2.out' })
                    })
                }

                var cta1 = document.querySelector('#container-cta-scroll');
                if (cta1){
                    cta1.addEventListener('mouseover', () => {
                        gsap.to("#container-cta-scroll", .5, { scale: 1.1, ease: 'power2.out' })
                    })
    
                    cta1.addEventListener('mouseout', () => {
                        gsap.to("#container-cta-scroll", .5, { scale: 1, ease: 'power2.out' })
                    })
                }

                  // ====================END-CTA-HOVER====================
                
                Premium.creative.createVideoPlayerAppended = function(video, container) {
                    video.volume = 0;
                    Premium.video.switchOnScroll(container, 3);
                    Premium.video.sync(video, 1);
                    var prom = video.play(); // Explicitly play the video
                    if (prom) {
                        prom.catch(function() {})
                    }
                    PremiumJpControls.callOnClickFullScreen(function(el) {
                        video.muted = false;
                        Premium.expand.expand("expanded.html", "width:70vw;height:39.5vw;overflow:hidden;")
                    })
                }

                // ====================SCROLL-HANDLER====================
                //**** ↓↓ função para quando der o scroll mover ou animar algum elemento ↓↓ ****
                Premium.video.switchOnScroll(undefined, 2, function scrollHandler(pos) {
                    if (pos === "up") {
                        gsap.to('.scroll-left', .5, {  opacity: 0, ease: 'power3.out' })
                        gsap.to('#container-cta', .5, {  zIndex: 3, opacity: 1, ease: 'power3.out' })

                    } else if (pos === "down") {
                        gsap.to('.scroll-left', .5, {  opacity: 1, ease: 'power3.out' })
                        gsap.to('#container-cta', .5, {  zIndex: 1, opacity: 0, ease: 'power3.out' })
                        //gsap.to('#container-slogan-top', .5, { opacity: 0, ease: 'power3.out' })
                    }
                });

                // ====================END-SCROLL-HANDLER====================
                break;

            case "body_right":                
                Premium.communicator.init(4)
                // RIGHT ---------------------------------------------------------------

                Pex.text('.title', 100)
                Pex.text('.text', 100)
                Pex.text('.text-cta', 75)

                var animRight = gsap.timeline({ delay: 0.3, paused: true });

                animRight
                .to('#body_right .anim-logo-1', 1, { opacity: 1, x: '0px', ease: "power1.out" }, '<+.3')
                .to('#body_right .anim-logo-2', 1, { opacity: 1, y: '0px', ease: Bounce.easeOut}, '<+.0')
                .to('#body_right .title', 1, { opacity: 1, ease: 'power1.out'}, '<+.3')
                .to('#body_right .text', 1, { opacity: 1, x: '0px', ease: 'power2.out', stagger: .2 }, '<+.3')
                .to('#body_right .anim-cta', 1, { opacity: 1, scale: 1, ease: 'power2.out'}, '<+.3')

                setTimeout(function () {
                    var message = { from: 'right', id: 'play' };
                    Premium.communicator.api.sendMessage(message);
                }, 600);

                var open = document.querySelector('#container-right');
                var stop = true;

                open.addEventListener('mouseover',(()=>{
                    Premium.communicator.api.sendMessage({ action: "right"});

                    gsap.to('#container-right', 0.7, { width: '90%', right: '0', ease: 'power2.easeOut', delay: 0.6 })
                    gsap.to('.jp-controls-holder', 0.7, { width: '100%', ease: 'power2.easeOut', delay: 0.6 })
                    gsap.to('#container-plus', 0.7, { opacity: 0, ease: 'power2.easeOut', delay: 0.6 })

                    carouselObj.autoShowTimer(2500)

                    setTimeout(()=>{
                        Pex.text('.title', 100)
                        Pex.text('.text', 100)
                        Pex.text('.text-cta', 60)

                        animRight.play();

                        gsap.to('#container-plus', 0.7, { display: 'none', ease: 'power2.easeOut', delay: 0.6 })
                    },[500])                   

                    setTimeout(()=>{
                        if (stop === true){
                            carouselObj.autoShowTimer(0)
                        } else {
                            setTimeout(()=>{
                                carouselObj.autoShowTimer(0)
                            },[7600])

                            stop = true;
                        }                        

                    },[7600])

                }))

                Premium.communicator.api.receiveMessage(function(mess) {              

                    if (mess.action === "left"){
                        gsap.to('#container-right', 0.7, { width: '450px', right: '-408px', ease: 'power2.easeOut', delay: 0.6 })

                        gsap.to('#container-plus', 0.7, { opacity: 1, display: 'unset', ease: 'power2.easeOut', delay: 0.6 })
                        
                        carouselObj.autoShowTimer(0)

                        stop = false;

                    }
                })

                /*CAROUSEL*/
                //carousel
                var carouselEl = document.getElementById('carousel-wrapper')

                var carouselObj = new JPCarousel(carouselEl, JPCarousel.Horiz, JPCarousel.Bottom, true, 'assets/arrow.png')
                carouselObj.setIsFadeOutOtherItems(true)
                carouselObj.setTweenEase(Power2.easeOut)
                carouselObj.setTweenTime(0.3)
                carouselObj.autoShowTimer(0)
        
                carouselObj.on("showitem", function (index) {
                    if (index === 0 || index === 2) {

                    }

                    if (index === 1 || index === 3) {

                    }
                });
                        
                gsap.to('#carousel-container', 0.7, { opacity: 1, ease: 'power2.easeOut', delay: 0.6 })

                carouselEl.addEventListener('resize',(()=>{
                    gsap.to('#carousel-container', 0.7, { width: '100%', ease: 'power2.easeOut', delay: 0.6 })
                }))

               // ====================CTA-HOVER====================
                var cta = document.querySelector('#container-cta');
                if (cta){
                    cta.addEventListener('mouseover', () => {
                        gsap.to("#container-cta", .5, { scale: 1.1, ease: 'power2.out' })
                    })

                    cta.addEventListener('mouseout', () => {
                        gsap.to("#container-cta", .5, { scale: 1, ease: 'power2.out' })
                    })
                }

                var cta1 = document.querySelector('#container-cta-scroll');
                if (cta1){
                    cta1.addEventListener('mouseover', () => {
                        gsap.to("#container-cta-scroll", .5, { scale: 1.1, ease: 'power2.out' })
                    })

                    cta1.addEventListener('mouseout', () => {
                        gsap.to("#container-cta-scroll", .5, { scale: 1, ease: 'power2.out' })
                    })
                }

                    // ====================END-CTA-HOVER====================
                
                Premium.creative.createVideoPlayerAppended = function(video, container) {
                    video.volume = 0;
                    Premium.video.switchOnScroll(container, 3);
                    Premium.video.sync(video, 1);
                    var prom = video.play(); // Explicitly play the video
                    if (prom) {
                        prom.catch(function() {})
                    }
                    PremiumJpControls.callOnClickFullScreen(function(el) {
                        video.muted = false;
                        Premium.expand.expand("expanded.html", "width:70vw;height:39.5vw;overflow:hidden;")
                    })
                }

                // ====================SCROLL-HANDLER====================
                //**** ↓↓ função para quando der o scroll mover ou animar algum elemento ↓↓ ****
                Premium.video.switchOnScroll(undefined, 2, function scrollHandler(pos) {
                    if (pos === "up") {
                        gsap.to('.scroll-right', .5, {  opacity: 0, ease: 'power3.out' })
                        gsap.to('#container-cta', .5, {  zIndex: 3, opacity: 1, ease: 'power3.out' })

                    } else if (pos === "down") {
                        gsap.to('.scroll-right', .5, {  opacity: 1, ease: 'power3.out' })
                        gsap.to('#container-cta', .5, {  zIndex: 1, opacity: 0, ease: 'power3.out' })
                        //gsap.to('#container-slogan-top', .5, { opacity: 0, ease: 'power3.out' })
                    }
                });
                
                break;

            case "body_back":
                Premium.communicator.init(4)
                
                var playerReadyHandler = function() {
                    var videoEl = document.querySelector("video");
                    videoEl.play();
            
                }
                playerReadyHandler();
                // RIGHT ---------------------------------------------------------------


                break;

            case "body_expanded":

                Premium.creative.createVideoPlayerAppended = function(video, container) {
                    video.volume = 0;
                    video.addEventListener("playing", function() {
                        setTimeout(function() {
                            document.body.className += " fade-in";
                        }, 100);
                    }, { once: true })
                    Premium.video.sync(video, undefined, Premium.video.SyncType_Get);
                    var prom = video.play(); // Explicitly play the video
                    if (prom) {
                        prom.catch(function() {})
                    }

                    // Safari fix
                    document.body.addEventListener("click", function(e) {
                        if (e.target.className && (e.target.className.indexOf("jp-controls-play") > -1 || e.target.className.indexOf("jp-controls-bigplay") > -1)) {
                            if (!video.paused) {
                                setTimeout(function() {
                                    video.play();
                                }, 1000)

                            }
                        }
                    });
                    
                }

                break;

        }
        /* END OF CUSTOM JS */
    }
}