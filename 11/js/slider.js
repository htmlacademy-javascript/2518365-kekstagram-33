const sliderElement = document.querySelector('.effect-level__slider');
const imageElement = document.querySelector('.img-upload__preview img');
const effectInputElement = document.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
});

let effectNameElement = '';

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  effectInputElement.value = parseFloat(value);
  if (effectNameElement === 'none') {
    imageElement.style.removeProperty('filter');
  } else {
    imageElement.style.filter = `${effectNameElement}(${value})`;
  }
});

const onEffectsListClick = (evt) => {
  if (evt.target.closest('input')) {
    switch (evt.target.value) {
      case 'chrome':
      case 'sepia':
        effectNameElement = evt.target.value === 'chrome' ? 'grayscale' : 'sepia';
        sliderElement.noUiSlider.updateOptions ({
          range: {
            min: 0,
            max: 1
          },
          start: 1,
          step: 0.1,
          format: {
            to: function (value) {
              return value;
            },
            from: function (value) {
              return value;
            },
          }
        });
        sliderElement.parentNode.classList.remove('hidden');
        break;
      case 'marvin':
        effectNameElement = 'invert';
        sliderElement.noUiSlider.updateOptions ({
          range: {
            min: 0,
            max: 100
          },
          start: 100,
          step: 1,
          format: {
            to: function (value) {
              return `${value}%`;
            },
            from: function (value) {
              return value;
            },
          }
        });
        sliderElement.parentNode.classList.remove('hidden');
        break;
      case 'phobos':
        effectNameElement = 'blur';
        sliderElement.noUiSlider.updateOptions ({
          range: {
            min: 0,
            max: 3
          },
          start: 3,
          step: 0.1,
          format: {
            to: function (value) {
              return `${value}px`;
            },
            from: function (value) {
              return value;
            },
          }
        });
        sliderElement.parentNode.classList.remove('hidden');
        break;
      case 'heat':
        effectNameElement = 'brightness';
        sliderElement.noUiSlider.updateOptions ({
          range: {
            min: 1,
            max: 3
          },
          start: 3,
          step: 0.1,
          format: {
            to: function (value) {
              return value;
            },
            from: function (value) {
              return value;
            },
          }
        });
        sliderElement.parentNode.classList.remove('hidden');
        break;
      case 'none':
        effectNameElement = 'none';
        sliderElement.noUiSlider.set(0);
        sliderElement.parentNode.classList.add('hidden');
    }
  }
};

export { onEffectsListClick };
