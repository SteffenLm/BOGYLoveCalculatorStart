module.exports = {
  theme: {
    extend: {
      colors: {
        'act-pink': '#EF8181',
        'act-blue': '#7DCAF4',
        'act-grey': '#F7F7F7'
      },
      backgroundImage: theme => ({
        'color-mix': "url('/colormix.svg')"
      })
    }
  },
  variants: {
    outline: ['responsive', 'focus', 'hover', 'active'],
    backgroundColor: ['responsive', 'even', 'odd', 'hover', 'focus']
  },
  plugins: []
}
