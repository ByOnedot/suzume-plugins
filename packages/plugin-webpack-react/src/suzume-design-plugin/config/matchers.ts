import { SUZUME_DESIGN_COMPONENT_NAME } from '.';

export const lessMatchers = `**/node_modules/${SUZUME_DESIGN_COMPONENT_NAME}/**/*.less`;
export const globalLessMatchers = `**/node_modules/${SUZUME_DESIGN_COMPONENT_NAME}/{es,lib}/style/index.less`;
export const globalCssMatchers = `**/node_modules/${SUZUME_DESIGN_COMPONENT_NAME}/{es,lib}/style/index.css`;
export const esLocalDefaultMatchers = `**/node_modules/${SUZUME_DESIGN_COMPONENT_NAME}/es/locale/default.js`;
export const libLocalDefaultMatchers = `**/node_modules/${SUZUME_DESIGN_COMPONENT_NAME}/lib/locale/default.js`;
export const componentLessMatchers = (componentName) =>
  `**/node_modules/${SUZUME_DESIGN_COMPONENT_NAME}/{es,lib}/${componentName}/style/index.less`;
export const componentCssMatchers = (componentName) =>
  `**/node_modules/${SUZUME_DESIGN_COMPONENT_NAME}/{es,lib}/${componentName}/style/index.css`;
