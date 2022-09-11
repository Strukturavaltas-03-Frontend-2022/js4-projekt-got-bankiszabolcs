const getData = async () => {
  try {
    const result = await fetch('./json/got.json').then((data) => data.json());
    return result;
  } catch (error) {
    console.error(`Valami hiba van a adatok lekérésekor: ${error}`);
    return '';
  }
};

getData();

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
    const sortedArr = arr.sort((a, b) => a.name.localeCompare(b.name, 'hu'));

    return sortedArr;
  } catch (error) {
    console.error(`Valami hiba van az adatok rendezésekor: ${error}`);
    return '';
  }
};

sortArr().then(console.log);
