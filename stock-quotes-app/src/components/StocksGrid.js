//Add Stocks Grid to display
import React from 'react';
import styled from 'styled-components/macro';
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import StockDetail from "./StockDetail";

const columns = [
    {
        name: "symbol",
        label: "Symbol",
        options: {
         filter: false,
         sort: true,
        }
       },
       {
        name: "price",
        label: "Price",
        options: {
         filter: true,
         sort: true,
        }
       },
       {
        name: "last_trade_time",
        label: "Last updated",
        options: {
         filter: true,
         sort: true,
        }
       },
];
const options = {
    responsive: 'scroll',
    expandableRows: true,
    expandableRowsOnClick: true,
    renderExpandableRow: (rowData, rowMeta) => {
      const colSpan = rowData.length + 1;
      return (
        <StockDetail rowData={rowData} colSpan={colSpan} />
      );
    },
};

let theme = createMuiTheme({
    typography: { useNextVariants: true },
    palette: {
        type: 'dark',
        primary: purple,
        secondary: green,
      },
      status: {
        danger: 'orange',
      },
  });
  theme = responsiveFontSizes(theme);

class StocksGrid extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.stockQuotesData === nextProps.stockQuotesData) {
      return false;
    } else {
      return true;
    }
  }
  render(){
    const wrapperStyle = {
     margin: "20px"
    }
    const stockQuotesData = this.props.stockQuotesData;
    return (
     <div style={wrapperStyle}>
      <MuiThemeProvider theme={theme}>
                  <MUIDataTable
                          title={"Real-time stocks data"}
                          data={this.props.stockQuotesData}
                          columns={columns}
                          options={options}
                  />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default StocksGrid;