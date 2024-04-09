import React, { useState } from "react";
import styles from './profile-page.module.css';
import ProfileInfo from "../../components/profile-info/profile-info";
import OrdersInfo from "../../components/orders-info/order-info";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';




const ProfilePage: React.FC = () => {
    const [ menuState, setMenuState ] = useState<number>(0);
    return (
        <section className={styles.profile}>
            <div className={styles.profile_menu}>        
                <Tabs
                    value={menuState}
                    onChange={(e: any, newValue: number) => {console.log (e); setMenuState(newValue)}}
                    scrollButtons={false}
                    aria-label="scrollable prevent tabs example"
                >
                    <Tab label="Мои ТЗ" sx={{'&.MuiButtonBase-root': { outline: 'none' }}}/>
                    <Tab label="Профиль" sx={{'&.MuiButtonBase-root': { outline: 'none' }}}/>
                </Tabs>        
            </div>
            {menuState === 1 && <ProfileInfo />}
            {menuState === 0 && <OrdersInfo />}
        </section>
    )
}

export default ProfilePage;