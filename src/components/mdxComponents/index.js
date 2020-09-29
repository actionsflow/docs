import React from 'react';

import CodeBlock from './codeBlock';
// import AnchorTag from './anchor';

export default {
  h1: props => {
    return <h1 className="heading1" {...props} />;
  },
  h2: props => <h2 className="heading2" {...props} />,
  h3: props => <h3 className="heading3" {...props} />,
  h4: props => <h4 className="heading4" {...props} />,
  h5: props => <h5 className="heading5" {...props} />,
  h6: props => <h6 className="heading6" {...props} />,
  p: props => <p className="paragraph" {...props} />,

  code: CodeBlock,
};
