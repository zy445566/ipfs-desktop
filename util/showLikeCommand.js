module.exports = function showLikeCommand (dom,text,interval=100) {
    let index = 0;
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
            clearInterval(timeInterval);
        }
    },interval);
}