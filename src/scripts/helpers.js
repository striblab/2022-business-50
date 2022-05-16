// helper functions for cash rounding

const commas = input => {
    let parts = input.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
};

const round = (value, decimals = 2) => {
return _.isNumber(value)
    ? Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
    : value;
};

const millions = (input, decimals = 1) => {
    if (!_.isNumber(input)) {
        return input ? input : '';
    }

    let m = input / 1000000;
    return (
        commas(
        m < 0
            ? round(m, decimals + 1)
            : m >= 1000
            ? round(m, 0)
            : round(m, decimals)
        ) + 'M'
    );
};  

export { commas, round, millions };