
function sTime () {
    setInterval(function() {
        var time1 = new Date().getTime() / 1000
        // console.log(new Date())
        var hours = Math.floor(time1 % (60 * 60 * 24) / (60 * 60)) + 8
        var minutes = Math.floor(time1 % (60 * 60) / 60)
        var seconds = Math.floor(time1 % 60)
        var lasttime = hours - 1
    
    if(hours > 22)hours = 00
    let str =`
        <h2>京东秒杀</h2>
        <p> ${lasttime}
        <span>点场 倒计时 </span>
        </p>
        <div class="inner">
        <i>${hours}</i>
        <span>:</span>
        <i>${minutes}</i>
        <span>:</span>
        <i>${seconds}</i>
        </div> 
    `
    $('#content >.time >.timeleft').html(str)
    },1000)
    
}



