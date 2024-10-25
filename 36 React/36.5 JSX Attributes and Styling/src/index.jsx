import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div>
    <h1 spellCheck='false' contentEditable='true'>
      My Favourite Foods
    </h1>
    <div>
      <img className='hobby-img'src='https://oceanprops.com/wp-content/uploads/2018/01/Paddleboarding-1.jpg'></img>
      <img className='hobby-img gray-img'src='https://visitutahkenticoprod.blob.core.windows.net/cmsroot/visitutah/media/site-assets/winter-photography/ski-resorts/snowbird/ski-resorts_snowbird_markewitz_dsc2227.jpg'></img>
      <img className='hobby-img gray-img'src='https://media.sako.global/image/upload/f_auto/q_auto/t_hero_desktop/f_auto/q_auto/c_scale/REI_HOANG_SAKO_TRG_4244_klehu0?_a=AJAUVWIA'></img>
    </div>
  </div>,
  document.getElementById('root')
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
