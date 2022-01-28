const migrations = {
    0: (state) => {
      return {
        ...state,
        settings: {
          ...state.settings,
          moodColorCategory: {
            colorPalette: 'DEFAULT',
          }
        }
      }
    },
};
  
export default migrations;