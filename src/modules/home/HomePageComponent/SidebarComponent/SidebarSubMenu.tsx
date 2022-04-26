import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled.div`
    display: flex;
    color: #e1e9fc;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font-size: 1.2rem;

    &:hover{
        backgroud: #252831;
        border-left: 4px solid #632ce4;
        cursor: pointer;
    }
`;

const SidebarLabel = styled.span`
    margin-left: 16px
`;

const DropdownLink = styled(Link)`
    height: 60px;
    background: #323259;
    color: #e5e5e5;
    display: flex;
    align-items: center;
    text-decoration: none;
    list-style: none;
    padding-left: 3rem;
    font-size: 1.2rem;

    &:hover{
        backgroud: #252831;
        cursor: pointer;
    }
`;

const SidebarSubMenu = ({ item }: any) => {

    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);

    return (
        <>
            <SidebarLink onClick={item.subnav && showSubnav}>
                <div>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </div>
                <div>
                    {item.subnav && subnav ? item.iconOpened : item.subnav ? item.iconClosed : null}
                </div>
            </SidebarLink>

            {subnav && item.subnav.map((item: any, index: number) => {
                return (
                    <DropdownLink to={item.path} key={index}>
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </DropdownLink>
                );
            })}
        </>
    );
};

export default SidebarSubMenu;