import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars, FaIcons } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SidebarData } from './SidebarData';
import SidebarSubMenu from './SidebarSubMenu';

const Nav = styled.div`
    backgroud: #323259;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarNav = styled.nav<{ sidebar: boolean }>`
    background: #323259;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 70px;
    // left: ${({ sidebar }: any) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
    z-index: 10;
`;

const SideBarWrap = styled.div`
    width: 100%;
`;

const Sidebar = () => {

    const [sidebar, setSidebar] = useState(false);

    // const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <SidebarNav sidebar={sidebar}>
                    <SideBarWrap>
                        {SidebarData.map((item: any, index: number) => {
                            return <SidebarSubMenu item={item} key={index} />
                        })}
                    </SideBarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;