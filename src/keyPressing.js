// https://github.com/brunoinds/isKeyPressed

class KeyPressed {
    keyPresseds = [];

    constructor() {
        addEventListener('keydown', (e) => {
            this.keyPresseds.includes(e.code) === false && this.keyPresseds.push(e.code);
        });

        addEventListener('keyup', (e) => {
            if (this.keyPresseds.includes(e.code) === true) {
                let index = this.keyPresseds.indexOf(e.code);
                index > -1 && this.keyPresseds.splice(index, 1);
            }
        });

        addEventListener('blur', () => {
            this.keyPresseds = [];
        });
    }

    isKeyPressed = (keyCode) => {
        return this.keyPresseds.includes(keyCode);
    };
}

export const keyPressed = new KeyPressed;