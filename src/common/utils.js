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
        fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substr(4 - RegExp.$1.length))
    }

}