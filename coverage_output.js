'use strict';

const fs = require('fs');
const path = require('path');

let coverage = fs.readFileSync(
    path.resolve('./coverage/coverage.json'),
    'utf8'
);
if (coverage && JSON.parse(coverage).numFailedTests === 0) {
    let data = fs.readFileSync(
        path.resolve('./coverage/coverage-summary.json'),
        'utf8'
    );
    data = JSON.parse(data).total;

    let output = {
        coverage_pct: data.lines.pct,
        lines_total: data.lines.total,
        lines_covered: data.lines.covered,
        branch_pct: data.branches.pct,
        branches_covered: data.branches.covered,
        branches_total: data.branches.total
    };

    output = JSON.stringify(output, null, 2);
    fs.writeFileSync(path.join('coverage_output.json'), output, 'utf8')
    console.log('dumped coverage_output.json');
}
else{
    console.error('coverage_output.json not generated');
}