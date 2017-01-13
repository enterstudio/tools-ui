import React from 'react'
import DKIMEmailGenerator from '../../components/DKIMEmailGenerator'

const introText = 'Verifying DKIM is one step that can help your email get to the inbox. Not only is it an industry standard, but when configured correctly it demonstrates to ISPs that – unlike spammers – you are accountable for your email. Check DKIM, quickly with this simple DKIM Validator tool.';

export default () => (
  <div>
    <p>{introText}</p>
    <DKIMEmailGenerator />
  </div>
);
