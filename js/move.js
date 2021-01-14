function move(ele,target,fn){
    let count = 0
    for(let key in target){
        if(key === 'opacity'){
            target[key] = target[key] * 100
        }
        count++
        let timer = setInterval(() => {
            
            let current 
            if(key === 'opacity'){
                current = window.getComputedStyle(ele)[key] * 100
            }else{
                current = parseInt(window.getComputedStyle(ele)[key])
            }
            let distance = (target[key] - current) / 10
            distance = distance > 0 ? Math.ceil(distance) : Math.floor(distance)
            if(current === target[key]){
                
                clearInterval(timer)
                count--
                if(count === 0) fn()
            }else{
                if(key === 'opacity'){
                    ele.style[key] = (current + distance) / 100 
                }else{
                    ele.style[key] = current + distance + 'px'
                }
            }
        },3)

    }
}