
// export default {
//   myStocksValue() {
//     let self = this;

//     this.myStocks(this.state.portfolio_id)
//         .then((result) => {
//             // console.log(result);
//             let stocks = result;
//             let lastPrice = [];

//             // console.log(stocks);

//             let current = Promise.resolve();

//             Object.keys(stocks).forEach(function(key) {
//                 current = current.then(() => {
//                     // console.log(key);
//                     return API.userQuotes({
//                         ticker: key,
//                     })
//                         .then((res) => {
//                             // console.log(res.data);
//                             lastPrice.push(res.data[0]);
//                             // console.log(lastPrice);
//                             self.portfolioValue(stocks, lastPrice);
//                         });
//                 });
//             });
//             return current;
//         });
//   }; 
// };
