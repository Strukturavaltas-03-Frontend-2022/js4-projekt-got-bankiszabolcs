const getData = async () => {
  try {
    const result = await fetch('./json/got.json').then((data) => data.json());
    return result;
  } catch (error) {
    console.error(`Valami hiba van a adatok lekérésekor: ${error}`);
    return '';
  }
};

const filterData = async () => {
  try {
    const arr = await getData().then((data) => data);
    const filteredArr = arr.filter((item) => item.dead !== true).slice(0, -1);
    return filteredArr;
  } catch (error) {
    console.error(`Valami hiba van az adatok szűrésekor: ${error}`);
    return '';
  }
};

const sortArr = async () => {
  try {
    const arr = await filterData().then((data) => data);
    const sortedArr = arr.sort((a, b) => a.name.split(' ').slice(-1)[0].localeCompare(b.name.split(' ').slice(-1)[0], 'hu'));

    return sortedArr;
  } catch (error) {
    console.error(`Valami hiba van az adatok rendezésekor: ${error}`);
    return '';
  }
};

const findPerson = async (name) => {
  try {
    const result = await sortArr();
    const person = result.find((item) => item.name.toLowerCase() === name);
    return person;
  } catch (error) {
    console.error('Nem találtunk a keresésnek megfelelő személyt!');
    return '';
  }
};

export {
  sortArr,
  findPerson,
};
