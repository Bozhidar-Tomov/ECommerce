import React from "react";

import blob from "../../images/blob.svg";
import "./styles.css";

function Blob() {
  return <img className='blob' src={blob} alt='blob' aria-hidden='true' />;
}

export default Blob;
