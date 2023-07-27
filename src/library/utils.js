/**
 * Возвращает рандомное число по переданным параметрам.
 * @param {number} max.
 * @param {number} min.
 * @return {number}
 */
export const getRandomNumber = (max = 10, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

export const shuffleList = list => {
    for (let i = list.length - 1; i > 0; i--) {
        let j = getRandomNumber(i);

        [list[i], list[j]] = [list[j], list[i]];
    }

    return list;
}