const withLess = require('next-with-less')
const cloneDeep = require("clone-deep");


const withBundleAnalyzer = require('@next/bundle-analyzer')

const withPlugins = require('next-compose-plugins');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  transpilePackages: ['antd'],
  webpack(config, options) {
    // disable css-module in Next.js
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule;
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes('_app')) return;
          one.issuer.and = [path.resolve(__dirname)];
        });
      }
    })

    return config;
  },
  // rewrites: async () => {
  //   return [
  //     {
  //       source: '/trpc/:path*',
  //       destination: 'http://localhost:4000/trpc/:path*' // Proxy to Backend
  //     }
  //   ]
  // }
}



// const addLessToRegExp = (rx) =>
//   new RegExp(rx.source.replace("|sass", "|sass|less"), rx.flags);
// /** 
//  * @function withLess
//  * @param {import('next').NextConfig} nextConfig
//  * @returns {import('next').NextConfig}
//  * */
// function withLess(nextConfig) {
//   return Object.assign({}, nextConfig, {
//     /** 
//      * @function webpack
//      * @type {import('next').NextConfig["webpack"]}
//      * @param {import('webpack').Configuration} config
//      * @returns {import('webpack').Configuration}
//     * */
//     webpack(config, opts) {
//       // there are 2 relevant sass rules in next.js - css modules and global css
//       let sassModuleRules = [];
//       // global sass rule (does not exist in server builds)
//       let sassGlobalRules = [];

//       const cssRule = config.module.rules.find(({ oneOf }) => !!oneOf).oneOf

//       const addLessToRuleTest = (test) => {
//         if (Array.isArray(test)) {
//           return test.map((rx) => addLessToRegExp(rx));
//         } else {
//           return addLessToRegExp(test);
//         }
//       };

//       cssRule.forEach((rule, i) => {
//         if (rule.use?.loader === 'error-loader') {
//           rule.test = addLessToRuleTest(rule.test);
//         } else if (rule.use?.loader?.includes('file-loader')) {
//           rule.issuer = addLessToRuleTest(rule.issuer);
//         } else if (rule.use?.includes?.('ignore-loader')) {
//           rule.test = addLessToRuleTest(rule.test);
//         } else if (rule.test?.source === '\\.module\\.(scss|sass)$') {
//           sassModuleRules.push(rule);
//         } else if (rule.test?.source === '(?<!\\.module)\\.(scss|sass)$') {
//           sassGlobalRules.push(rule);
//         } else if (rule.issuer?.source === "\\.(css|scss|sass)$" && rule.type === 'asset/resource') {
//           rule.issuer = addLessToRuleTest(rule.issuer);
//         } else if (rule.use?.loader?.includes('next-flight-css-loader')) {
//           rule.test = addLessToRuleTest(rule.test);
//         }
//       });

//       const lessLoader = {
//         loader: 'less-loader',
//         options: {
//           lessOptions: {
//             javascriptEnabled: true,
//           },
//         },
//       };

//       let lessModuleRules = cloneDeep(sassModuleRules);

//       const configureLessRule = (rule) => {
//         rule.test = new RegExp(rule.test.source.replace('(scss|sass)', 'less'));
//         // replace sass-loader (last entry) with less-loader
//         rule.use.splice(-1, 1, lessLoader);
//       };

//       lessModuleRules.forEach((lessModuleRule, index) => {
//         configureLessRule(lessModuleRule);
//         cssRule.splice(cssRule.indexOf(sassModuleRules[index]) + 1, 0, lessModuleRule);
//       });

//       if (sassGlobalRules) {
//         let lessGlobalRules = cloneDeep(sassGlobalRules);
//         lessGlobalRules.forEach((lessGlobalRule, index) => {
//           configureLessRule(lessGlobalRule);
//           cssRule.splice(cssRule.indexOf(sassGlobalRules[index]) + 1, 0, lessGlobalRule);
//         });
//       }

//       if (typeof nextConfig.webpack === 'function') {
//         return nextConfig.webpack(config, opts);
//       }

//       return config;
//     },
//   });
// }

module.exports = withPlugins([
  withLess,
  // withBundleAnalyzer()
], nextConfig)
