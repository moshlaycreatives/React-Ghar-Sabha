import React from 'react';
 import menuData from './menuData.json'
import * as MuiIcons from '@mui/icons-material';

const Icon = () => {
  return (
    <div>
      {menuData.map(item => {
        const Icon = MuiIcons[item.icon];
        return (
          <div key={item.id}>
            {Icon ? <Icon  /> : null}
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Icon;