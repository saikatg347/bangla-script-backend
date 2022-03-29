@{%
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

%}

@lexer lexer

executable_statements
    -> _
        {% () => [] %}
    |  _ "\n" executable_statements
        {% (d) => d[2] %}
    |  _ executable_statement _
        {% d => [d[1]] %}
    |  _ executable_statement _ "\n" executable_statements
        {%
            d => [d[1], ...d[4]]
        %}

executable_statement
   -> var_declaration   {% id %}
    | var_assignment    {% id %}
    | call_statement    {% id %}
    | if_statement      {% id %}
    | while_loop       {% id %}
    | code_block       {% id %}

var_declaration
    -> "ধরি" __ identifier _ "=" _ expression
        {%
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
        %}

var_assignment
    -> identifier _ "=" _ expression
        {%
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
        %}

call_statement -> call_expression  {% id %}

call_expression
    -> identifier _ "(" argument_list ")"
        {%
            d => ({
              "type": "ExpressionStatement",
              "expression": {
                "type": "CallExpression",
                "callee": d[0],
                "arguments": d[3]
              }
            })
        %}



while_loop
    -> "যতক্ষণ" _ expression _ code_block
        {%
            d => ({
              "type": "WhileStatement",
              "test": d[2],
              "body": {
                "type": "BlockStatement",
                "body": d[4]
              }
            })
        %}

if_statement
    -> "যদি" _ expression _ code_block
        {%
            d => ({
              "type": "IfStatement",
              "test": d[2],
              "consequent": {
                "type": "BlockStatement",
                "body": d[4]
              },
              "alternate": null
            })
        %}
    |  "যদি" _ expression _ code_block BS 
       "নাহলে" _ code_block
        {%
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
        %}
    |  "যদি" _ expression _ code_block BS
       "নাহলে" _ if_statement
       {%
            d => ({
              "type": "IfStatement",
              "test": d[2],
              "consequent": {
                "type": "BlockStatement",
                "body": d[4]
              },
              "alternate": d[8]
            })
       %}

code_block
    -> "{" executable_statements "}"
        {%
            (d) => d[1]
        %}
        
argument_list
    -> null {% () => [] %}
    |  _ expression _  {% d => [d[1]] %}
    |  _ expression _ "," argument_list
        {%
            d => [d[1], ...d[4]]
        %}

expression -> boolean_expression  {% id %}

boolean_expression
    -> comparison_expression     {% id %}
    |  comparison_expression _ boolean_operator _ boolean_expression
        {%
            d => ({
              "type": "LogicalExpression",
              "operator": d[2],
              "left": d[0],
              "right": d[4]
            })
        %}

boolean_operator
    -> "এবং"      {% () => "&&" %}
    |  "অথবা"       {% () => "||" %}

comparison_expression
    -> additive_expression    {% id %}
    |  additive_expression _ comparison_operator _ comparison_expression
        {%
            d => ({
                type: "BinaryExpression",
                operator: d[2].value,
                left: d[0],
                right: d[4]
            })
        %}

comparison_operator
    -> ">"   {% id %}
    |  ">="  {% id %}
    |  "<"   {% id %}
    |  "<="  {% id %}
    |  "=="  {% id %}

additive_expression
    -> multiplicative_expression    {% id %}
    |  multiplicative_expression _ [+-] _ additive_expression
        {%
            d => ({
                type: "BinaryExpression",
                operator: d[2].value,
                left: d[0],
                right: d[4]
            })
        %}

multiplicative_expression
    -> unary_expression     {% id %}
    |  unary_expression _ [*/%] _ multiplicative_expression
        {%
            d => ({
                type: "BinaryExpression",
                operator: d[2].value,
                left: d[0],
                right: d[4]
            })
        %}

unary_expression
    -> number       {% id %}
    |  boolean      {% id %}
    |  identifier   {% id %}
    |  call_expression {% id %}
    |  string       {% id %}
    |  "(" _ expression _ ")"
        {%
            d => d[2]
        %}

boolean
    -> %true
        {% 
            d => ({
                type: "Literal",
                value: true
            })
        %}
    |  %false
        {% 
            d => ({
                type: "Literal",
                value: false
            })
        %}

string -> %string_literal {% convertLiteral %}

number -> %number_literal {% convertLiteral %}

identifier -> %identifier {% convertIdentifier %}

__ -> %ws:+

_ -> %ws:*

BS
 -> _
 | "\n"