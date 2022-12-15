// formats a time in milliseconds into mm:ss.xxx
// 1024 --> 00:01.024
export const formatTime = (time) => {
    let mills = time % 1000;
    time = (time - mills) / 1000;
    let secs = time % 60;
    let mins = Math.floor(time / 60);

    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${Math.round(mills).toString().padStart(3, '0')}`;
}

export const getScramble = () => {
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max)
    }
    const letters = ['U', 'D', 'L', 'R', 'F', 'B'];
    const mods = ['', '\'', '2'];

    let moves = [];
    let prev_1 = -1;
    let prev_2 = -1;
    for (let i = 0; i < 20; i++) {
        let cur = getRandomInt(6);
        if (cur === prev_1) {
            i -= 1;
            continue;
        }
        if (i === 0) {
            // create move
            let letter = letters[cur];
            let mod = mods[getRandomInt(mods.length)];
            moves.push(letter + mod);

            prev_1 = cur;
            prev_2 = cur;
        } else {
            if (Math.floor(prev_1 / 2) === Math.floor(prev_2 / 2) && cur === prev_2) {
                i -= 1;
                continue;
            }

            // create move
            let letter = letters[cur];
            let mod = mods[getRandomInt(mods.length)];
            moves.push(letter + mod);

            prev_2 = prev_1;
            prev_1 = cur;
        }
    }

    let scramble = '';
    moves.forEach((move) => scramble = scramble.concat(move, ' '));
    return scramble;
}
