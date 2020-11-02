import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
    {
        title: 'Home',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome />,
        cName: 'n-text',

    },
    {
        title: 'Guardadas',
        path: '/saves',
        icon: <BsIcons.BsFillBookmarkFill/> ,
        cName: 'n-text'
    },
    {
        title: 'Mis Anuncios',
        path: '/misanuncios',
        icon: <IoIcons.IoIosPaper />,
        cName: 'n-text'
    },

    {
        title: 'Principal',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'n-text'
    },
    {
        title: 'Buscar',
        path: '/workers',
        icon: <AiIcons.AiOutlineSearch />,
        cName: 'n-text'
    },
    {
        title: 'Chat',
        path: '/chats',
        icon: <AiIcons.AiFillMessage />,
        cName: 'n-text'
    }
];