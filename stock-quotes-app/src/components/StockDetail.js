//display details when a stock is selected in the stocks grid
import React from 'react';
import PropTypes from 'prop-types';
import StockDetailRow from "./StockDetailRow";
import { connect  } from "react-redux";
import { getStockDetailFromAPI } from '../actions/stockDetailActions';

export class StockDetail extends React.Component {

  componentWillMount() {
    this.props.getStockDetailFromAPI(this.props.rowData[0]);
  }
  render(){
  const stockDetail = this.props.stockDetail;
  const styleTable = {
    margin: "10px 20px",
  }
  return (
    stockDetail && <table style={styleTable}>
      <StockDetailRow stockDetail={stockDetail} colSpan={this.props.colSpan}/>
    </table>
  )
  }
};

const mapStateToProps = state => ({
  stockDetail: state.stockDetail
});

StockDetail.propTypes = {
  stockDetail: PropTypes.shape({
    symbol: PropTypes.string,
  })
}
StockDetail.defaultProps = {
  stockDetail: null
}
export default connect(
  mapStateToProps,
  { getStockDetailFromAPI }
)(StockDetail);
