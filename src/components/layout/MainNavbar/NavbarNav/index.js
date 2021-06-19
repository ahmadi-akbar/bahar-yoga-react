import React, { Suspense } from 'react';
import { Nav } from 'shards-react';

import UserActions from './UserActions';
// import Logo from '@/images/logo-256x512.png';
export default () => {
  console.log('window.globalTS.theme_options.akbar_header_logo_image',window.globalTS.theme_options.akbar_header_logo_image);

  return (
    <Nav navbar className="flex-row">
      <div className="d-table m-auto oiuytrt akbar-logo-parent2">
        {/*{window.globalTS.theme_options.akbar_header_logo_image == "" && window.globalTS.blog_title && <span>{window.globalTS.blog_title}</span>}*/}
        {window.globalTS.theme_options.akbar_header_logo_image != "" &&
        <img style={{ maxWidth: 116 }} src={window.globalTS.theme_options.akbar_header_logo_image}
             alt={window.globalTS.blog_title}/>
        }
      </div>
      <Suspense fallback={null}>
        <UserActions/>
      </Suspense>
    </Nav>
  );
};
