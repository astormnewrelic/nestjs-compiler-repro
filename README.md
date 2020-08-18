# Repro of tsconfig-paths.hook.ts (maybe)-Bug

The repro contains a reproduction of some odd behavior we noticed using NestJS and New Relic's Node.js agent together.

To reproduce

1. Clone the Repository

2. Run `$ npm install`

3. Run `$ npm run build`

4. Examine the output of `dist/main.js`

**Expected Behavior**:

The `import` for New Relic's agent is compiled as

```
    const newrelic_1 = require("newrelic");`
```

**Actual Behavior**:

The `import` for New Relic's agent is compiled as

```
    const newrelic_1 = require("../newrelic");`
```

This is pointing at the `newrelic.js` file (the default file for configuring New Relic's agent) instead of the intended New Relic CommonJS module in `node_modules`.

## Additional Context

In our early research it seemed like the problem resided in this TypeScript compiler plugin: [`lib/compiler/hooks/tsconfig-paths.hook.ts`](https://github.com/nestjs/nest-cli/blob/master/lib/compiler/hooks/tsconfig-paths.hook.ts).  This plugin appears to visit every `import` node and conditionally change the path.  It (incorrectly) changes the path of `newrelic` to `./newrelic.js`.

It appears that _any_ `import` in the form of

    import foo from 'foo';

will resolve to the wrong place if there's a `foo.js` file in the root of the project.
