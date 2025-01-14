/*

Compiles all the test cases and runs them via webdriver to summarize the results


*/

import {
  ObjectUpdate,
  Transforms,
  Browser,
  InlineLists,
  toolDefaults,
} from '../types';
import * as Reporting from './reporting';
import * as Benchmark from './benchmark';
import * as fs from 'fs';

const defaultOptions: Transforms = {
  replaceVDomNode: false,
  variantShapes: true,
  inlineNumberToString: false,
  inlineEquality: true,
  inlineFunctions: true,
  listLiterals: false,
  passUnwrappedFunctions: true,
  arrowFns: false,
  shorthandObjectLiterals: false,
  objectUpdate: false,
  unusedValues: false,
  replaceListFunctions: true,
  replaceStringFunctions: true,
  recordUpdates: false,
  v8Analysis: true,
  replacements: null
};

const options = {
  compile: true,
  gzip: true,
  minify: true,
  verbose: true,
  assetSizes: true,
  runBenchmark: [
    {
      browser: Browser.Chrome,
      headless: false,
    },
//     {
//       browser: Browser.Firefox,
//       headless: true,
//     },
//     {
//       browser: Browser.Safari,
//       headless: true,
//     },
  ],
  transforms: defaultOptions
  
};

async function go() {
  const report = await Benchmark.run(options, [
    // Use `runWithBreakdown` if you want the breakdown
    // const report = await Reporting.runWithKnockout(options, [
    // const report = await Reporting.runWithBreakdown(options, [
    // {
    //   name: 'Elm Core',
    //   dir: 'testcases/core',
    //   elmFile: 'V8/Benchmark.elm',
    // },
    // {
    //   name: 'Elm CSS',
    //   dir: 'testcases/elm-css',
    //   elmFile: 'V8/Benchmark.elm',
    // },
    {
      name: 'Html',
      dir: 'testcases/html',
      elmFile: 'V8/Benchmark.elm',
    },
    // {
    //   name: 'Elm UI',
    //   dir: 'testcases/elm-ui',
    //   elmFile: 'V8/Benchmark.elm',
    // },
    // {
    //   name: 'Elm UI 2',
    //   dir: 'testcases/elm-ui-2',
    //   elmFile: 'V8/Benchmark.elm',
    // },
    // {
    //   name: 'elm-animator',
    //   dir: 'testcases/elm-animator',
    //   elmFile: 'V8/Benchmark.elm',
    // },
    // {
    //   name: 'Elm Markdown',
    //   dir: 'testcases/elm-markdown',
    //   elmFile: 'V8/Benchmark.elm',
    // },
    // // // This one takes forever
    // {
    //   name: 'elm-obj-file',
    //   dir: 'testcases/elm-obj-file',
    //   elmFile: 'V8/Benchmark.elm',
    // },
  ]);
  const result = await report;

  console.log(Reporting.terminal(result));
  fs.writeFileSync('./results.markdown', Reporting.markdownTable(result));
}

go();
