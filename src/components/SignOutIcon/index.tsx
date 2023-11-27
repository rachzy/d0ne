import React from 'react'
import classes from './SignOutIcon.module.css';

import { FaRightFromBracket } from "react-icons/fa6";

interface IProps {
    onClick: () => void;
}

const SignOutIcon: React.FC<IProps> = ({onClick}) => {
  return (
    <FaRightFromBracket className={classes.icon} onClick={onClick} />
  )
}

export default SignOutIcon