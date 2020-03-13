const menuList = [

    {
        title:'首页',
        key:'/admin/home'
    },

    //城市管理
    {
        title:'城市管理',
        key:'/admin/city'
        // children: [
        //     {
        //         title:'开通城市',
        //         key:'/admin/open_city'
        //     },
        //     {
        //         title:'城市列表',
        //         key:'/admin/city'
        //     }
        // ]
    },
    
    //订单管理
    {
        title:'订单管理',
        key:'/admin/order'
    },

    //用户管理
    {
        title:'用户管理',
        key:'/admin/user'
    },

    //员工管理
    {
        title:'权限管理',
        key:'/admin/employee'
    },

    //权限管理模块
    // {
    //     title:'权限管理',
    //     key:'/admin/permission'
    // },

    //车辆地图模块
    {
        title:'实时车辆地图',
        key:'/admin/bikemap'
    },
    
    //可视化数据分析 图标echart模块
    {
        title:'图表分析',
        key:'/admin/charts',
        children:[
            {
                title:'柱形图',
                key:'/admin/charts/bar'
            },
            {
                title:'饼图',
                key:'/admin/charts/pie'
            },
            {
                title:'折线图',
                key:'/admin/charts/line'
            },
        ]
    }
];

export default menuList;