module.exports = function showLikeCommand (dom,text,repeat=false,backOrgin=false,interval=100) {
    return new Promise((reslove,reject)=>{
        let index = 0;
        let orginText = dom.innerText;
        let timeInterval = setInterval(function(){
            if (text[index]==' ') {
                if (index+1<text.length) {
                    dom.innerText = dom.innerText+(text[index]+text[index+1]);
                }
                index++;
            } else {
                dom.innerText = dom.innerText+text[index];  
            }
            index++;
            if (index>=text.length) {
                if (repeat) {
                    dom.innerText=orginText;
                    index=0;
                } else {
                    if (backOrgin) {
                        dom.innerText=orginText;
                    }
                    clearInterval(timeInterval);
                    reslove(true)
                }
            }
        },interval);
    });
}