// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
  function id(x) { return x[0]; }
  
  const lexer = require("./lexer");
  
  function convertLiteral(data) {
      return {
          "type": "Literal",
          "value": data[0].value
      }
  }
  
  function convertIdentifier(data) {
      return {
          "type": "Identifier",
          "name": data[0].value
      }
  }
  
  var grammar = {
      Lexer: lexer,
      ParserRules: [
      {"name": "executable_statements", "symbols": ["_"], "postprocess": () => []},
      {"name": "executable_statements", "symbols": ["_", {"literal":"\n"}, "executable_statements"], "postprocess": (d) => d[2]},
      {"name": "executable_statements", "symbols": ["_", "executable_statement", "_"], "postprocess": d => [d[1]]},
      {"name": "executable_statements", "symbols": ["_", "executable_statement", "_", {"literal":"\n"}, "executable_statements"], "postprocess": 
          d => [d[1], ...d[4]]
                  },
      {"name": "executable_statement", "symbols": ["var_declaration"], "postprocess": id},
      {"name": "executable_statement", "symbols": ["var_assignment"], "postprocess": id},
      {"name": "executable_statement", "symbols": ["call_statement"], "postprocess": id},
      {"name": "executable_statement", "symbols": ["if_statement"], "postprocess": id},
      {"name": "executable_statement", "symbols": ["while_loop"], "postprocess": id},
      {"name": "executable_statement", "symbols": ["code_block"], "postprocess": id},
      {"name": "var_declaration", "symbols": [{"literal":"ধরি"}, "__", "identifier", "_", {"literal":"="}, "_", "expression"], "postprocess": 
          d => {
              return {
                "type": "VariableDeclaration",
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "id": d[2],
                    "init": d[6]
                  }
                ],
                "kind": "let"
              }
          }
                  },
      {"name": "var_assignment", "symbols": ["identifier", "_", {"literal":"="}, "_", "expression"], "postprocess": 
          d => {
              return {
                "type": "ExpressionStatement",
                "expression": {
                  "type": "AssignmentExpression",
                  "operator": "=",
                  "left": d[0],
                  "right": d[4]
                }
              }
          }
                  },
      {"name": "call_statement", "symbols": ["call_expression"], "postprocess": id},
      {"name": "call_expression", "symbols": ["identifier", "_", {"literal":"("}, "argument_list", {"literal":")"}], "postprocess": 
          d => ({
            "type": "ExpressionStatement",
            "expression": {
              "type": "CallExpression",
              "callee": d[0],
              "arguments": d[3]
            }
          })
                  },
      {"name": "while_loop", "symbols": [{"literal":"যতক্ষণ"}, "_", "expression", "_", "code_block"], "postprocess": 
          d => ({
            "type": "WhileStatement",
            "test": d[2],
            "body": {
              "type": "BlockStatement",
              "body": d[4]
            }
          })
                  },
      {"name": "if_statement", "symbols": [{"literal":"যদি"}, "_", "expression", "_", "code_block"], "postprocess": 
          d => ({
            "type": "IfStatement",
            "test": d[2],
            "consequent": {
              "type": "BlockStatement",
              "body": d[4]
            },
            "alternate": null
          })
                  },
      {"name": "if_statement", "symbols": [{"literal":"যদি"}, "_", "expression", "_", "code_block", "BS", {"literal":"নাহলে"}, "_", "code_block"], "postprocess": 
          d => ({
            "type": "IfStatement",
            "test": d[2],
            "consequent": {
              "type": "BlockStatement",
              "body": d[4]
            },
            "alternate": {
                "type": "BlockStatement",
                "body": d[8]
              }
          })
                  },
      {"name": "if_statement", "symbols": [{"literal":"যদি"}, "_", "expression", "_", "code_block", "BS", {"literal":"নাহলে"}, "_", "if_statement"], "postprocess": 
          d => ({
            "type": "IfStatement",
            "test": d[2],
            "consequent": {
              "type": "BlockStatement",
              "body": d[4]
            },
            "alternate": d[8]
          })
                 },
      {"name": "code_block", "symbols": [{"literal":"{"}, "executable_statements", {"literal":"}"}], "postprocess": 
          (d) => d[1]
                  },
      {"name": "argument_list", "symbols": [], "postprocess": () => []},
      {"name": "argument_list", "symbols": ["_", "expression", "_"], "postprocess": d => [d[1]]},
      {"name": "argument_list", "symbols": ["_", "expression", "_", {"literal":","}, "argument_list"], "postprocess": 
          d => [d[1], ...d[4]]
                  },
      {"name": "expression", "symbols": ["boolean_expression"], "postprocess": id},
      {"name": "boolean_expression", "symbols": ["comparison_expression"], "postprocess": id},
      {"name": "boolean_expression", "symbols": ["comparison_expression", "_", "boolean_operator", "_", "boolean_expression"], "postprocess": 
          d => ({
            "type": "LogicalExpression",
            "operator": d[2],
            "left": d[0],
            "right": d[4]
          })
                  },
      {"name": "boolean_operator", "symbols": [{"literal":"এবং"}], "postprocess": () => "&&"},
      {"name": "boolean_operator", "symbols": [{"literal":"অথবা"}], "postprocess": () => "||"},
      {"name": "comparison_expression", "symbols": ["additive_expression"], "postprocess": id},
      {"name": "comparison_expression", "symbols": ["additive_expression", "_", "comparison_operator", "_", "comparison_expression"], "postprocess": 
          d => ({
              type: "BinaryExpression",
              operator: d[2].value,
              left: d[0],
              right: d[4]
          })
                  },
      {"name": "comparison_operator", "symbols": [{"literal":">"}], "postprocess": id},
      {"name": "comparison_operator", "symbols": [{"literal":">="}], "postprocess": id},
      {"name": "comparison_operator", "symbols": [{"literal":"<"}], "postprocess": id},
      {"name": "comparison_operator", "symbols": [{"literal":"<="}], "postprocess": id},
      {"name": "comparison_operator", "symbols": [{"literal":"=="}], "postprocess": id},
      {"name": "additive_expression", "symbols": ["multiplicative_expression"], "postprocess": id},
      {"name": "additive_expression", "symbols": ["multiplicative_expression", "_", /[+-]/, "_", "additive_expression"], "postprocess": 
          d => ({
              type: "BinaryExpression",
              operator: d[2].value,
              left: d[0],
              right: d[4]
          })
                  },
      {"name": "multiplicative_expression", "symbols": ["unary_expression"], "postprocess": id},
      {"name": "multiplicative_expression", "symbols": ["unary_expression", "_", /[*/%]/, "_", "multiplicative_expression"], "postprocess": 
          d => ({
              type: "BinaryExpression",
              operator: d[2].value,
              left: d[0],
              right: d[4]
          })
                  },
      {"name": "unary_expression", "symbols": ["number"], "postprocess": id},
      {"name": "unary_expression", "symbols": ["boolean"], "postprocess": id},
      {"name": "unary_expression", "symbols": ["identifier"], "postprocess": id},
      {"name": "unary_expression", "symbols": ["call_expression"], "postprocess": id},
      {"name": "unary_expression", "symbols": ["string"], "postprocess": id},
      {"name": "unary_expression", "symbols": [{"literal":"("}, "_", "expression", "_", {"literal":")"}], "postprocess": 
          d => d[2]
                  },
      {"name": "boolean", "symbols": [(lexer.has("true") ? {type: "true"} : true)], "postprocess":  
          d => ({
              type: "Literal",
              value: true
          })
                  },
      {"name": "boolean", "symbols": [(lexer.has("false") ? {type: "false"} : false)], "postprocess":  
          d => ({
              type: "Literal",
              value: false
          })
                  },
      {"name": "string", "symbols": [(lexer.has("string_literal") ? {type: "string_literal"} : string_literal)], "postprocess": convertLiteral},
      {"name": "number", "symbols": [(lexer.has("number_literal") ? {type: "number_literal"} : number_literal)], "postprocess": convertLiteral},
      {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": convertIdentifier},
      {"name": "__$ebnf$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
      {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
      {"name": "__", "symbols": ["__$ebnf$1"]},
      {"name": "_$ebnf$1", "symbols": []},
      {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
      {"name": "_", "symbols": ["_$ebnf$1"]},
      {"name": "BS", "symbols": ["_"]},
      {"name": "BS", "symbols": [{"literal":"\n"}]}
  ]
    , ParserStart: "executable_statements"
  }
  if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
     module.exports = grammar;
  } else {
     window.grammar = grammar;
  }
  })();
  