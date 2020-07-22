const got = require('got');
const extractor = require('./unfluff');
module.exports = async(url) => {
    try {
        const response = await got(url);
        const content = await extractor(response.body);
        console.log(content);
        return content;
        //=> '<!doctype html> ...'
    } catch (error) {
        console.log(error.response.body);
        //=> 'Internal server error ...'
        return error;
    }
};