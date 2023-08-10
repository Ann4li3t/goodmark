import React, { useContext } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { StateContext } from 'context/stateContext';
import Menu from './menu';
import styles from '../styles/header.module.css'

export default function Header() {

    const router = useRouter()

    const { updateGlobalState } = useContext(StateContext);

    const handleLinkClick = (e) => {    
        updateGlobalState(null)
    };

    return (
        <header className={styles.header}>
            <div className={styles.barra}>
                <div className={styles.containerLogo}>
                    <Link href={'/'} onClick={handleLinkClick}>
                        <img src="/img/header/logo.png" width={200} height={40} alt='imagen logotipo' />                    
                    </Link>
                </div>
                <div className={styles.containerMenu}>
                    <Menu />
                </div>
            </div>
        </header>
    )
}
