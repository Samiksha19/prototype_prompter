import moment from 'moment';

export const console_log = (param1, param2) => {
    if (param2) {
        console.log(param1, param2);
    } else {
        console.log(param1);
    }
};

export const parseQueryString = (url) => {
    var urlParams = {};
    url.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function($0, $1, $2, $3) {
            urlParams[$1] = $3;
        }
    );

    return urlParams;
};

export const jsUcfirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatDate = (date, format) => {
    return moment(date).format(format);
};

export const isBetween = (date, start, end) => {
    return moment(date).isBetween(start, end);
};

export const fromNow = (dateTime) => {
    return moment(dateTime).fromNow();
};