
import ts, { isIdentifier } from 'typescript';
import { ast, astNodes } from './utils/create';

export const replace = (
  replacements: { [name: string]: string }
): ts.TransformerFactory<ts.SourceFile> => (context) => {
  return (sourceFile) => {
        const visitor = (node: ts.Node): ts.VisitResult<ts.Node> => {
            if (ts.isVariableStatement(node)) {
              const name = node.declarationList.declarations[0]?.name;
              if (isIdentifier(name) && name.text in replacements) {
                const key = name.text as keyof typeof replacements;
                return ast(replacements[key]);
              }
            } else if (ts.isFunctionDeclaration(node)) {
              const name = node.name;
              if (name && isIdentifier(name) && name.text in replacements) {
                const key = name.text as keyof typeof replacements;
                return astNodes(replacements[key]);
              }
            }
            return ts.visitEachChild(node, visitor, context);
        };

        return ts.visitNode(sourceFile, visitor);
    };
};
