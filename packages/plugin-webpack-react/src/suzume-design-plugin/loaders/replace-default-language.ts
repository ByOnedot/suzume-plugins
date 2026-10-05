import { parse } from '@babel/parser';
import { getOptions } from 'loader-utils';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import { LoaderDefinitionFunction } from 'webpack';

interface ReplaceDefaultLanguageLoaderOptions {
  type: 'es' | 'lib';
  defaultLanguage: string;
}

// `@babel/parser` and `@babel/traverse` may resolve to different physical copies
// of `@babel/types` inside a consumer's dependency tree, which makes their
// nominal `File`/`Node` types incompatible even though they are structurally
// identical. Translate through `unknown` once, at the single boundary where the
// parsed AST is handed over to `@babel/traverse` / `@babel/generator`.
type TraversableAst = Parameters<typeof traverse>[0];
type GeneratableAst = Parameters<typeof generate>[0];

// 替换默认语言包
const ReplaceDefaultLanguageLoader: LoaderDefinitionFunction = function (resource) {
  const options = getOptions(this);
  const { type = 'es', defaultLanguage } =
    options as unknown as ReplaceDefaultLanguageLoaderOptions;
  const ast = parse(resource, {
    sourceType: type === 'es' ? 'module' : 'script',
  });

  const replaceLanguage = (source: string) => {
    return source.replace(/([a-zA-Z-]+)(.js|.ts)?$/, defaultLanguage);
  };

  if (type === 'lib') {
    traverse(ast as unknown as TraversableAst, {
      CallExpression(path) {
        const { node } = path;
        const { callee, arguments: args } = node;
        if (callee.type !== 'Identifier' || callee.name !== 'require') {
          return;
        }
        const [firstArg] = args;
        if (firstArg && firstArg.type === 'StringLiteral') {
          firstArg.value = replaceLanguage(firstArg.value);
        }
      },
    });
  }

  if (type === 'es') {
    traverse(ast as unknown as TraversableAst, {
      ImportDeclaration(path) {
        const { node } = path;
        node.source.value = replaceLanguage(node.source.value);
      },
    });
  }

  return generate(ast as unknown as GeneratableAst).code;
};

module.exports = ReplaceDefaultLanguageLoader;
module.exports.default = ReplaceDefaultLanguageLoader;
