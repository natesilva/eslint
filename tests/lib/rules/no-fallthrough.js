/**
 * @fileoverview Tests for no-fallthrough rule.
 * @author Matt DuVall<http://mattduvall.com/>
 */

/*jshint node:true*/

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var eslintTester = require("eslint-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

eslintTester.addRuleTest("lib/rules/no-fallthrough", {
    valid: [
        "switch(foo) { case 0: a(); /* falls through */ case 1: b(); }",
        "function foo() { switch(foo) { case 0: a(); return; case 1: b(); }; }",
        "switch(foo) { case 0: a(); throw 'foo'; case 1: b(); }",
        "switch(foo) { case 0: a(); break; case 1: b(); }",
        "switch(foo) { case 0: case 1: a(); break; case 2: b(); }",
        "switch(foo) { case 0: case 1: break; case 2: b(); }",
        "switch(foo) { case 0: case 1: break; default: b(); }",
        "switch(foo) { case 0: case 1: a(); }",
        "switch(foo) { case 0: case 1: a(); break; }",
        "switch(foo) { case 0: case 1: break; }",
        "switch(foo) { }",
        "switch(foo) { case 0: switch(bar) { case 2: break; } /* falls through */ case 1: break; }",
        "function foo() { switch(foo) { case 1: return a; a++; }}"
    ],
    invalid: [
        {
            code: "switch(foo) { case 0: a(); case 1: b() }",
            errors: [
                {
                    message: "Expected a \"break\" statement before \"case\".",
                    type: "SwitchCase"
                }
            ]
        },
        {
            code: "switch(foo) { case 0: a(); default: b() }",
            errors: [
                {
                    message: "Expected a \"break\" statement before \"default\".",
                    type: "SwitchCase"
                }
            ]
        }

    ]
});
