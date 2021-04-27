const { describe } = require('mocha');

const assert = require('assert');

const Example = require('../lib/example');

describe('example test', () => {
    it('sayHello', async () => {
        let example = new Example();
        assert("hello element-simplify-ui", example.sayHello())
    });
});