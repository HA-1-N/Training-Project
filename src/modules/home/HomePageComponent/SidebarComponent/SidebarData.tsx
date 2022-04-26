import React from 'react';

import { FiTag, FiChevronLeft, FiChevronDown } from 'react-icons/fi';
import { AiOutlineUser } from 'react-icons/ai';

export interface SideBarItem {
    title: string;
    path: string;
    icon: any;
    iconOpened?: any;
    iconClosed?: any;
    subnav?: SideBarItem[];
}

export const SidebarData: SideBarItem[] = [
    {
        title: 'Catalog',
        path: '/catalog',
        icon: <FiTag />,
        iconClosed: <FiChevronLeft />,
        iconOpened: <FiChevronDown />,
        subnav: [
            {
                title: 'Products',
                path: '/catalog/products',
                icon: '',
            },
        ],
    },

    {
        title: 'User',
        path: '/user',
        icon: <AiOutlineUser />,
        iconClosed: <FiChevronLeft />,
        iconOpened: <FiChevronDown />,
        subnav: [
            {
                title: 'User List',
                path: '/user/userlist',
                icon: '',
            },
        ],
    },
];
