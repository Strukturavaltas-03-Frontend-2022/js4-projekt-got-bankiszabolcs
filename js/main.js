import { findPerson, sortArr } from './data.js';

const mainContainer = document.querySelector('main');
const sidebarContainer = document.querySelector('.content');

const result = await sortArr().then((data) => data);

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

loadData();

const madeSideBarContent = () => {
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

madeSideBarContent();

const modifySidebar = (image, name, logo, text) => {
  const [imageBig, personName, houselogo, details] = madeSideBarContent();

  imageBig.src = image;
  personName.textContent = name;
  houselogo.src = logo;
  details.textContent = text;

  /* const actualImg = sidebarContainer.querySelector('.sidebarPicture');
  const actualName = sidebarContainer.querySelector('h1')
  const actualLogo = sidebarContainer.querySelector('.logo')
  const actualText = sidebarContainer.querySelector() */
};

const loadSideBar = async (person) => {
  const actualPerson = await findPerson(person);
  console.log(actualPerson);
  const logoOfPerson = `./assets/houses/${actualPerson.house ? actualPerson.house : 'nothing'}.png`;
  modifySidebar(actualPerson.picture, actualPerson.name, logoOfPerson, actualPerson.bio);
};


loadSideBar('viserys targaryen');
