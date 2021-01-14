class Banner {
    constructor (ele) {
        this.ele = document.querySelector(ele)
        this.imgBox = this.ele.querySelector('.imgBox')
        this.pointBox = this.ele.querySelector('.pointBox')
        this.leftRight = this.ele.querySelector('.leftRight')
        this.bannerW = this.ele.clientWidth
        this.timer = 0
        this.flag = true
        this.index = 1
        this.init()
    }
    init () {
        this.setPoint()
        this.copyEle()
        this.autoPlay()
        this.moveEnd()
        this.overOut()
        this.leftRightBox()
        this.pointPage()
        this.changePage()
    }
    setPoint () {
        const mun = this.imgBox.children.length 
        const frg = document.createDocumentFragment()
        for(var i = 0 ; i < mun ; i++){
            let li = document.createElement('li')
            if(i === 0) li.classList.add('active')
            li.setAttribute('page_index',i)
            frg.appendChild(li)
        }
        this.pointBox.appendChild(frg)
        this.pointBox.style.width = mun * (25 + 12) + 'px'
    }
    copyEle () {
        const first = this.imgBox.firstElementChild.cloneNode(true)
        const last = this.imgBox.lastElementChild.cloneNode(true)
        this.imgBox.appendChild(first)
        this.imgBox.insertBefore(last,this.imgBox.firstElementChild)
        this.imgBox.style.width = this.imgBox.children.length * 100 + '%'
        this.imgBox.style.left = - this.bannerW + 'px'
    }
    autoPlay () {
       
        this.timer = setInterval(() => {
            this.index++
            move(this.imgBox,{left : - this.index * this.bannerW},() => {
                this.moveEnd()
            })
        },2000)
    }
    moveEnd () {
       if(this.index === this.imgBox.children.length - 1){
           this.index = 1
           this.imgBox.style.left = - this.index * this.bannerW + 'px'
        }
        if(this.index === 0){
            this.index = this.imgBox.children.length - 2
            this.imgBox.style.left = -this.index * this.bannerW + 'px'
        }
        for(let i = 0 ; i < this.pointBox.children.length; i++){
            this.pointBox.children[i].classList.remove('active')
        }
        this.pointBox.children[this.index -1].classList.add('active')
        this.flag = true
    }
    overOut() {
        this.ele.addEventListener('mouseover',() => {
            clearInterval(this.timer)
        })
        this.ele.addEventListener('mouseout',() => {
            this.autoPlay()
        })
    }
    leftRightBox () {
        this.leftRight.addEventListener('click',(e) => {
            e = e || window.event
            const target = e.target || e.srcElement
            if(target.className === 'left'){
                if(!this.flag) return
                this.flag = false
                this.index --
                move(this.imgBox,{left : - this.index * this.bannerW},() => {this.moveEnd()})
            }
            if(target.className === 'right'){
                
                if(!this.flag) return
                this.flag = false
                this.index ++
                move(this.imgBox,{left : - this.index * this.bannerW},() => {this.moveEnd()})
            }
        })
    }
    pointPage () {
        this.pointBox.addEventListener('click',(e) => {
            e = e || window.event 
            const target = e.target || e.srcElement
            if(target.nodeName === 'LI'){
                if(!this.flag) return
                this.flag = false
                const index = target.getAttribute('page_index')
                this.index = index - 0 + 1
                move(this.imgBox,{left:-this.index * this.bannerW},() => {this.moveEnd()})
            }
        })
    }
    changePage () {
        document.addEventListener('visibilitychange', () =>{
            const state = document.visibilityState
            if(state === 'hidden') clearInterval(this.timer)
            if(state === 'visible') this.autoPlay()
        })
    }
}