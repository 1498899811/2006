$(function () {
    const list_info = {
        cat_one : 'all' ,
        cat_two: 'all' ,
        cat_three : 'all' ,
        sort : 'id' ,
        sortType : 'ASC' ,
        current: 1 ,
        pagesize : 12
    }
    getCateOne()
    async function getCateOne () {
        const cat_one_list = await $.get('./server/catOne.php', null , null ,'json')
        // console.log(cat_one_list)
        let str = `<span class="active">全部</span>`
         cat_one_list.list.forEach(item => {
             str += `
             <span>${item.cat_one_id}</span>
             `  
         }) 
         $('.cat_one > .right').html(str)     
    }
    $('.cat_one .right').on('click', 'span' ,function() {
        $(this).addClass('active').siblings().removeClass('active')
        const cat_one = $(this).text()
        list_info.cat_one = cat_one
        list_info.cat_two = 'all'
        list_info.cat_three = 'all'
        $('.cat_three .right').html('<span class="active">全部</span>')
        if(cat_one === '全部') {
            $('cat_two .right').html('<span class="active">全部</span>')
            list_info.cat_one = 'all'
        } else {
            getCatTwo() 
        }
        getCount()
    })
    async function getCatTwo() {
        const cat_two_list = await $.get('./server/catTwo.php', { cat_one: list_info.cat_one }, null, 'json')
        // console.log(cat_two_list)
   
        let str = `<span class="active">全部</span>`
        cat_two_list.list.forEach(item => {
            str += `
                <span>${ item.cat_two_id }</span>
            `
        })
        $('.cat_two .right').html(str)
    }
    $('.cat_two .right').on('click','span',function() {
        $(this).addClass('active').siblings().removeClass('active')
        const cat_two = $(this).text()
        list_info.cat_two = cat_two
        list_info.cat_three = 'all'
        if(cat_two === '全部') {
            list_info.cat_two = 'all'
            $('.cat_three .right').html(`<span class="active">全部</span>`) 
        }else{
            getCatThree()
        }
        getCount()
    })
    async function getCatThree () {
        const cat_three_list = await $.get('./server/catThree.php',{ cat_one: list_info.cat_one, cat_two: list_info.cat_two }, null, 'json')
        console.log(cat_three_list)
        let str = `<span class="active">全部</span>`
        cat_three_list.list.forEach(item => {
            str +=`
                <span>${ item.cat_three_id }</span>
                `
        })
        $('.cat_three .right').html(str)
    }
    $('.cat_three .right').on('click','span',function () {
        $(this).addClass('active').siblings().removeClass('active')
        const cat_three = $(this).text()
        list_info.cat_three = cat_three
        if(cat_three === '全部'){
            list_info.cat_three = 'all'
        }
        getCount()
    })
    getCount()
    async function getCount () {
        let {count} = await $.get('./server/getCount.php',{cat_one : list_info.cat_one , cat_two : list_info.cat_two , cat_three : list_info.cat_three}, null , 'json')
        console.log(count) 
        new Pagination('.pagination' , {
            total:count,
            pagesize : 12 ,
            change (current , pagesize) {
                // console.log(this.total)
                // console.log(current)
                // console.log(pagesize)
                list_info.current = current
                list_info.pagesize = pagesize
                getGoodsList()
            }
        })
    }
    async function getGoodsList () {
        const GoodsList = await $.get('./server/goodsList.php', list_info, null, 'json')
        console.log(GoodsList)
        let str =``
        GoodsList.list.forEach(item => {
            str += `
                <li class="thumbnail">
                <img data-id="${ item.goods_id}" src="${ item.goods_small_logo}" alt="...">
                <div class="caption">
                    <h3 >${item.goods_name}</h3>
                    <p class="price">￥ <span class="text-danger">${ item.goods_price }</span></p>
                    <p>
                        <a href="./cart.html">去结算</a>
                        <a href="./cart.html">加入购物车</a>
                    </p>
                </div>
                </li>
                `
        }) 
        console.log(12)
        $('.goodList ul').html(str)
    }
    $('.sort-list .right').on('click', 'span' , function () {
       if(list_info.sort === this.dataset.sort) {
           list_info.sortType = list_info.sortType === "ASC" ? 'DESC' : 'ASC'
       }else{
           list_info.sortType = 'ASC'
       }
       console.log('切换排序方式')
       list_info.sort = this.dataset.sort
       list_info.current = 1
       $(this).addClass('active').siblings().removeClass('active')
       getGoodsList()
    })
    $('.goodList ul').on('click' , 'img' , function () {
        // console.log(this.dataset.id)
        window.sessionStorage.setItem('goods_id',this.dataset.id)
        window.location.href = './detail.html'
    })
})