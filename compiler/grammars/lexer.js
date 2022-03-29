const moo = require("moo");

const lexer = moo.compile({
    ws: /[ \t]+/,
    nl: { match: "\n", lineBreaks: true },
    lte: "<=",
    lt: "<",
    gte: ">=",
    gt: ">",
    eq: "==",
    lparan: "(",
    rparan: ")",
    comma: ",",
    lbracket: "[",
    rbracket: "]",
    lbrace: "{",
    rbrace: "}",
    assignment: "=",
    plus: "+",
    minus: "-",
    multiply: "*",
    divide: "/",
    modulo: "%",
    colon: ":",
    true: "সত্য",
    false: "মিথ্যে",
    comment: {
        match: /#[^\n]*/,
        value: s => s.substring(1)
    },
    string_literal: {
        match: /"(?:[^\n\\"]|\\["\\ntbfr])*"/,
        value: s => JSON.parse(s)
    },
    number_literal: {
        match: /[0-9\u09E6-\u09EF]+(?:\.[0-9\u09E6-\u09EF]+)?/,
        value: s => {
            var numbers = {
                '০': 0,
                '১': 1,
                '২': 2,
                '৩': 3,
                '৪': 4,
                '৫': 5,
                '৬': 6,
                '৭': 7,
                '৮': 8,
                '৯': 9
            };
            for (let x in numbers) {
                s = s.replace(new RegExp(x, 'g'), numbers[x]);
            }
              return +s;
        }
    },
    identifier: {
        match: /[a-zA-Z\u0980-\u09FF_][a-z\u0980-\u09FF_0-9]*/,
    }
});

module.exports = lexer;