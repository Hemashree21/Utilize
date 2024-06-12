import React from 'react';
import IconPicker from './Icon';

const App = () => {
  return (
    <div className="App" style={{marginLeft: '5rem'}}>
      <h1>Icon Picker</h1>
      <IconPicker 
        rowsInOnePage={4} 
        columnsInOnePage={4} 
        iconHeight={50} 
        iconWidth={50} 
      />
    </div>
  );
};

export default App;
