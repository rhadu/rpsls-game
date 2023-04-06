// component.js
exports.component = name => `
  import React from 'react'

  export interface I${name}Props { }

  const ${name} = ({}: I${name}Props) => {
    return <div>Hello , I am a ${name} component.</div>;
  };

  export default ${name};
`;

// index.js
exports.barrel = name => `import ${name} from './${name}';
export default ${name};
`;