

// EZ MÁIG NEM ÉRTEM MIÉRT NEM MŰKÖDÖTT
/* const filterData = () => {
  try {
    const arr = getData().then((data) => data).then((data) => data);
    console.log(arr);
    const filteredArr = arr.filter((item) => item.dead !== true).slice(0, -1);
    return filteredArr;
  } catch (error) {
    console.error(`Valami hiba van az adatok szűrésekor: ${error}`);
    return '';
  }
};

const sortArr = () => {
  try {
    const arr = filterData().then((data) => data);
    const sortedArr = arr.sort((a, b) => a.name.split(' ').slice(-1)[0].localeCompare(b.name.split(' ').slice(-1)[0], 'hu'));

    return sortedArr;
  } catch (error) {
    console.error(`Valami hiba van az adatok rendezésekor: ${error}`);
    return '';
  }
};
 */
/* const findPerson = (name) => {
  try {
    const result = sortArr();
    const person = result.find((item) => item.name.toLowerCase() === name);
    return person;
  } catch (error) {
    console.error('Nem találtunk a keresésnek megfelelő személyt!');
    return '';
  }
}; */

