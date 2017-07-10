import React from 'react';
import TopHeader from '../components/TopHeader';

const Layout = ({ children }) => (<div>
    <TopHeader />
    <div>
        {children}
    </div>

</div>);


export default Layout;