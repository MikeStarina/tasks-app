import React from 'react';
import styles from './profile-info.module.css';
import { useAppSelector } from '../../store/hooks';
import dayjs from "dayjs";
import 'dayjs/locale/ru'




const ProfileInfo: React.FC = () => {
    const { user } = useAppSelector(store => store.auth);

    return(
        <>
            {user && <div className={styles.profile_info}>
                <p className={styles.profileInfo_text}>id: {user.id}</p>
                <p className={styles.profileInfo_text}>ФИО: {`${user.lastName} ${user.firstName}`}</p>
                <p className={styles.profileInfo_text}>username: {user.username}</p>
                <p className={styles.profileInfo_text}>email: {user.email}</p>
                <p className={styles.profileInfo_text}>Дата создания: {`${dayjs(user?.createdAt).format('DD.MM.YYYY HH:mm')}`}</p>             
            </div>}
        </>
    )
}
export default ProfileInfo;