let proxyObj={}

//所有‘/’都要代理
proxyObj['/']={
    //websocket
    ws:false,

    //代理到哪里去(代理到后端接口地址)
    target:'http://localhost:8083',

    //表示发送请求头时的host会被设置成target
    changeOrigin:true,

    //不重写请求地址
    pathReWrite:{
        '^/':'/'
    }
    
}


module.exports={
    devServer:{
        host:'localhost',
        port:8082,
        proxy:proxyObj
    }
}