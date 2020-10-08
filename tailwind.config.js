module.exports = {
  purge: ['src/**/*.js', 'public/**/*.html'],
  theme: {
    extend: {
      boxShadow: {
        card: '0 -2px 0 1px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        'disease-black': '#cccccc',
        'disease-blue': 'deepskyblue',
        'disease-red': 'tomato',
        'disease-yellow': 'yellow',
        event: 'gold',
        'contingency-planner': 'darkturquoise',
        dispatcher: 'hotpink',
        medic: 'orange',
        'operations-expert': 'lightgreen',
        'quarantine-specialist': 'green',
        researcher: 'chocolate',
        scientist: 'white',
      },
    },
  },
  variants: {
    padding: ['responsive', 'last'],
  },
  plugins: [],
};
