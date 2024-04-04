import React, { useState } from "react";
import styles from './profile-page.module.css';
import ProfileInfo from "../../components/profile-info/profile-info";
import OrdersInfo from "../../components/orders-info/order-info";




const ProfilePage: React.FC = () => {
    const [ menuState, setMenuState ] = useState<string>('tasks');
    return (
        <section className={styles.profile}>
            <ul className={styles.profile_menu}>                
                <li className={styles.menu_listItem}>
                    <button
                        type='button'
                        className={menuState === 'tasks' ? styles.menu_button__active : styles.menu_button}
                        id='tasks'
                        onClick={(e: any) => {setMenuState(e.target.id)}}
                    >
                        Мои ТЗ
                    </button>
                </li>
                <li className={styles.menu_listItem}>
                    <button 
                        type='button' 
                        className={menuState === 'profile' ? styles.menu_button__active : styles.menu_button}
                        id='profile'
                        onClick={(e: any) => {setMenuState(e.target.id)}}
                    >
                        Профиль
                    </button>
                </li>
            </ul>
            {menuState === 'profile' && <ProfileInfo />}
            {menuState === 'tasks' && <OrdersInfo />}
        </section>
    )
}

export default ProfilePage;