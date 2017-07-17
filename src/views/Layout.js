import React from 'react';
import { connect } from 'react-redux';
import TopHeader from '../components/TopHeader';
import { web3Connection } from '../utils/web3';

const Web3Provider = () => (
  <div>
    <h1>Web3 Connection error</h1>
  </div>
    );

const Layout = ({ ...props }) => (<div>
  <TopHeader />
  <div>
    {props.children}
  </div>
</div>);

export default Layout;
