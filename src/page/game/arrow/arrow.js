class Confettiful {
    constructor(el) {
        this.el = el;
        this.containerEl = null;

        this.confettiFrequency = 3;
        this.confettiColors = ['#fce18a', '#ff726d', '#b48def', '#f4306d'];
        this.confettiAnimations = ['slow', 'medium', 'fast'];

        this._setupElements();
    }

    _setupElements() {
        // Try to find confetti-container inside the provided element first
        if (this.el) {
            this.containerEl = this.el.querySelector('.confetti-container') ||
                              this.el.querySelector('[class*="confetti-container"]');
        }

        // Fallback to document query if not found
        if (!this.containerEl) {
            this.containerEl = document.querySelector('.confetti-container') ||
                              document.querySelector('[class*="confetti-container"]');
        }
    }

    _renderConfetti() {
        if (!this.containerEl || !this.el) {
            console.warn('Confetti container or element not found');
            return;
        }

        this.confettiInterval = setInterval(() => {
            if (!this.containerEl || !this.el) return;

            const confettiEl = document.createElement('div');
            const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
            const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
            const confettiLeft = (Math.floor(Math.random() * this.el.offsetWidth)) + 'px';
            const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];

            // Apply inline styles for animation
            confettiEl.style.position = 'absolute';
            confettiEl.style.zIndex = '1000';
            confettiEl.style.top = '-10px';
            confettiEl.style.left = confettiLeft;
            confettiEl.style.width = confettiSize;
            confettiEl.style.height = confettiSize;
            confettiEl.style.backgroundColor = confettiBackground;
            confettiEl.style.borderRadius = '0%';

            // Apply animation based on speed
            const animations = {
                'slow': 'confetti-slow 2.25s linear 1 forwards',
                'medium': 'confetti-medium 1.75s linear 1 forwards',
                'fast': 'confetti-fast 1.25s linear 1 forwards'
            };
            confettiEl.style.animation = animations[confettiAnimation];

            confettiEl.removeTimeout = setTimeout(function() {
                if (confettiEl.parentNode) {
                    confettiEl.parentNode.removeChild(confettiEl);
                }
            }, 3000);

            this.containerEl.appendChild(confettiEl);
        }, 25);
    }

    start() {
        this._renderConfetti();
    }

    stop() {
        clearInterval(this.confettiInterval);
    }
}

class ArrowSequence {
    constructor(index, otherArrows) {
        this.index = index;
        this.otherArrows = [...otherArrows];
        this.othersIndex = 0;
        this.againstIndex = 0;
    }

    get getOtherArrow() {
        return this.otherArrows[this.othersIndex % this.otherArrows.length];
    }

    shuffle() {
        for (let i = this.otherArrows.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.otherArrows[i], this.otherArrows[j]] = [this.otherArrows[j], this.otherArrows[i]];
        }
    }
}

class ArrowGame {
    constructor(canvas, onStatsUpdate, onTutorialComplete, onGameComplete, containerElement = null) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.onStatsUpdate = onStatsUpdate;
        this.onTutorialComplete = onTutorialComplete;
        this.onGameComplete = onGameComplete;
        this.containerElement = containerElement;

        // Set canvas size to full viewport
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Load arrow image
        this.arrowImage = new Image();
        this.arrowImage.src = '/assets/arrow/image/arrow.png';
        this.imageLoaded = false;
        this.arrowImage.onload = () => {
            this.imageLoaded = true;
            if (this.arrows.length > 0) {
                this.render();
            }
        };
        this.arrowImage.onerror = () => {
            console.warn('Failed to load arrow image');
            this.imageLoaded = true; // Continue without image
        };

        // Load audio files
        this.correctSound = new Audio('/assets/arrow/audio/correct.wav');
        this.wrongSound = new Audio('/assets/arrow/audio/wrong.wav');

        this.arrowSize = { width: 42, height: 72 };
        // Responsive createSize based on screen dimensions
        const baseWidth = Math.min(600, window.innerWidth * 0.9);
        const baseHeight = Math.min(500, window.innerHeight * 0.7);
        this.createSize = { width: baseWidth, height: baseHeight };
        this.createCount = this.isMobile ? 25 : 45;
        this.time = 60;
        this.lastTime = 10;

        this.isPlay = false;
        this.isLastCorrect = true;
        this.isTutorial = true;
        this.direction = 0;
        this.correctCount = 0;
        this.wrongCount = 0;
        this.tutorialCount = 0;
        this.gameTime = 0;
        this.lastInputTime = 0;
        this.tutorialCloseTime = 0;
        this.wrongWaitTime = 0;
        this.coins = 0;

        this.avgTimes = [];
        this.times = [[], [], []];
        this.avgCorrectTimes = [[], [], []];

        this.arrowIndex = 0;
        this.colorIndex = 0;
        this.isChangeColor = false;

        this.arrows = [];
        this.sequences = [
            new ArrowSequence(0, [1, 2, 3]),
            new ArrowSequence(1, [0, 2, 3]),
            new ArrowSequence(2, [0, 1, 3]),
            new ArrowSequence(3, [0, 1, 2])
        ];

        this.colors = [
            '#FF4444',
            '#4444FF',
            '#44FF44',
            '#FFFF44',
            '#FF44FF',
            '#44FFFF'
        ];
        this.mainColor = '#FFFFFF';

        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        this.confettiful = null;

        // Store event handlers for cleanup
        this.eventHandlers = {
            keydown: null,
            resize: null,
            touchstart: null,
            touchend: null
        };

        this.init();
    }

    init() {
        this.reset();
        this.shuffleArrows();
        this.setupEventListeners();

        if (this.isMobile) {
            const mobileInstructions = document.getElementById('mobileInstructions');
            if (mobileInstructions) {
                mobileInstructions.classList.remove('hidden');
            }
        }

        // Handle window resize
        this.eventHandlers.resize = () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            // Update createSize for responsive layout
            const baseWidth = Math.min(600, window.innerWidth * 0.9);
            const baseHeight = Math.min(500, window.innerHeight * 0.7);
            this.createSize = { width: baseWidth, height: baseHeight };
            if (this.arrows.length > 0) {
                this.render();
            }
        };
        window.addEventListener('resize', this.eventHandlers.resize);

        this.updateUI();
        this.showTutorial();
    }

    reset() {
        this.isPlay = false;
        this.isLastCorrect = true;
        this.correctCount = 0;
        this.wrongCount = 0;
        this.wrongWaitTime = 0;
        this.gameTime = 0;
        this.coins = 0;
        this.avgTimes = [];
        this.avgCorrectTimes = [[], [], []];
        this.times = [[], [], []];
        this.arrowIndex = 0;
        this.sequences.forEach(s => {
            s.othersIndex = 0;
            s.againstIndex = 0;
        });
    }

    shuffleArrows() {
        this.sequences.forEach(s => s.shuffle());

        for (let i = this.sequences.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.sequences[i], this.sequences[j]] = [this.sequences[j], this.sequences[i]];
        }
    }

    showTutorial() {
        // Tutorial overlay is visible by default
    }

    createRandomArrows() {
        this.direction = this.sequences[this.arrowIndex % this.sequences.length].index;

        // Sometimes all arrows point in same direction (30% chance)
        let direction2;
        if (Math.random() < 0.3) {
            direction2 = this.direction; // All arrows same direction
        } else {
            direction2 = this.sequences[this.arrowIndex % this.sequences.length].getOtherArrow;
        }

        if (this.direction + 2 === direction2) {
            this.sequences[this.arrowIndex % this.sequences.length].againstIndex++;
        }

        if (this.sequences[this.arrowIndex % this.sequences.length].againstIndex > 0 &&
            this.sequences[this.arrowIndex % this.sequences.length].againstIndex % 2 === 0) {
            this.isChangeColor = true;
            this.sequences[this.arrowIndex % this.sequences.length].againstIndex = 0;
        }

        this.arrows = [];

        const mainArrowPos = this.getRandomPosition();
        const mainArrow = this.createArrow(mainArrowPos, this.direction, this.mainColor, true);
        this.arrows.push(mainArrow);

        const rects = [this.getRect(mainArrowPos, this.direction)];

        for (let i = 0; i < this.createCount; i++) {
            let attempts = 0;
            let position;
            let rect;

            do {
                position = this.getRandomPosition();
                rect = this.getRect(position, direction2);
                attempts++;
            } while (attempts < 1000 && this.hasOverlap(rect, rects));

            if (attempts < 1000) {
                let color = this.mainColor;
                if (this.isChangeColor && Math.random() < 0.3) {
                    color = this.colors[this.colorIndex % this.colors.length];
                }

                const arrow = this.createArrow(position, direction2, color, false);
                this.arrows.push(arrow);
                rects.push(rect);
            }
        }

        if (this.isChangeColor) {
            this.colorIndex++;
            this.isChangeColor = false;
        }

        this.sequences[this.arrowIndex % this.sequences.length].othersIndex++;

        if (this.arrowIndex > 0 && this.arrowIndex % 3 === 0) {
            this.shuffleArrows();
        }

        this.arrowIndex++;
        this.render();
    }

    createArrow(position, direction, color, isMain) {
        return {
            x: position.x,
            y: position.y,
            direction: direction,
            color: color,
            isMain: isMain,
            scale: 0,
            createdAt: Date.now()
        };
    }

    getRandomPosition() {
        // Center the arrows in the middle of the canvas
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;

        return {
            x: centerX - this.createSize.width / 2 + Math.random() * (this.createSize.width - this.arrowSize.width) + this.arrowSize.width / 2,
            y: centerY - this.createSize.height / 2 + Math.random() * (this.createSize.height - this.arrowSize.height) + this.arrowSize.height / 2
        };
    }

    getRect(position, direction) {
        const size = direction % 2 === 0 ?
            { width: this.arrowSize.width, height: this.arrowSize.height } :
            { width: this.arrowSize.height, height: this.arrowSize.width };

        return {
            x: position.x - size.width / 2,
            y: position.y - size.height / 2,
            width: size.width,
            height: size.height
        };
    }

    hasOverlap(rect, rects) {
        // Use proper rectangle overlap detection to prevent any overlapping
        return rects.some(r =>
            rect.x < r.x + r.width &&
            rect.x + rect.width > r.x &&
            rect.y < r.y + r.height &&
            rect.y + rect.height > r.y
        );
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.arrows.forEach(arrow => {
            this.drawArrow(arrow);
        });

        // Continue rendering if any arrow is still animating
        const stillAnimating = this.arrows.some(arrow => {
            const elapsed = Date.now() - arrow.createdAt;
            return elapsed < 300;
        });
        if (stillAnimating) {
            requestAnimationFrame(() => this.render());
        }
    }

    createConfetti() {
        // Use provided container element or fallback to querySelector
        const gameContainer = this.containerElement || document.querySelector('.arrow-game-container');

        if (!gameContainer) {
            console.warn('Game container not found for confetti');
            return;
        }

        if (!this.confettiful) {
            this.confettiful = new Confettiful(gameContainer);
        }

        this.confettiful.start();

        // Stop confetti after 3 seconds
        setTimeout(() => {
            if (this.confettiful) {
                this.confettiful.stop();
            }
        }, 3000);
    }

    drawArrow(arrow) {
        if (!this.imageLoaded) return;

        // Animate rotation along vertical axis (Y-axis) from 90deg to 0deg over 300ms
        const elapsed = Date.now() - arrow.createdAt;
        const animationDuration = 300;
        let rotateY = 0;
        if (elapsed < animationDuration) {
            const progress = elapsed / animationDuration;
            rotateY = (1 - progress) * Math.PI / 2; // 90deg to 0deg
        }

        this.ctx.save();
        this.ctx.translate(arrow.x, arrow.y);

        // Umbrella starts pointing down (direction 2), so we need to adjust rotation
        // direction 0 (up) = rotate 180 degrees from down
        // direction 1 (right) = rotate -90 degrees from down
        // direction 2 (down) = no rotation (original)
        // direction 3 (left) = rotate 90 degrees from down
        const rotationOffset = 2; // umbrella's default direction is down (2)
        const adjustedDirection = arrow.direction - rotationOffset;
        this.ctx.rotate(adjustedDirection * Math.PI / 2);

        // Apply 3D rotation effect along vertical axis by scaling X
        const scaleX = Math.cos(rotateY);
        this.ctx.scale(scaleX, 1);

        const w = this.arrowSize.width;
        const h = this.arrowSize.height;

        // Draw umbrella image centered
        this.ctx.drawImage(this.arrowImage, -w / 2, -h / 2, w, h);

        this.ctx.restore();
    }

    handleInput(inputDirection) {
        if (!this.isPlay) return;

        const currentTime = Date.now();
        const reactionTime = (currentTime - this.lastInputTime) / 1000;

        this.avgTimes.push(reactionTime);
        const timeIndex = this.gameTime < 20 ? 0 : this.gameTime < 40 ? 1 : 2;
        this.times[timeIndex].push(reactionTime);

        if (!this.isLastCorrect) {
            this.wrongWaitTime = Math.max(this.wrongWaitTime, reactionTime);
        }

        this.isLastCorrect = this.direction === inputDirection;

        if (this.isLastCorrect) {
            this.correctCount++;
            this.coins += 10;
            this.showCoinIncrement();
            this.showFeedback('✓', '#4CAF50');
            this.avgCorrectTimes[timeIndex].push(reactionTime);
            // Play correct sound
            if (this.correctSound) {
                this.correctSound.currentTime = 0;
                this.correctSound.play().catch(e => console.log('Audio play failed:', e));
            }
        } else {
            this.wrongCount++;
            this.showFeedback('✗', '#FF5722');
            // Play wrong sound
            if (this.wrongSound) {
                this.wrongSound.currentTime = 0;
                this.wrongSound.play().catch(e => console.log('Audio play failed:', e));
            }
        }

        this.lastInputTime = currentTime;

        if (this.isTutorial && ++this.tutorialCount === 10) {
            this.completeTutorial();
        } else {
            setTimeout(() => this.createRandomArrows(), 300);
        }

        this.updateUI();
    }

    showFeedback(symbol, color) {
        // Show feedback icon
        const feedbackIcon = document.getElementById('feedbackIcon');
        if (!feedbackIcon) return;

        const iconSrc = symbol === '✓' ? '/assets/arrow/image/correct.png' : '/assets/arrow/image/wrong.png';
        feedbackIcon.src = iconSrc;
        feedbackIcon.classList.remove('feedback-icon-animate');

        // Trigger reflow to restart animation
        void feedbackIcon.offsetWidth;

        feedbackIcon.classList.add('feedback-icon-animate');

        setTimeout(() => {
            feedbackIcon.classList.remove('feedback-icon-animate');
            feedbackIcon.style.opacity = '0';
            feedbackIcon.style.transform = 'translateX(-50%) scale(0)';
        }, 800);
    }

    showCoinIncrement() {
        const coinIncrement = document.getElementById('coinIncrement');
        coinIncrement.textContent = '+10';
        coinIncrement.classList.remove('coin-animate');

        // Trigger reflow to restart animation
        void coinIncrement.offsetWidth;

        coinIncrement.classList.add('coin-animate');

        setTimeout(() => {
            coinIncrement.classList.remove('coin-animate');
        }, 1000);
    }

    completeTutorial() {
        this.isPlay = false;
        this.isTutorial = false;

        // Call callback
        if (this.onTutorialComplete) {
            this.onTutorialComplete();
        }

        // Also update DOM if it exists
        const overlay = document.getElementById('tutorialCompleteOverlay');
        if (overlay) overlay.style.display = 'flex';

        this.arrows = [];
        this.render();
    }

    updateUI() {
        const remainingTime = Math.ceil(this.time - this.gameTime);
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // Update via callback
        if (this.onStatsUpdate) {
            this.onStatsUpdate({
                timeLeft: remainingTime,
                correctCount: this.correctCount,
                wrongCount: this.wrongCount,
                coins: this.coins
            });
        }

        // Also update DOM elements if they exist
        const timeDisplay = document.getElementById('timeDisplay');
        if (timeDisplay) timeDisplay.textContent = `TIME ${timeString}`;

        const timeLeft = document.getElementById('timeLeft');
        if (timeLeft) timeLeft.textContent = remainingTime;

        const correctCount = document.getElementById('correctCount');
        if (correctCount) correctCount.textContent = this.correctCount;

        const wrongCount = document.getElementById('wrongCount');
        if (wrongCount) wrongCount.textContent = this.wrongCount;

        const coinCount = document.getElementById('coinCount');
        if (coinCount) coinCount.textContent = this.coins;
    }

    calculateAverage(times) {
        if (times.length === 0) return 0;
        return times.reduce((sum, time) => sum + time, 0) / times.length;
    }

    showGameComplete() {
        this.isPlay = false;

        // Trigger confetti animation
        this.createConfetti();

        const accuracy = this.correctCount + this.wrongCount === 0 ? 0 :
            Math.round((this.correctCount / (this.correctCount + this.wrongCount)) * 100);

        const avgTime = this.calculateAverage(this.avgTimes);
        const avgCorrectTime = this.calculateAverage(this.avgCorrectTimes.flat());

        const resultsData = {
            correctCount: this.correctCount,
            wrongCount: this.wrongCount,
            accuracy: accuracy,
            avgTime: avgTime.toFixed(2),
            avgCorrectTime: avgCorrectTime.toFixed(2),
            coins: this.coins
        };

        // Call callback
        if (this.onGameComplete) {
            this.onGameComplete(resultsData);
        }

        // Also update DOM if it exists
        const resultsEl = document.getElementById('results');
        if (resultsEl) {
            resultsEl.innerHTML = `
                <div style="text-align: left; line-height: 1.6;">
                    <div><strong>Correct:</strong> ${this.correctCount}</div>
                    <div><strong>Wrong:</strong> ${this.wrongCount}</div>
                    <div><strong>Accuracy:</strong> ${accuracy}%</div>
                    <div><strong>Average Time:</strong> ${avgTime.toFixed(2)}s</div>
                    <div><strong>Average Correct Time:</strong> ${avgCorrectTime.toFixed(2)}s</div>
                </div>
            `;
        }

        const overlay = document.getElementById('gameCompleteOverlay');
        if (overlay) overlay.style.display = 'flex';
    }

    gameLoop() {
        if (!this.isPlay) return;

        this.gameTime += 0.016;

        if (this.gameTime >= this.time) {
            this.showGameComplete();
            return;
        }

        this.updateUI();
        requestAnimationFrame(() => this.gameLoop());
    }

    setupEventListeners() {
        this.eventHandlers.keydown = (event) => {
            const keyMap = {
                'ArrowUp': 0,
                'ArrowRight': 1,
                'ArrowDown': 2,
                'ArrowLeft': 3
            };

            if (keyMap.hasOwnProperty(event.code)) {
                event.preventDefault();
                this.handleInput(keyMap[event.code]);
            }
        };
        document.addEventListener('keydown', this.eventHandlers.keydown);

        if (this.isMobile) {
            let touchStartX = 0;
            let touchStartY = 0;

            this.eventHandlers.touchstart = (event) => {
                event.preventDefault();
                touchStartX = event.touches[0].clientX;
                touchStartY = event.touches[0].clientY;
            };

            this.eventHandlers.touchend = (event) => {
                event.preventDefault();
                if (!event.changedTouches) return;

                const touchEndX = event.changedTouches[0].clientX;
                const touchEndY = event.changedTouches[0].clientY;
                const deltaX = touchEndX - touchStartX;
                const deltaY = touchEndY - touchStartY;
                const minSwipeDistance = 50;

                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    if (Math.abs(deltaX) > minSwipeDistance) {
                        const direction = deltaX > 0 ? 1 : 3; // Right : Left
                        this.handleInput(direction);
                    }
                } else {
                    if (Math.abs(deltaY) > minSwipeDistance) {
                        const direction = deltaY < 0 ? 0 : 2; // Up : Down (fixed direction)
                        this.handleInput(direction);
                    }
                }
            };

            this.canvas.addEventListener('touchstart', this.eventHandlers.touchstart);
            this.canvas.addEventListener('touchend', this.eventHandlers.touchend);
        }
    }
}

// Add methods to ArrowGame for external control
ArrowGame.prototype.startTutorial = function() {
    this.isTutorial = true;
    this.isPlay = true;
    this.lastInputTime = Date.now();
    this.createRandomArrows();
};

ArrowGame.prototype.startGame = function() {
    this.reset();
    this.isTutorial = false;
    this.isPlay = true;
    this.lastInputTime = Date.now();
    this.createRandomArrows();
    this.gameLoop();
};

ArrowGame.prototype.restart = function() {
    this.reset();
    this.isTutorial = false;
    this.isPlay = true;
    this.lastInputTime = Date.now();
    this.createRandomArrows();
    this.gameLoop();
};

ArrowGame.prototype.cleanup = function() {
    this.isPlay = false;

    // Stop confetti
    if (this.confettiful) {
        this.confettiful.stop();
    }

    // Remove all event listeners
    if (this.eventHandlers.keydown) {
        document.removeEventListener('keydown', this.eventHandlers.keydown);
    }
    if (this.eventHandlers.resize) {
        window.removeEventListener('resize', this.eventHandlers.resize);
    }
    if (this.eventHandlers.touchstart) {
        this.canvas.removeEventListener('touchstart', this.eventHandlers.touchstart);
    }
    if (this.eventHandlers.touchend) {
        this.canvas.removeEventListener('touchend', this.eventHandlers.touchend);
    }

    // Clear canvas
    if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Clear arrows array
    this.arrows = [];
};

// Export for ES6 modules
export default ArrowGame;