// 防抖策略
export function debounce(func, delay){
    let timer = null
    return function(...args){ // ...args实参列表
        if(timer) clearTimeout(timer)
        timer = setTimeout(()=>{
            func.apply(this, args)
            // func(...args)
        },delay)
    }
}

export function formatDate(date,fmt){
    //检测fmt字符是否符合多个y的正则模式
    if(/(y+)/.test(fmt)){
        //由于年份是4位数 因此单独做一次处理
        //匹配符合y+的正则表达式 再用getFullYear()替换fmt中的y+
        fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+':date.getMonth(),
        'd+':date.getDate(),
        'h+':date.getHours(),
        'm+':date.getMinutes(),
        's+':date.getSeconds()
    }
    for(let i in o){
        if(new RegExp(`(${i})`).test(fmt)){
            let str = o[i] + ''
            //根据fmt的格式判断是否需要paddZero
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : paddLeftZero(str))
        }
    }
    return fmt
}
function paddLeftZero(value){
    return ('00' + value).substr(value.length)
}