const coverageSummary = require('../../../../coverage/coverage-summary.json');
module.exports =  () => {
    console.log(coverageSummary.total);
};
