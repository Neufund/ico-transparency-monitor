import React, {Component} from 'react';
import '../assets/css/App.css';
import ICO from '../components/ICO';
import ScanBoxLoadingMessage from '../components/ScanBoxLoadingMessage';
import ScanBoxDetails from '../components/ScanBoxDetails';
import {default as config} from '../config.js';
import {getICOLogs, getStatistics, initStatistics} from '../utils.js';
import {drawStatistics, hideLoader, showLoader} from '../actions/ScanAction';
import {setCurrency} from '../actions/CurrencyAction'
import {connect} from 'react-redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {getSmartContractConstants} from '../utils/web3';

class Scan extends Component {
    constructor(props) {
        super(props);
        this.address = this.props.match.params.name;

        this.ico = config['ICOs'][this.address];
        this.ico['address'] = this.address;
        if (typeof this.ico === "undefined")
            alert("404") // TODO: Redirect to 404 page
    }

    componentWillMount() {
        this.props.showLoader();
    }

    componentDidMount() {
        try {
            getICOLogs(this.address, (err, res) => {
                if (err !== "SHOW_MODAL_MESSAGE") {
                    this.props.dispatchErrorMessage(err, res)
                } else if (err !== null)
                    this.props.dispatchErrorMessage(err, res)

                this.props.setCurrency('EUR', 'NOW', async () => {
                    this.props.hideLoader();
                    if (res.length === 0 || err !== null) {
                        return false;
                    }
                    const smartContractConstants = await getSmartContractConstants(this.address);
                    this.ico['decimals'] = smartContractConstants['decimals'];
                    const s = getStatistics(this.ico, res, initStatistics(), this.props.currencyValue);
                    this.props.drawStatistics(s);
                });

            });

        } catch (error) {
            this.props.dispatchErrorMessage('SHOW_MODAL_ERROR',
                `Cant read smart Contract for ${this.address} from RPC Host url ${config.rpcHost}.`);
        }

    }

    render() {
        return (
            <div className="App">
                <Grid fluid>
                    <Row className="nav-buttons">
                        <Col md={6}>
                            <div className="back-list">

                                <a href="/"><i className="fa fa-arrow-left"/> Go back to the list </a>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="next-list">
                                <a href="/">Go back to the list <i className="fa fa-arrow-right"/></a>

                            </div>
                        </Col>
                    </Row>
                </Grid>

                <Grid className="scanbox ico-box-scan">
                    <ICO ico={this.ico} inner={true} address={this.address}/>
                    <ScanBoxLoadingMessage show={this.props.showLoaderState}/>
                    <ScanBoxDetails address={this.address}/>
                </Grid>
            </div>
        );
    } //end render
}


const mapStateToProps = (state) => {
    return {
        showLoaderState: state.scan.showLoader,
        currencyValue: state.currency.value,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        drawStatistics: (statistics) => {
            dispatch(drawStatistics(statistics));
        },
        // Pass the dispatch function to the action.
        setCurrency: ( (currency, time, callback) => setCurrency(currency, time, callback)(dispatch) ),
        showLoader: () => {
            dispatch(showLoader())
        },
        hideLoader: () => {
            dispatch(hideLoader())
        },
        dispatchErrorMessage: (type, message) => {
            dispatch({
                type: type,
                message: message
            })
        },
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Scan)
