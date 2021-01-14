class Search {
    constructor(ele) {
        
        this.ele = document.querySelector(ele)//整个输入框
        let ul = this.ele.querySelector('ul')//查询到的每一个结果
        let inp = this.ele.querySelector('input')//输入框
        inp.addEventListener('input', function () {
            // console.log(this.value)
            // console.log(this.value.length)
            const value = this.value.trim()
            // console.log(value,'10')
            // if(!value)return//假设无用
            // console.log(value,'12')
            const script = document.createElement('script')
            const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=33423,33355,31660,33285,33287,33334,26350,33389,33383,33370&wd=${value}&req=2&bs=aaa&pbs=aaa&csor=3&pwd=aaa&cb=some&_=1610439817663`
            script.src = url
            document.body.appendChild(script)
            if(value.length == 0)ul.classList.remove('active')
            script.remove()
        })   
    }
} 