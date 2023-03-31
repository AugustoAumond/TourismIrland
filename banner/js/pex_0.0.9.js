/** @module Pex */
var Pex = {
    /** 
     * Makes text responsive
     * @constructor  
     * @param {string} fontContainer - A string containing the class selector of the text element that will be made responsive
     * @param {number} textCoverage - An integer representing the percentage of the text container to be filled. Use values larger than 100 for text in multiple lines.
     * @param {number} minFontSize - Optional - An integer describing the minimum allowed font size, in pixels.
     * @param {number} letterSpacing - Optional - An integer describing the desired letter spacing, in pixels. 0 or undefinded will revert to default.
     * @param {string} parentContainer - Optional - A class selector for manually defining the container element from which the text will scale based on.
     */
    text: function (fontContainer, textCoverage, minFontSize, letterSpacing, parentContainer) {
        if (!(this instanceof Pex.text)) {
            return new Pex.text(fontContainer, textCoverage, minFontSize, letterSpacing, parentContainer);
        }
        this.fontContainer = document.querySelector(fontContainer);
        this.textCoverage = textCoverage;
        this.minFontSize = minFontSize;
        this.letterSpacing = letterSpacing;
        this.parentContainer = document.querySelector(parentContainer) || document.querySelector(fontContainer).parentElement;
        this.fontFamily = window.getComputedStyle(this.fontContainer).getPropertyValue('font-family');
        this.selector = fontContainer;
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.sampleTextSize = 32;
        this.context.font = this.sampleTextSize + "px " + this.fontFamily;

        window.addEventListener('load', this.resizeFont.bind(this));
        try { window.top.addEventListener('resize', this.resizeFont.bind(this)); } catch (err) { }
        window.addEventListener('resize', this.resizeFont.bind(this));
        setTimeout(this.resizeFont.bind(this), 100);
        setTimeout(this.resizeFont.bind(this), 300);
        setTimeout(this.resizeFont.bind(this), 500);

    },
    emText: function (container, minFontSize) {
        if (!(this instanceof Pex.emText)) {
            return new Pex.emText(container, minFontSize);
        }
        this.container = container
        this.minFontSize = minFontSize;

        window.addEventListener('load', this.resizeFont.bind(this));
        try { window.top.addEventListener('resize', this.resizeFont.bind(this)); } catch (err) { }
        window.addEventListener('resize', this.resizeFont.bind(this));
        setTimeout(this.resizeFont.bind(this), 100);
        setTimeout(this.resizeFont.bind(this), 300);
        setTimeout(this.resizeFont.bind(this), 500);
    },
    sequence: function () {
        this.parentContainer = '';
        this.animationContainer = 'spritesheet';
        this.imgsNumber = 0;
        this.spriteArray = [];
        this.imgsName = 'spritesheet';
        this.imgExtension = 'png';
        this.spritePath = 'assets/sprite';
        this.animationSpeed = 25; //TODO Realizar cálculo para poder inserir velocidade em FPS
        this.imgToShow = 0;
        this.isAnimation = false;
        this.initialImg = 0;
        this.loop = false;
        this.firstPlay = true;
        this.hasEndedAnim = false;
    }
}
var text = Pex.text.prototype;
var sequence = Pex.sequence.prototype;
var emText = Pex.emText.prototype;

// TEXT METHODS
text.resizeFont = function () {
    var nodelist = Array.prototype.slice.call(document.querySelectorAll(this.selector));
    for (var i = 0; i < nodelist.length; i++) {
        if (nodelist[i].textContent.length > this.fontContainer.textContent.length) {
            this.fontContainer = nodelist[i]
        }
    }
    var textLength = this.fontContainer.textContent.length;
    var containerWidth = this.parentContainer.offsetWidth;
    var textWidth = this.context.measureText(this.fontContainer.textContent).width;
    var letterSpacing = parseFloat(getComputedStyle(this.fontContainer).letterSpacing);
    letterSpacing = isNaN(letterSpacing) ? 0 : letterSpacing;
    var fontSize = ((containerWidth - letterSpacing * (textLength - 1))) / textWidth * this.sampleTextSize * this.textCoverage / 100;
    var minFontSize = this.minFontSize;
    nodelist.forEach(function (node) {
        if (fontSize < minFontSize) {
            node.style.fontSize = minFontSize + "px";
        } else {
            node.style.fontSize = fontSize + "px";
        }
    });
};

text.debug = function () {
    console.log(this.fontContainer);
    console.log(this.parentContainer);
    this.parentContainer.style.border = "2px dashed green";
    var containerWidthText = document.createElement("p");
    containerWidthText.style.fontSize = "10px";
    containerWidthText.style.color = "green";
    containerWidthText.style.position = "absolute";
    containerWidthText.style.right = "-20px";
    containerWidthText.style.top = 0;
    containerWidthText.textContent = this.parentContainer.offsetWidth + "px";
    this.parentContainer.appendChild(containerWidthText)
    // var textBox = document.createElement("div");
    // this.fontContainer.parentElement.appendChild(textBox)
    // textBox.style.border = "2px dashed red";
    // textBox.style.width = this.context.measureText(this.fontContainer.textContent).width + "px";
    // textBox.style.height = window.getComputedStyle(this.fontContainer).getPropertyValue('height');
    // console.log(this.fontContainer.offsetHeight)
    // textBox
};

//EM TEXT METHODS 
emText.resizeFont = function () {
    // console.log(this.container)
    var nodelist = Array.prototype.slice.call(document.querySelectorAll(this.container));
    for (var i = 0; i < nodelist.length; i++) {
        nodelist[i].style.fontSize = (nodelist[i].offsetWidth / 10) + "px";
    }
};

// SEQUENCE METHODS
sequence.setOptions = function (object) {
    this.parentContainer = object.parentContainer;
    this.imgsNumber = object.imgsNumber;
    this.animationContainer = object.animationContainer;
    this.imgsName = object.imgsName;
    this.imgExtension = object.imgExtension;
    this.spritePath = object.spritePath;
    this.animationSpeed = object.animationSpeed;
    this.loop = object.loop;
};

/** 
 * @function load
 * Loads the sequence when the images are added through javascript 
 */
sequence.load = function () {
    if (this.firstPlay) {
        this.firstPlay = false;
        this.addImgsToDom(this.animationContainer, 'sprite', this.imgsNumber);
    }
}

/** 
 * @function get
 * Loads the sequence when the images are added through plain html 
 */
sequence.get = function () {
    if (this.firstPlay) {
        this.firstPlay = false;
        for (var i = 1; i <= this.imgsNumber; i++) {
            var image = document.getElementById(this.animationContainer + '-' + i);
            console.log(image)
            this.spriteArray.push(image);
        }
    }
}

/** 
 * @function play
 * Plays the animation for the loaded sequence 
 */
sequence.play = function () {
    this.isAnimation = true;
    this.imgToShow = this.initialImg;
    this.animation(this.hasEnded);
    return this;
}

sequence.pause = function () {
    this.isAnimation = false;
}

sequence.animation = function (callback) {
    if (this.isAnimation) {
        var thisAnimation = this;
        if (this.imgToShow < this.imgsNumber) {
            this.setAllToHidden();
            this.setToVisible(this.imgToShow);
            this.imgToShow++;
            setTimeout(function () {
                thisAnimation.animation(callback);
            }, this.animationSpeed);
        } else {
            callback(this);
        }
    }
};

sequence.setToVisible = function (positionArrayImages) {
    if (this.spriteArray.length != 0)
        this.spriteArray[positionArrayImages].style.visibility = 'visible';
}

sequence.addImgsToDom = function (idSpriteSheet, nameClassSpriteSheet, imgsNumber) {

    var parentContainerRef = document.getElementById(this.parentContainer);
    var animationContainerRef = this.elementCreator('div', idSpriteSheet, nameClassSpriteSheet);
    this.appendChildDivInDom(parentContainerRef, animationContainerRef);
    for (var i = 0; i < imgsNumber; i++) {
        var createdImg;
        var imgClass;
        if (i != 0) {
            imgClass = 'pos-a';
        } else {
            imgClass = 'pos-r';
        }
        createdImg = this.elementCreator('img', this.animationContainer + '-' + i,
            imgClass + ' ' + this.animationContainer);
        createdImg.src = this.spritePath + '/' + this.imgsName + '-' + i + '.' + this.imgExtension;
        this.spriteArray.push(createdImg);
        this.appendChildDivInDom(animationContainerRef, createdImg);
    }
    this.setAllToHidden();
};

sequence.setAllToHidden = function () {
    if (this.spriteArray.length != 0)
        for (var i = 0; i < this.imgsNumber; i++)
            this.spriteArray[i].style.visibility = 'hidden';
}

sequence.elementCreator = function (divNameToCreate, id, classList) {
    var div = document.createElement(divNameToCreate);
    div.id = id;
    div.className = classList;
    return div;
}

sequence.appendChildDivInDom = function (parentDiv, childDiv) {
    parentDiv.appendChild(childDiv);
}

sequence.showInitialImg = function (initialImg) {
    this.initialImg = initialImg;
    if (this.spriteArray.length != 0)
        this.spriteArray[this.initialImg].style.visibility = 'visible';
}

sequence.resetSpriteSheet = function () {
    this.showInitialImg(0);
    this.pause();
    this.setAllToHidden();
    this.load();
    this.play();
}

sequence.hasEnded = function (pointer) {
    if (pointer.loop) {
        pointer.resetSpriteSheet();
    } else {
        pointer.hasEndedAnim = true;
    }
}