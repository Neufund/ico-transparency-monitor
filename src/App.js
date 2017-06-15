import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Grid, Row, Col} from 'react-flexbox-grid';
import ICO from './components/ICO';
import TopHeader from './components/TopHeader';
import Header from './components/Header';
import {default as config} from './config.js';
import {formateDate} from './utils';
class App extends Component {

    getICOs() {
        let icos = [];
        const icosObject = config['ICOS'];
        Object.keys(icosObject).map((icoKey) => {
                const ico = icosObject[icoKey]['summary'];
                ico['name'] = icoKey;
                icos.push(ico);
            }
        );
        return icos;
    }

    formateDate(datetime) {
        return `${datetime.getDate()}/${datetime.getMonth() + 1}/${datetime.getFullYear()}`;
    }

    render() {

        return (
            <div className="App">
                <TopHeader logo={logo}/>
                <Header />

                <Grid fluid>
                    {this.getICOs().map((ico) => {
                        return <ICO key={Math.random()} logo={ico.logo} name={ico.name}
                                    shortDescription={ico.description} ethers={ico.totalEthers}
                                    tokens={ico.issuedTokens}
                                    startDate={formateDate(ico.startDate)} endDate={formateDate(ico.endDate)}
                                    transparency={ico.transparency}
                        />
                    })}
                </Grid>

            </div>
        );
    }
}

export default App;
