import React, { useState, useEffect } from 'react';
import './App.css';
import { loadIcons } from './data';

const Icon = ({ 
  rowsInOnePage, 
  columnsInOnePage, 
  iconHeight, 
  iconWidth, 
  pickerHeight = '500px', 
  pickerWidth = '500px'
}) => {
  const [icons, setIcons] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const iconsLoaded = loadIcons();
    setIcons(iconsLoaded);
  }, []);

  const iconsPerPage = rowsInOnePage * columnsInOnePage;

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    setShowPicker(false);
  };

  if (!icons || icons.length === 0) {
    return <div>Loading icons...</div>;
  }

  const totalPages = Math.ceil(icons.length / iconsPerPage);

  return (
    <div>
      <div 
        className="icon-display" 
        onClick={() => setShowPicker(true)}
        style={{
          width: '100px',
          height: '100px',
          boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.5)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,128,128,1) 0%, rgba(0,102,102,1) 50%, rgba(0,77,77,1) 100%)',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {selectedIcon && <img src={selectedIcon} alt="Selected Icon" />}
      </div>

      {showPicker && (
        <div>
        <div 
          className="icon-picker" 
          style={{
            width: pickerWidth,
            height: pickerHeight,
            boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.25)',
            borderRadius: '25px',
            position: 'absolute',
            background: '#fff',
            overflow: 'hidden',
          }}
        >
          <div 
            className="icon-grid" 
            style={{
              display: 'grid',
              gridTemplateRows: `repeat(${rowsInOnePage}, ${iconHeight}px)`,
              gridTemplateColumns: `repeat(${columnsInOnePage}, ${iconWidth}px)`,
              gap: '50px',
              padding: '10px',
              boxSizing: 'border-box'
            }}
          >
            {icons.slice(currentPage * iconsPerPage, (currentPage + 1) * iconsPerPage).map((icon, index) => (
              <img 
                key={index} 
                src={icon} 
                alt={`icon-${index}`} 
                style={{ width: iconWidth, height: iconHeight, cursor: 'pointer' }} 
                onClick={() => handleIconClick(icon)}
              />
            ))}
          </div>
          <div className="pagination-controls" style={{ textAlign: 'center', padding: '10px' }}>
            {currentPage > 0 && (
              <button onClick={() => setCurrentPage(currentPage - 1)} className='pagination-button'>Previous</button>
            )}
            {currentPage < totalPages - 1 && (
              <button onClick={() => setCurrentPage(currentPage + 1)} className='pagination-button'>Next</button>
            )}
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Icon;
