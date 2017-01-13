import React from 'react'
import DKIMDetail from '../../components/DKIMDetail'

export default ({ params }) => {
  const { email, detailId } = params;
  return <DKIMDetail email={email} detailId={detailId} />
}
