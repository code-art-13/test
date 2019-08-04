import React from 'react';
import StocksGrid from './components/StocksGrid';
import { connect } from 'react-redux';
import { getStockQuotesFromAPI, getStockQuotesFromSocket } from './actions/stockQuotesActions';
// import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { textAlign } from '@material-ui/system';

class App extends React.Component {
  componentDidMount(){
    this.props.getStockQuotesFromSocket();
  }
  render() {
    const { stockQuotes, apiResponseCounter} = this.props;
    const styleCounterDiv = {
      margin: ' 50px auto',
      fontSize: '24px',
      textAlign: 'center',
    }
    const styleCounter = {
      color: 'red', 
    }
    return (
      this.props.apiResponseCounter > 0 ?
        <React.Fragment>
          <div style={styleCounterDiv}>
              <div>Please wait 30 secs for the data to refresh  </div>
              <div>
              <span>Click on the row to see details.</span>
                {/* <span>External API calls count: </span>
                <span style={styleCounter}>{apiResponseCounter}</span> */}
              </div>
            </div>
            <StocksGrid stockQuotesData={stockQuotes}/>
        </React.Fragment> : 

        <div style={styleCounterDiv}>
          <div> Please wait 30 secs for the data to load </div>
          <CircularProgress style={styleCounterDiv} disableShrink></CircularProgress> 
        </div>
     );
  }
}
const mapStateToProps = (state, props) => {
  return {
  stockQuotes: state.stockQuotes,
  stockDetail: state.stockDetail,
  apiResponseCounter: state.apiResponseCounter,
}};

export default connect(mapStateToProps,{
  getStockQuotesFromAPI,
  getStockQuotesFromSocket
})(App);