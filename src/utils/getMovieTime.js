const getMovieTime = (min) => {
    let hours = Math.trunc(min / 60);
    let minutes = min % 60;
    if (hours < 1) {
        return minutes + 'м';
    } else {
        return hours + 'ч ' + minutes + 'м';
    }
}

export default getMovieTime;