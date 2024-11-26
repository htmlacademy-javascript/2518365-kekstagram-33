const sliderElement = document.querySelector('.effect-level__slider');
const imageElement = document.querySelector('.img-upload__preview img');
const effectInputElement = document.querySelector('.effect-level__value');

const Effects = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
  DEFAULT: 'none',
};

const nameEffectForFilter = {
  [Effects.CHROME]: {
    style: 'grayscale',
    unit: '',
  },
  [Effects.SEPIA]: {
    style: 'sepia',
    unit: '',
  },
  [Effects.MARVIN]: {
    style: 'invert',
    unit: '%',
  },
  [Effects.PHOBOS]: {
    style: 'blur',
    unit: 'px',
  },
  [Effects.HEAT]: {
    style: 'brightness',
    unit: '',
  },
  [Effects.DEFAULT]: {
    style: 'none',
    unit: '',
  },
};

const sliderOptions = {
  [Effects.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effects.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effects.MARVIN]: {
    min: 0,
    max: 100,
    step: 1
  },
  [Effects.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1
  },
  [Effects.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1
  },
  [Effects.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1
  },
};

let effectName = Effects.DEFAULT;

noUiSlider.create(sliderElement, {
  range: {
    min: sliderOptions[effectName].min,
    max: sliderOptions[effectName].max
  },
  start: sliderOptions[effectName].max,
  step: sliderOptions[effectName].step,
  connect: 'lower',
  format: {
    to: (value) => Number(value),
    from: (value) => Number(value)
  }
});

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  const {style, unit} = nameEffectForFilter[effectName];
  effectInputElement.value = value;
  imageElement.style.filter = `${style}(${value}${unit})`;
});

const getUpdateOptions = ({min, max, step}) => ({
  range: {
    min,
    max
  },
  start: max,
  step,
});

const onEffectsListClick = (evt) => {
  if (evt.target.closest('input')) {
    effectName = evt.target.value;
    sliderElement.noUiSlider.updateOptions(getUpdateOptions(sliderOptions[effectName]));
    if (effectName === Effects.DEFAULT) {
      sliderElement.parentNode.classList.add('hidden');
      imageElement.style.removeProperty('filter');
      return;
    }
    sliderElement.parentNode.classList.remove('hidden');
  }
};

export { onEffectsListClick };
