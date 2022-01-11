export let lenght = 2;
let i = 0;

export const nextImageHundler = (next) => {
    if (i <= lenght) {
        let newIndex = i += 1;
        next(newIndex)
    }
}
