import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/') || specifier.startsWith('.')) {
    const candidate = specifier.startsWith('@/')
      ? path.join(root, 'src', specifier.slice(2))
      : fileURLToPath(new URL(specifier, context.parentURL));

    const resolved = [candidate, `${candidate}.ts`, path.join(candidate, 'index.ts')].find(
      (entry) => existsSync(entry) && /\.(ts|svg|png)$/.test(entry),
    );
    if (resolved) {
      return { url: pathToFileURL(resolved).href, shortCircuit: true };
    }
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (/\.(svg|png)$/.test(url)) {
    return {
      format: 'module',
      source: `export default ${JSON.stringify(url)};`,
      shortCircuit: true,
    };
  }

  if (url.endsWith('.ts')) {
    const sourceText = readFileSync(fileURLToPath(url), 'utf8');
    const { outputText } = ts.transpileModule(sourceText, {
      fileName: fileURLToPath(url),
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        verbatimModuleSyntax: false,
      },
    });
    return {
      format: 'module',
      source: outputText,
      shortCircuit: true,
    };
  }

  return nextLoad(url, context);
}
