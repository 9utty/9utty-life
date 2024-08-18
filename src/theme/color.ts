// ** Type Imports
import { Palette } from '@mui/material'
import { PaletteAugmentColorOptions, PaletteColorOptions } from '@mui/material/styles/createPalette'

const DefaultPalette = (mode: Palette['mode']): Palette => {
  // ** Vars
  const whiteColor = '#FFF'
  const lightColor = '47, 43, 61'
  const darkColor = '208, 212, 241'
  const darkPaperBgColor = '#2F3349'
  const mainColor = mode === 'light' ? lightColor : darkColor

  const defaultBgColor = () => {
    if (mode === 'light') {
      return whiteColor
    } else if (mode === 'dark') {
      return darkPaperBgColor
    } else return '#25293C'
  }

  return {
    mode: mode,
    common: {
      black: '#000',
      white: whiteColor
    },
    primary: {
      light: '#c6c6c6',
      main: '#c6c6c6',
      dark: '#c6c6c6',
      contrastText: whiteColor
    },
    secondary: {
      light: '#B2B4B8',
      main: '#A8AAAE',
      dark: '#949699',
      contrastText: whiteColor
    },
    error: {
      light: '#ED6F70',
      main: '#EA5455',
      dark: '#CE4A4B',
      contrastText: whiteColor
    },
    warning: {
      light: '#FFAB5A',
      main: '#FF9F43',
      dark: '#E08C3B',
      contrastText: whiteColor
    },
    info: {
      light: '#1FD5EB',
      main: '#00CFE8',
      dark: '#00B6CC',
      contrastText: whiteColor
    },
    success: {
      light: '#42CE80',
      main: '#28C76F',
      dark: '#23AF62',
      contrastText: whiteColor
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#F5F5F5',
      A200: '#EEEEEE',
      A400: '#BDBDBD',
      A700: '#616161'
    },
    text: {
      primary: `rgba(${mainColor}, 0.78)`,
      secondary: `rgba(${mainColor}, 0.68)`,
      disabled: `rgba(${mainColor}, 0.42)`
    },
    divider: `rgba(${mainColor}, 0.16)`,
    background: {
      paper: '#c6c6c6',
      default: defaultBgColor()
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      hoverOpacity: 0.04,
      selected: `rgba(${mainColor}, 0.06)`,
      selectedOpacity: 0.06,
      disabledOpacity: 0.26,
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
      disabled: `rgba(${mainColor}, 0.26)`,
      disabledBackground: `rgba(${mainColor}, 0.12)`,
      focus: `rgba(${mainColor}, 0.12)`
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    getContrastText: (background: string) => {
      return background === whiteColor ? '#000' : whiteColor
    },
    augmentColor: (options: PaletteAugmentColorOptions) => {
      const { color, mainShade = 500, lightShade = 300, darkShade = 700 } = options

      return {
        light: color[lightShade as keyof PaletteColorOptions],
        main: color[mainShade as keyof PaletteColorOptions],
        dark: color[darkShade as keyof PaletteColorOptions],
        contrastText: '#fff' // or any other logic to determine contrast text
      }
    }
  }
}

export default DefaultPalette
