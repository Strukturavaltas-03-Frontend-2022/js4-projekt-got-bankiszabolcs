const mainContainer = document.querySelector('main');
const sidebarContainer = document.querySelector('.content');
const input = document.querySelector('.input');
const menu = document.querySelector('.fa-bars');
const sidebar = document.querySelector('.sidebar');

const getData = async () => {
  try {
    const request = await fetch('./json/got.json');
    const result = await request.json();
    return result.filter((item) => item.dead !== true).slice(0, -1)
      .sort((a, b) => a.name.split(' ').slice(-1)[0].localeCompare(b.name.split(' ').slice(-1)[0], 'hu'));
  } catch (error) {
    console.error(`Valami hiba van a adatok lekérésekor: ${error}`);
    return '';
  }
};

const result = await getData();

const createItem = function (container, image, alt, text) {
  const actualImg = container.querySelector('img');
  const actualText = container.querySelector('p');
  actualImg.src = image;
  actualImg.alt = alt;
  actualText.textContent = text;
};

const createOneItem = function () {
  const item = document.createElement('div');
  item.classList.add('row__item');
  const img = document.createElement('img');
  const par = document.createElement('p');
  item.appendChild(img);
  item.append(par);

  mainContainer.appendChild(item);
};

const createAllItems = function () {
  for (let i = 0; i < result.length; i += 1) {
    createOneItem();
  }
};

const loadData = () => {
  createAllItems();
  const allItem = Array.from(document.querySelectorAll('.row__item'));
  allItem.forEach((element, index) => {
    const actualPerson = result[index];
    createItem(element, actualPerson.portrait, actualPerson.name, actualPerson.name);
  });
};

const madeSideBarContent = () => {
  sidebarContainer.innerHTML = '';
  const image = document.createElement('img');
  image.classList.add('sidebarPicture');
  sidebarContainer.appendChild(image);
  const nameWithLogo = document.createElement('div');
  nameWithLogo.classList.add('nameWithLogo');
  const personName = document.createElement('h1');
  const logo = document.createElement('img');
  logo.classList.add('logo');
  nameWithLogo.appendChild(personName);
  nameWithLogo.appendChild(logo);
  sidebarContainer.appendChild(nameWithLogo);
  const text = document.createElement('p');
  sidebarContainer.appendChild(text);

  return [image, personName, logo, text];
};

const modifySidebar = (image, name, logo, text) => {
  const [imageBig, personName, houselogo, details] = madeSideBarContent();

  imageBig.src = image;
  personName.textContent = name;
  houselogo.src = logo;
  details.textContent = text;
};

const loadSideBar = (searchEl) => {
  try {
    const actualPsn = result.find((person) => person.name.toLowerCase() === searchEl.toLowerCase());
    const actualHouse = actualPsn.house ? actualPsn.house : 'nothing';
    const logoOfPerson = `./assets/houses/${actualHouse}.png`;
    const pictureofPsn = actualPsn.picture ? actualPsn.picture : './assets/pictures/placeholder.png';
    modifySidebar(pictureofPsn, actualPsn.name, logoOfPerson, actualPsn.bio);
  } catch (error) {
    madeSideBarContent();
    document.querySelector('.nameWithLogo h1').textContent = 'Character not found';
  }
};

const deleteActive = () => {
  const allItemImg = Array.from(document.querySelectorAll('.row__item img'));
  allItemImg.forEach((item) => {
    item.classList.remove('active');
  });
  const allItemP = Array.from(document.querySelectorAll('.row__item p'));
  allItemP.forEach((item) => {
    item.classList.remove('active');
  });
};

mainContainer.addEventListener('click', (e) => {
  deleteActive();
  const clickedElement = e.target.closest('.row__item');
  Array.from(clickedElement.childNodes).forEach((item) => item.classList.add('active'));
  const personName = clickedElement.querySelector('p').innerHTML;
  sidebarContainer.innerHTML = '';
  madeSideBarContent();
  loadSideBar(personName);
});

let lastTimeout = 0;
input.addEventListener('keyup', () => {
  clearTimeout(lastTimeout);
  lastTimeout = setTimeout(() => {
    clearTimeout(lastTimeout);
    loadSideBar(input.value);
  }, 2000, input.value);
});

input.addEventListener('keyup', (e) => {
  e.preventDefault();
  e.key === 'Enter' ? loadSideBar(input.value) : '';
});

(function () {
  loadData();
  madeSideBarContent();
}());
