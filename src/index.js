import './style.css';
import Image0 from './images/clara-metivier-beukes.jpg';
import Image1 from './images/miguel-angel-hernandez.jpg';
import Image2 from './images/mor-shani.jpg';
import Image3 from './images/ryan-moreno.jpg';

const imageSlider = {
  images: document.querySelector('.images'),
  imageDivs: document.querySelectorAll('.image'),
  importedImages: [Image0, Image1, Image2, Image3],
  navCircles: document.querySelectorAll('.nav-circle'),

  init() {
    this.storeControls();
    this.setImageUrls();
    this.setEvents();
    this.images.style.left = 0;
  },

  setImageUrls() {
    for (let i = 0; i < this.imageDivs.length; i++) {
      this.imageDivs[i].style.backgroundImage = `url(${this.importedImages[i]})`;
    }
  },

  storeControls() {
    this.leftArrow = document.querySelector('.back-arrow');
    this.rightArrow = document.querySelector('.forward-arrow');
  },

  getPosition() {
    return parseInt(this.images.style.left.split('p')[0]);
  },

  toggleActiveCircle() {
    document.getElementsByClassName('active')[0].classList.toggle('active');
  },

  scrollLeft() {
    if (this.getPosition() === 0) {
      this.images.style.left = `-1800px `;
      this.toggleActiveCircle();
      this.navCircles[3].classList.toggle('active');
    } else {
      this.images.style.left = `${this.getPosition() + 600}px `;
      const activeCircle = document.getElementsByClassName('active')[0];
      this.toggleActiveCircle();
      activeCircle.previousElementSibling.classList.toggle('active');
    }
  },
  scrollRight() {
    if (this.getPosition() === -1800) {
      this.images.style.left = `0px `;
      this.toggleActiveCircle();
      this.navCircles[0].classList.toggle('active');
    } else {
      this.images.style.left = `${this.getPosition() - 600}px `;
      const activeCircle = document.getElementsByClassName('active')[0];
      this.toggleActiveCircle();
      activeCircle.nextElementSibling.classList.toggle('active');
    }
  },

  jumpToImage(e) {
    this.toggleActiveCircle();
    const navCircle = e.target;
    navCircle.classList.toggle('active');
    this.images.style.left = `${navCircle.dataset.position}px`;
  },

  setEvents() {
    this.leftArrow.addEventListener('click', this.scrollLeft.bind(this));
    this.rightArrow.addEventListener('click', this.scrollRight.bind(this));
    this.navCircles.forEach((navCircle) => {
      navCircle.addEventListener('click', this.jumpToImage.bind(this));
    });
  },
};

imageSlider.init();
