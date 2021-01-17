module.exports = {
  theme: {
    fontFamily:{
      'display': 'Quasimoda Regular',
      'sans': ['Quasimoda Regular'],
      'serif': ['Quasimoda Regular'],
      'mono': ['Quasimoda Regular'],
      
    },
    extend: {
      colors: {
        'act-pink': '#EF8181',
        'act-blue': '#7DCAF4',
        'act-grey': '#F7F7F7'
      }
    }
  },
  variants: {
    outline: ['responsive', 'focus', 'hover', 'active'],
    backgroundColor: ['responsive', 'even', 'odd', 'hover', 'focus']
  },
  plugins: []
}
