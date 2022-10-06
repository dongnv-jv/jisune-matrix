class MatrixAnimation {
    /**
     * 
     * @param {object} element HTML Object in dem der Matrix Effekt gerendert werden soll
     * @param {string} lettersColor Farbe der Schrift
     * @param {number} letterSize Größe der Schrift
     * @param {*} font Schriftfamilie
     * @param {*} speed Geschwindigkeit
     */
    constructor(element, lettersColor, letterSize, font, speed) {
        this.element = element;
        this.width = element.offsetWidth;
        this.height = element.offsetHeight;
        this.lettersColor = lettersColor;
        this.letterSize = letterSize;
        this.font = font;
        this.speed = speed < 20 ? 24 : speed;
        this.status = true;
        this.ctx = undefined;
        this.letters = undefined;
    }

    drawAnimation() {
        let code = '012345678901010123456789010101'
            
        if (this.status) {
            this.ctx.fillStyle = this.lettersColor;
            this.ctx.font = `${this.letterSize}pt ${this.font}`;

            this.letters.forEach((y, index) => {
                // const randomSymbol = String.fromCharCode(Math.random() * 128);
                const randomSymbol = code[Math.floor(Math.random() * code.length)]
                const x = index * this.letterSize;

                this.ctx.fillText(randomSymbol, x, y);

                if (y > 250 + Math.random() * 15000) this.letters[index] = 0;
                else this.letters[index] = y + this.letterSize;
            });

            this.ctx.fillStyle = `rgba(0, 0, 0, 0.05)`;
            this.ctx.fillRect(0, 0, this.width, this.height);
        }

    }

    createCanvas(element) {
        this.element.innerHTML = '';

        this.width = element ? element.offsetWidth : this.width;
        this.height = element ? element.offsetHeight : this.height;

        const canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'canvas');
        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);

        this.ctx = canvas.getContext('2d');

        const col = Math.floor(this.width / this.letterSize);
        this.letters = Array(col).fill(0);

        this.element.append(canvas);

    }

    init() {
        this.createCanvas();

        setInterval(() => {
            this.drawAnimation();
        }, this.speed);

    }
    pausePlay() {
        this.status = this.status ? false : true;
    }

}

const matrix = new MatrixAnimation(document.querySelector('#matrix'), '#1aaf2e', 10, 'Arial', 80);

matrix.init();

window.addEventListener('resize', () => {
    matrix.createCanvas(document.querySelector('#matrix'));
});