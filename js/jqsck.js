$.extend({
    getCookie (key) {
        const obj = {}
        const tmp = document.cookie.split('; ')
        for(let i = 0 ; i < tmp.length;i++ ){
            const t = tmp[i].split('=')
            obj[t[0]] = t[1]
        }
        if(key === undefined){
            return obj
        } else {
            return obj[key]
        }
    },
    setCookie (key , value , expires ){
        if(!expires){
            document.cookie = `${key}=${value}`
        }
        const time = new Date()
        time.setTime(time.getTime() - 1000 * 8 * 60 *60 * 1000 - expires * 1000)
        document.cookie = `${key}=${value};expires=` + time
    }
})
    // $.setCookie('...' , '12435')
    // $.getCookie('...')