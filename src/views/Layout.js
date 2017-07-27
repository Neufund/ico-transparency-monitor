import React from 'react';
import TopHeader from '../components/TopHeader';
import Footer from '../components/Footer';

const Layout = ({ ...props }) => (<div>
  <TopHeader />
  <div>
    {props.children}
  </div>
  <Footer />
</div>);

export default Layout;
