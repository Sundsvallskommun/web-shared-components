module.exports = Calendar = () => ({
  // Month row
  '.MuiCalendarPicker-root > div:first-of-type': {
    '@apply ml-2 -mr-2 px-10': {},
  },

  // Month
  '.MuiCalendarPicker-root > div:first-of-type > div': {
    '@apply font-bold text-base text-body': {},
  },

  // Arrow switchers
  '.MuiCalendarPicker-root > div:first-of-type .MuiButtonBase-root .MuiSvgIcon-root': {
    '@apply text-body text-lg': {},
  },
  '.MuiCalendarPicker-root > div:first-of-type .MuiButtonBase-root': {
    '@apply border-solid border border-transparent focus:text-transparent hover:text-transparent focus:bg-transparent hover:bg-transparent focus:border-primary hover:border-primary':
      {},
  },
  '.MuiCalendarPicker-root > div:first-of-type .MuiButtonBase-root': {
    '@apply border-solid border border-transparent focus:text-transparent hover:text-transparent focus:bg-transparent hover:bg-transparent focus:border-primary hover:border-primary':
      {},
  },
  // Arrow spacer
  '.MuiCalendarPicker-root .MuiPickersArrowSwitcher-spacer': {
    '@apply w-11': {},
  },
  // Disabled arrow
  '.MuiCalendarPicker-root > div:first-of-type .MuiButtonBase-root[disabled] .MuiSvgIcon-root': {
    '@apply text-gray-stroke': {},
  },

  // Weekdays
  '.MuiCalendarPicker-root div > div:first-of-type > .MuiTypography-root': {
    '@apply font-bold text-body text-base': {},
  },

  // Days-Grid
  '.MuiCalendarPicker-root > div:last-of-type > div:last-of-type': {
    '@apply min-h-min pb-6': {},
  },

  // Day picking
  '.MuiCalendarPicker-root .MuiPickersDay-root': {
    '@apply text-base': {},
  },
  '.MuiCalendarPicker-root .Mui-disabled': {
    '@apply text-gray-stroke': {},
  },

  // Day picked
  '.MuiCalendarPicker-root .MuiButtonBase-root.MuiPickersDay-root.Mui-selected': {
    '@apply bg-background-one text-body focus-visible:bg-background-one hover:bg-background-one focus:bg-background-one':
      {},
  },

  // Day hovered
  '.MuiCalendarPicker-root .MuiPickersDay-root, .MuiCalendarPicker-root .MuiPickersDay-root.MuiPickersDay-today': {
    '@apply border-primary border-solid focus-visible:border hover:bg-transparent focus:bg-transparent hover:border':
      {},
  },

  // today
  '.MuiCalendarPicker-root .MuiPickersDay-root.MuiPickersDay-today': {
    '@apply border-0 hover:border': {},
  },

  '.calendar': {
    // Input field
    '.datepicker-input': {
      '@apply relative': {},
    },

    '.datepicker-input input': {
      '@apply pl-20 cursor-pointer': {},
    },

    '.datepicker-input-icon': {
      '@apply pointer-events-none absolute my-auto top-0 bottom-0 left-md mr-md text-xl fill-body': {},
    },
  },
});
