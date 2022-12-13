// formats a time in milliseconds into mm:ss.xxx
// 1024 --> 00:01.024
export const formatTime = (time) => {
    let mills = time % 1000;
    time = (time - mills) / 1000;
    let secs = time % 60;
    let mins = Math.floor(time / 60);

    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${Math.round(mills).toString().padStart(3, '0')}`;
}
