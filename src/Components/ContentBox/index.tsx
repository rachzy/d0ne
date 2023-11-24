import React from 'react'
import classes from './ContentBox.module.css';

interface IProps {
    children: React.ReactNode;
}

const ContentBox: React.FC<IProps> = ({children}) => {
  return (
    <div className={classes.content_box}>
        {children}
    </div>
  )
}

export default ContentBox