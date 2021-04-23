const formatErrorMsg = (msg) => {
    let exist = msg.search(':');
    if(exist) {
        let sanitized = msg.substr(exist+2).split(',');
        sanitized.map((item) => {
            let pos = item.search(':');
            let key = item.substr(0,pos).trim();
            let message = `${key} ${item.replace(key,'').substr(pos+10, item.length)}`;
            console.log(message);       
        });
    }
}
module.exports = formatErrorMsg;
