// Add params, arguments and more
const textDecor = {
  color: {
    Black: "\u001b[30m",
    Red: "\u001b[31m",
    Green: "\u001b[32m",
    Yellow: "\u001b[33m",
    Blue: "\u001b[34m",
    Magenta: "\u001b[35m",
    Cyan: "\u001b[36m",
    White: "\u001b[37m",
  },
  style: {
    Bold: "\u001b[1m",
    Underline: "\u001b[4m",
    Reversed: "\u001b[7m",
  },
  reset: "\u001b[0m",
};

// Declare function need to use in global

/**
 *
 * @param {*} color color: ['Black','Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan', 'White']
 * @param {*} style style: [ 'Bold', 'Underline', 'Reversed' ]
 * @param {*} text  enter your text here
 */
const colorHandler = (color, style, text) => {
  let findColor, findStyle;
  if (!!color) {
    findColor =
      textDecor.color[Object.keys(textDecor.color).find((e) => e === color)];
  } else {
    findColor = "";
  }
  if (!!style) {
    findStyle =
      textDecor.style[Object.keys(textDecor.style).find((e) => e === style)];
  } else {
    findStyle = "";
  }
  return findColor + findStyle + text + textDecor.reset;
};

// Declare new global variable
global.colorHandler = colorHandler;
