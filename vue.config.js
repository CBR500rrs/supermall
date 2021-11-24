module.exports={
    // 配置别名
    configureWebpack: {
        resolve:{
            // extensions:[] 可以省略写文件后缀名.json .vue .js 已默认配置过
            alias:{
                // '@':'src' 默认配置了
                'assets':'@/assets',
                'common':'@/common',
                'network':'@/network',
                'components':'@/components',
                'views':'@/views'
            }
        }
    }
}