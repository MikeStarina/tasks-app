import React from "react";
import styles from './header.module.css'
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import Avatar from '@mui/material/Avatar';
//import { deepPurple, deepPurple } from '@mui/material/colors';





const Header: React.FC = () => {
    const { user } = useAppSelector(store => store.auth);
    return(
        <header className={styles.header}>
            <Link to='/'>
                <h1 className={styles.header_title}>T.APP</h1> 
            </Link>
            <Link to='/profile'>
                <div className={styles.header_menuWrapper}>
                    {user && <Avatar sx={{textTransform: 'uppercase' }}>{user.firstName[0]}{user.lastName[0]}</Avatar>}
                    {user && <p className={styles.header_managerName}>{`${user.firstName} ${user.lastName}`}</p>}
                </div>
            </Link>
        </header>
    )
}

export default Header;