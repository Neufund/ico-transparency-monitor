import React from 'react';
import PropTypes from 'prop-types';
import TopHeader from '../components/TopHeader';

const Layout = ({ children }) => (<div>
    <TopHeader />
    <div>
        {children}
    </div>

</div>);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;