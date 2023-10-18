/* eslint-disable no-param-reassign */
const animationManager = {
  animateTextModel(className) {
    const delay = 30;
    let delayStart = 0;
    let contents;
    let letters;

    document.querySelectorAll(className).forEach(function animate(elem) {
      contents = elem.textContent.trim();
      elem.textContent = '';
      letters = contents.split('');
      elem.style.visibility = 'visible';

      letters.forEach(function showContent(letter, index1) {
        setTimeout(
          function showLetter() {
            elem.textContent += letter;
          },
          delayStart + delay * index1
        );
      });
      delayStart += delay * letters.length;
    });
  },
  animateText() {
    this.animateTextModel('.animate-text');
  },
};

export default animationManager;
