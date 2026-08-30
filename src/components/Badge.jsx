import React from 'react'

const Badge = ({ text, color = "default" }) => {
  return (
    <span className={`badge badge-${color}`}>
      {text}
    </span>
  );
}

export default Badge