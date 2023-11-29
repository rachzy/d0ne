import React, { useState } from 'react'
import classes from './SignOutIcon.module.css';

import { FaRightFromBracket } from "react-icons/fa6";
import Loader from '../Loader';

interface IProps {
    onClick: () => void;
}

const SignOutIcon: React.FC<IProps> = ({onClick}) => {
  const [clicked, setClicked] = useState(false);

  async function handleIconClick() {
    setClicked(true);
    await onClick();
    setClicked(false);
  }

  return(
    <div className={classes.icon_box}>
      {clicked ? <Loader /> : <FaRightFromBracket className={classes.icon} onClick={handleIconClick} title={"Sign out"} />}
    </div>
  )
}

export default SignOutIcon