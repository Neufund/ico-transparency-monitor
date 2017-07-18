import React from 'react';
import TopHeader from '../components/TopHeader';

const Layout = ({ ...props }) => (<div>
  <TopHeader />
  <div>
    {props.children}
  </div>
</div>);

export default Layout;
