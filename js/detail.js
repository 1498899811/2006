$(function () {
    const id = window.sessionStorage.getItem('goods_id')
    //  console.log(id)
    if(!id) {
        alert('你查看的商品不存在,点击回到列表页')
        window.location.href = './list.html'
        return
    }
    getGoodsInfo ()
    async function getGoodsInfo () {
        const res = await $.get('./server/goodsInfo.php', {goods_id : id}, null , 'json')
        console.log(res.info)
        bindHtml(res.info)
    }
    function bindHtml (info) {
        let s1 = `
            <div class = "enlargeBox">
                <div class="show">
                    <img src = "${info.goods_big_logo }" alt="" ></img>
                </div>
                <div class="list">
                    <p class="active">
                        <img src="${ info.goods_small_logo }" alt="" ></img>
                    </p>
                </div>
            </div>
            <div class="goodsInfo">
                <p class="desc">${info.goods_name}</p>
                <div class="btn">
                    <button>S</button>
                    <button>M</button>
                    <button>X</button>
                    <button>XL</button>
                </div>
                <p class="price">
                    $ <span>${ info.goods_price}<span>
                </p>
                <div class="num">
                    <button class="subNum"> - </button>
                    <input type="text" value="1">
                    <button class="addNum">+<button>
                </div>
                <div>
                    <button class="btn addCart" >加入购物车</button>
                    <button class="btn continue" ><a href="../list.html">继续去购物</a></button>
                </div>    
            </div>    
        `
        $('.goodsDetail').html(s1)
    }
})