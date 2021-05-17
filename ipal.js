(() => {
  var COLORS = {
    white: 'hsl(0, 0%, 100%)',
    black: 'hsl(0, 0%, 4%)',
    light: 'hsl(0, 0%, 96%)',
    dark: 'hsl(0, 0%, 21%)',
    primary: 'hsl(171, 100%, 41%)',
    link: 'hsl(217, 71%, 53%)',
    info: 'hsl(204, 86%, 53%)',
    success: 'hsl(141, 71%, 48%)',
    warning: 'hsl(48, 100%, 67%)',
    danger: 'hsl(348, 100%, 61%)',

    blackBis: 'hsl(0, 0%, 7%)',
    blackTer: 'hsl(0, 0%, 14%)',
    greyDarker: 'hsl(0, 0%, 21%)',
    greyDark: 'hsl(0, 0%, 29%)',
    grey: 'hsl(0, 0%, 48%)',
    greyLight: 'hsl(0, 0%, 71%)',
    greyLighter: 'hsl(0, 0%, 86%)',
    whiteTer: 'hsl(0, 0%, 96%)',
    whiteBis: 'hsl(0, 0%, 98%)',
    orange: 'hsl(14, 100%, 53%)',
    yellow: 'hsl(48, 100%, 67%)',
    green: 'hsl(141, 71%, 48%)',
    turquoise: 'hsl(171, 100%, 41%)',
    cyan: 'hsl(204, 86%, 53%)',
    blue: 'hsl(217, 71%, 53%)',
    purple: 'hsl(271, 100%, 71%)',
    red: 'hsl(348, 100%, 61%)',

    jeans: '#5D9CEC',
    Jeans: '#4A89DC',

    aqua: '#4FC1E9',
    Aqua: '#3BAFDA',

    mint: '#48CFAD',
    Mint: '#37BC9B',

    grass: '#A0D468',
    Grass: '#8CC152',

    sun: '#FFCE54',
    Sun: '#F6BB42',

    amber: '#FC6E51',
    Amber: '#E9573F',

    grape: '#ED5565',
    Grape: '#DA4453',

    lavender: '#AC92EC',
    Lavender: '#967ADC',

    rose: '#EC87C0',
    Rose: '#D770AD',

    lightGrey: '#F5F7FA',
    LightGrey: '#E6E9ED',

    mediumGrey: '#CCD1D9',
    MediumGrey: '#AAB2BD',

    darkGrey: '#656D78',
    DarkGrey: '#434A54',
  };

  try {
    module.exports = COLORS;
  } catch (err) {
    try {
      window.ipal = COLORS;
    } catch (err) {
      try {
        global.ipal = COLOSR;
      } catch (err) {}
    }
  }
})();
