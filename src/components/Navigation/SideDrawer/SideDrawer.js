import React from 'react'
import Aux from '../../../hoc/Aux'
import classes from './SideDrawer.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../../UI/Backdrop/Backdrop'
const sideDrawer =(props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return <Aux>
        <Backdrop clicked={props.closed} show={props.open}/>
        <div className={attachedClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav><NavigationItems /></nav>
        </div>
    </Aux>
}

export default sideDrawer;