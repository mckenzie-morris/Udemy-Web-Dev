import React from 'react';

function Detail(props) {
  return <p className='info'>{props.tel || props.email}</p>;
}

export default Detail;
