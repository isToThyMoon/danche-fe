import axios from 'axios';

axios.interceptors.response.use((response) => {
    console.log('响应成功 拦截response');
    return response;
    },(err)=> {
        var response = {};
        console.log('处理error')
        console.log('拦截err信息',err.response)
        
        switch(err.response.config.url){
            case 'http://api.summeres.top/map/bike_list' :
                response.data = bike_list;
                break;
            default:
                console.log('无匹配url');
                return Promise.reject(response);
        }
        // switch(err.response.config.url){
        //     case '/api/login.json':
        //         response.data = login_json;
        //         break;
        //     default:
        //         console.log('dadada');
        // }
        return Promise.resolve(response);
    }
);


var bike_list = {
    "code": 0,
    "result": {
        "total_count": 100,
        "bike_list": [
            "118.86002,32.094624",
            "118.779532,32.029996",
            "118.756536,32.016281",
            "118.747337,32.022159",
            "118.75941,32.082877",
            "118.639828,32.044688",
            "118.640978,32.021179"
        ],
        "route_list": [
            "118.826963,32.012362",
            "118.792468,32.012852",
            "118.765447,32.01971",
            "118.765447,32.01971",
            "118.753949,31.99252"
        ],
        "service_list": [
            {
                "lon": 118.97874,
                "lat": 32.151381,
                "ts": null
            },

            {
                "lon": 118.852259,
                "lat": 32.159207,
                "ts": null
            },

            {
                "lon": 118.771771,
                "lat": 32.25697,
                "ts": null
            },

            {
                "lon": 118.653338,
                "lat": 32.167032,
                "ts": null
            },

            {
                "lon": 118.5763,
                "lat": 32.04175,
                "ts": null
            },

            {
                "lon": 118.718879,
                "lat": 31.916295,
                "ts": null
            },

            {
                "lon": 118.895953,
                "lat": 31.955518,
                "ts": null
            },

            {
                "lon": 118.97874,
                "lat": 32.151381,
                "ts": null
            }
        ]
    }
}



export default axios;