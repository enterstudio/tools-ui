export const INTRO_TEXT = 'Verifying DKIM is one step that can help your email get to the inbox. Not only is it an industry standard, but when configured correctly it demonstrates to ISPs that – unlike spammers – you are accountable for your email. Check DKIM quickly with this simple DKIM Validator tool.';

export const LIST_ERROR_MESSAGE = 'Sorry, we\'re having trouble finding your messages.';
export const DETAIL_ERROR_MESSAGE = 'Sorry, we\'re having trouble finding your message details.';

// https://github.com/nfl/react-helmet
export const HOMEPAGE_HELMET = {
  title: 'DKIM Validator',
  meta: [
    {name: 'description', content: 'DKIM Validator Description'},
    {property: 'og:type', content: 'website'},
    {property: 'og:url', content: 'https://tools.sparkpost.com/dkim'}
    // {property: 'og:image', content: ''}
  ]
};
