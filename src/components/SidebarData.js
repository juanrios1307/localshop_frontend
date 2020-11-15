import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from "react-icons/fa/index";

export const SidebarData = [
    {
        title: 'Home',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome />,
        cName: 'n-text',

    },
    {
        title: 'Carrito de compras',
        path: '/shoppingCar',
        icon: <FaIcons.FaShoppingCart/> ,
        cName: 'n-text'
    },
    {
        title: 'Mis compras',
        path: '/miscompras',
        icon: <FaIcons.FaShoppingCart/> ,
        cName: 'n-text'
    },
    {
        title: 'Mis ventas',
        path: '/misventas',
        icon: <FaIcons.FaShoppingCart/> ,
        cName: 'n-text'
    },

    {
        title: 'Mis productos',
        path: '/misproductos',
        icon: <AiIcons.AiFillShopping />,
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
        path: '/products',
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