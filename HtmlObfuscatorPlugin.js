const HtmlObfuscator = require("html-obfuscator");

class HtmlObfuscatorPlugin {
  apply(compiler) {
    compiler.hooks.compilation?.tap("HtmlObfuscatorPlugin", (compilation) => {
      const hooks = compilation.mainTemplate.hooks;
      hooks.htmlWebpackPluginBeforeHtmlProcessing?.tap(
        "HtmlObfuscatorPlugin",
        (data) => {
          const obfuscatedHtml = HtmlObfuscator.obfuscate(data.html);

          return {
            ...data,
            html: obfuscatedHtml,
          };
        }
      );
    });
  }
}

module.exports = HtmlObfuscatorPlugin;
