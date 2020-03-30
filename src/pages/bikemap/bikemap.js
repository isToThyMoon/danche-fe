import React, { PureComponent, Fragment } from 'react';
import { Card } from 'antd';


import { connect } from 'react-redux';
import { actionCreators } from './store';

import FilterForm from './filterform.js';


class BikeMap extends PureComponent {

    map = '';

    render(){
        const { total_bike, requestBikeList } = this.props;
        return (
            <Fragment>
                <Card>
                    <FilterForm filterSubmit={requestBikeList.bind(this)} renderMap={this.renderMap.bind(this)} />
                </Card>
                <Card style={{marginTop:10}}>
                    <div>共{total_bike}辆车</div>
                    <div id="bikeMapContainer" style={{height:800}}></div>
                </Card>
            </Fragment>
        );
    };

    componentWillMount(){
        const submitInfo = {
            city_name: this.props.city_name,
            bike_number: ''
        }
        this.props.requestBikeList(submitInfo, this.renderMap.bind(this));
    }

    componentDidMount(){
        // this.renderMap(this.props.res)
    }

    
    // 渲染地图数据
    renderMap = (res)=>{
        let list = res.result.route_list;
        this.map = new window.BMap.Map('bikeMapContainer');
        let gps1 = list[0].split(',');
        let startPoint = new window.BMap.Point(gps1[0], gps1[1]);
        let gps2 = list[list.length-1].split(',');
        let endPoint = new window.BMap.Point(gps2[0], gps2[1]);
        this.map.centerAndZoom(endPoint,11);
        this.map.enableScrollWheelZoom(true); 
        //标注路径起点
        let startPointIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
            imageSize:new window.BMap.Size(36,42),
            anchor: new window.BMap.Size(18, 42)
        })
        let bikeMarkerStart = new window.BMap.Marker(startPoint, { icon: startPointIcon})
        this.map.addOverlay(bikeMarkerStart);
        
        //标注路径终点
        let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18,42)
        })
        let bikeMarkerEnd = new window.BMap.Marker(endPoint, { icon: endPointIcon })
        this.map.addOverlay(bikeMarkerEnd);

        //绘制车辆行驶路线
        let routeList = [];
        list.forEach((item)=>{
            let p = item.split(',');
            routeList.push(new window.BMap.Point(p[0],p[1]))
        })

        let polyLine = new window.BMap.Polyline(routeList,{
            strokeColor:'#ef4136',
            strokeWeight:2,
            strokeOpacity:1
        })
        this.map.addOverlay(polyLine);

        //绘制服务区
        let servicePointList = [];
        let serviceList = res.result.service_list;
        serviceList.forEach((item)=>{
            servicePointList.push(new window.BMap.Point(item.lon,item.lat))
        })
        let polyServiceLine = new window.BMap.Polyline(servicePointList, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyServiceLine);

        // 添加地图中的自行车图标
        let bikeList = res.result.bike_list;
        let bikeIcon = new window.BMap.Icon('/assets/bike.jpg',new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        })
        bikeList.forEach((item)=>{
            let p = item.split(',');
            let point = new window.BMap.Point(p[0],p[1]);
            let bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon})
            this.map.addOverlay(bikeMarker);
        })
    }

};


const mapStateToProps = (state)=>({
    city_name: state.getIn(['bikemap', 'city_name']),
    total_bike: state.getIn(['bikemap', 'total_bike']),
    res: state.getIn(['bikemap', 'res']).toJS()
});


const mapDispatchToProps = (dispatch)=>({
    //请求车辆地图数据 filter查询也使用同一函数
    requestBikeList(submitInfo, renderMap){
        const params = {
            city_name: submitInfo.city_name,
            bike_number: submitInfo.bike_number
        }
        dispatch(actionCreators.requestBikeListAction(params, renderMap))
    }


})


export default connect(mapStateToProps, mapDispatchToProps)(BikeMap);