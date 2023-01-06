for (let i = 0; i <= 20; i++) {
    console.log(
        `${i * 5}% {background: linear-gradient(to top, var(--darkestgrey) ${
            i * 5
        }%, black ${i * 5}%, black 100%);}`
    );
}
