import React from 'react';
import Helmet from 'react-helmet';
import { dkimMeta } from 'pages/dkim/constants';
import { inspectorMeta } from 'pages/spf/constants';
import { builderMeta } from 'pages/builder/constants';

const Meta = ({ location: { pathname } }) => {
  let meta = null;

  if (pathname.includes('/dkim')) {
    meta = dkimMeta;
  } else if (pathname.includes('/spf/inspector')) {
    meta = inspectorMeta;
  } else if (pathname.includes('/spf/builder')) {
    meta = builderMeta;
  }
  return <Helmet {...meta} />;
};

export default Meta;
