const formatErrorMsg = (msg) => {
    let exist = msg.search(':');
    if(exist) {
        let sanitized = msg.substr(exist+2).split(',');
        msg = sanitized.map((item) => {
            let pos = item.search(':');
            let key = item.substr(0,pos).trim();
            let message = `${key.replace('_','')} ${item.replace(key,'').substr(pos+10, item.length)}`;
            return {
                key,
                message
            };       
        });
    }

    return msg;
}
module.exports = formatErrorMsg;