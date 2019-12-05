const path = require('path');//用于解析路径
//使用cjs commonJS模块化语法暴露
const htmlWebpackPlugin = require('html-webpack-plugin');

//注意是在package.json中的 "scripts" 注意有s 中配置命令
//打包命令 webpack 可以在package.json中配置短命令
// 他会自动先找局部的webpack指令 再去寻找全局的webpack

//暴露出去一个对象 运行时会自动引入
module.exports = {
// 模式 生产环境production 开发环境 development
    //mode: 'production',
  //入口entry 运行时从哪个文件进入 也就是从哪个文件开始打包 都是js文件
  // 一般是index.js
  entry:{
    //属性名 随便 就是这个名一般会用到打包后的文件名
    app:path.resolve(__dirname,'src/index.js')
  },
  //出口output 打包后的文件输出到哪  打包生成js
  output:{
    //输出的文件名 可以包含路径 里面的前面默认写了/ 开始写下面路径开始里面的文件夹
    //[name] 拿的是entry里的属性名
    //bundle 打包 捆绑的意思 理解为打包后的文件
    filename:'static/js/[name].bundle.js',
    path:path.resolve(__dirname,'dist') //路径 所有需要打包输出的资源都以这个配置的路径作为根路径
  },
  //模块加载器 也就是 配置各个loading 为了完成各个打包时的功能
  module:{
    //将ES6翻译成ES5 翻译自己写的js代码
    rules:[
      { //匹配到所有后缀是.js的文件
        test: /\.js$/,
        //排除node_modules 第三方库 包含的文件
        //exclude: /node_modules/,
        //也可以配置包含哪些文件 这两个配置选一个就行
        //这个就是只选中src下的文件 (使用的是绝对路径)
        include:path.resolve(__dirname,'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      //能够使js文件解析css语法 引入使用 可以识别style标签中的css语法
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // 多个loader从右到左处理
      },

      //处理图片 是js文件能够解析
      // 使用url loader 可以处理图片 但是他必须依赖fileloader
      //fileloader 可以处理其他文件 
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192, //小于8kb 就打成base64编码(浏览器会自动解析)
          //打包生成图片 基于output中的path 以这个为基础 往后写
          name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
        }
      }
    ]
  },
  //插件(们)
  plugins:[
    //这个插件可以打包html 并且自动引入打包后的js
   new htmlWebpackPlugin({
     template:'index.html',//将哪个页面作为模板页面打包处理
     //在当前文件夹下找
     filename:'index.html',//打包生成的文件名
     //会生成在output指定的path下
     
   })
    
  ],
  //配置开发环境时使用的服务器 这样在开发环境时 
  //就可以不用每次修改项目 都得重新编译打包
  //生产环境 会在内存中编译打包 
  //在本地生成实际的文件
  //但是必须开启服务器才能运行

  //开发环境 也会在内存中编译打包
  //不会在本地生成实际的文件
  // 会在dev-server中运行
  devServer: {
    open: true, // 自动打开浏览器
    quiet: true, // 不做太多日志输出
    port:'8010' //可以配置在指定的端口运行
  },
  //因为打包编译后 都混成一行 所以在出错的时候 需要找到源文件出错的位置
  //就需要source-map  映射源文件 (映射到某一行)
  devtool:'cheap-module-eval-source-map',
}