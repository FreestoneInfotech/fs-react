import React, {Component}from 'react';
import ReactDOM from 'react-dom';
import BaseContainer from '../base_container';
import NVD3Chart from 'react-nvd3';
import Odometer from 'odometer';
import Faker from 'faker';
import {system_enums} from '../../data/demo/demo_data';
import { Sparklines, SparklinesLine, SparklinesBars } from 'react-sparklines';

import {multiBarChart, stackedData, pieChartData, lastThirtyDaysData} from './../data/stack_data';

let faker = Faker;
console.log(stackedData);

class OdometerComponent extends Component{
  componentDidMount(){
     this.odometer = new Odometer({
      el: ReactDOM.findDOMNode(this),
      value: this.props.value,
      format: ''
    });
    var self = this;
    setTimeout(function(){
        self.odometer.update(self.props.value + faker.random.number({min:500, max:1500}));
    },faker.random.number({min:500, max:1500}))
  }
  componentDidUpdate() {
   this.odometer.update(this.props.value)
  }
  render() {
    return React.DOM.div()
  }
}

export default class DashboardContainer extends Component {
  render() {

    return (
        <BaseContainer routes={this.props.routes}>
            <div className="row row-margin-bottom tile_count">
                <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                    <span className="count_top"><i className="fa fa-user"></i> Total access requests</span>
                    <div className="count "><OdometerComponent value={6500}></OdometerComponent></div>
                    <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i>+4% </i> from last week</span>
                </div>
                <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                    <span className="count_top"><i className="fa fa-user"></i> Admin records accessed</span>
                    <div className="count"><OdometerComponent value={802}></OdometerComponent></div>
                    <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i>+2% </i> from last week</span>
                </div>
                <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                    <span className="count_top"><i className="fa fa-user"></i> Number of devices used</span>
                    <div className="count count_red"><OdometerComponent value={1502}></OdometerComponent></div>
                    <span className="count_bottom"><i className="red"><i className="fa fa-sort-desc"></i>-3% </i> from last week</span>
                </div>

                <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                    <span className="count_top"><i className="fa fa-bell-o"></i> Number of locations</span>
                    <div className="count count_red"><OdometerComponent value={243}></OdometerComponent></div>
                    <span className="count_bottom"><i className="red"><i className="fa fa-sort-desc"></i>-2% </i> from last week</span>
                </div>
                <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                    <span className="count_top"><i className="fa fa-clock-o"></i> Number of high priority alerts</span>
                    <div className="count">45</div>
                    <span className="count_bottom"><i className="green"><i className="fa fa-sort-asc"></i>+3% </i> from last week</span>
                </div>

                <div className="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
                    <span className="count_top"><i className="fa fa-user"></i> Number of outstanding posts</span>
                    <div className="count count_red">83</div>
                    <span className="count_bottom"><i className="red"><i className="fa fa-sort-desc"></i>-5% </i> from last week</span>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-heading"><strong>Last 30 days Alerts</strong></div>
                    <div className="panel-body text-center lastThirty">
                        <NVD3Chart id="lastThirty" type="stackedAreaChart" datum={lastThirtyDaysData}
                            xAxis={{ tickFormat: (d) => d3.time.format('%x')(new Date(d))}} yAxis={{ tickFormat: (d) => d3.format('d')(d)}}
                                x={(d) => d[0]} y={(d) => d[1]}
                                reduceXTicks="False" showControls="true" clipEdge="true"
                                useInteractiveGuideline="true" transitionDuration="500"
                                />
                    </div>
                </div>
            </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-heading"><strong>Top 5 Access</strong></div>
                        <div className="panel-body text-center">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>User </th>
                                        <th>Recent Posts</th>
                                        <th>Activity Graph</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...Array(5)].map((x, i) =>
                                        <tr>
                                        <td><span><i className="fa fa-user-md"></i>&nbsp;{faker.name.firstName()} {faker.name.lastName()}</span></td>
                                        <td>
                                            <div style={{"padding":"2px"}}>
                                            <span className="label label-primary">{faker.random.arrayElement(system_enums.tags)}</span>
                                            &nbsp;
                                            <span className="label label-primary">{faker.random.arrayElement(system_enums.tags)}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <Sparklines data={[...new Array(30)].map(() => [ faker.random.number({min:5,max:25})])}>
                                                <SparklinesBars style={{ stroke: "white", fill: "#3182bd", fillOpacity: ".45" }} />
                                                <SparklinesLine style={{ stroke: "#e05d5e", fill: "none" }} />
                                            </Sparklines>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-heading"><strong>Multi Bar Chart </strong></div>
                        <div className="panel-body text-center">
                            <NVD3Chart id="barChartLocation" type="multiBarChart" datum={multiBarChart} yAxis={{ tickFormat: (d) => d3.format('d')(d)}}
                                x={(d) => d[0]} y={(d) => d[1]} reduceXTicks="false"  />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-heading"><strong>Bar chart</strong></div>
                        <div className="panel-body text-center horizontal-graph">
                            <NVD3Chart type="multiBarChart" xAxis={{ tickFormat: (d) =>
                                d3.time.format('%d/%m/%y')(new Date(d)) }} datum={stackedData}
                                x={(d) => d[0]} y={(d) => d[1]} reduceXTicks="true"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="panel panel-default">
                        <div className="panel-heading"><strong>Pie Chart </strong></div>
                        <div className="panel-body text-center horizontal-graph">
                            <NVD3Chart id="barChart" type="pieChart" datum={pieChartData} x="label" y="value"
                                labelThreshold="0.05" labelType="percent" donut="true" donutRatio="0.25"
                                />
                        </div>
                    </div>
                </div>
            </div>
        </BaseContainer>
    )
  }
}
