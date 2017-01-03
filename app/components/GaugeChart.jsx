// import React from 'react';
// import { BrowserRouter } from 'react-router';
// import ReactDOM from 'react-dom';
// import axios from 'axios';
//
// import Main from './Main';
// import { Button, Col, Modal, Grid, Image, Popover, Tooltip, OverlayTrigger, Well, PageHeader, Jumbotron, Navbar } from 'react-bootstrap';
//
// import C3Chart from 'react-c3js';
//
// const GaugeChart = React.createClass({
//   propTypes: {
//     limit: React.PropTypes.number,
//     balance: React.PropTypes.number
//   },
//   getInitialState: function() {
//     return({ id: '' });
//   },
//   getUUID: function() {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//         var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
//         return v.toString(16);
//     });
//   },
//
//   renderChart: function() {
//     var id = this.state.id;
//     var width = 40;
//     var self = this;
//     (function() {
//         self.chart = c3.generate({
//         bindto: '#'+self.state.id,
//         data: {
//           columns: [
//             ['Balance', parseFloat(self.props.balance)]
//           ],
//           type: 'gauge',
//
//         },
//         color: {
//           pattern: ['#1ca2b8', '#1ca2b8', '#1ca2b8', '#1ca2b8'],
//           threshold: {
//             values: [30, 60, 90, 100]
//           }
//         },
//         gauge: {
//           max: this.props.limit,
//           label: {
//             format: function (value, ratio) {
//               return '$' + value;
//             }
//           },
//           width: width
//         },
//         tooltip: {
//             show: false
//         },
//         padding: {
//           bottom: 20
//         }
//       });
//     })();
//     this.update();
//   },
//
//   update: function() {
//     if (this.chart) {
//       this.chart.internal.config.gauge_max = this.props.limit;
//       this.chart.load({
//           columns: [['Balance', this.props.balance]]
//       });
//     }
//   },
//
//   componentDidMount: function() {
//     // hacky way (?) to ensure this always gets it's own id that lasts through the component
//     this.setState({ id: 'gauge-chart-' + this.getUUID() }, this.renderChart);
//     $(this.getDOMNode()).on( 'resize', this.update );
//   },
//
//   componentDidUpdate: function(prevProps, prevState) {
//     this.update();
//   },
//
//   componentDidDismount: function() {
//     $(this.getDOMNode()).off('resize', this.update);
//   },
//
//   render: function() {
//     const container = <div id={this.state.id} />
//
//     return container;
//   }
// });
//
// module.exports = GaugeChart;
