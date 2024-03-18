import React from 'react';

const settings = [
    {   
    sett1 : 'personal information',
    options1 : ['username', 'email address', 'password' ]
    },
    {
    sett2 : 'account settings' ,
    options2 : ['delete account', 'unactivate account']
    },
    {
    sett3 : 'logs', 
    options3 : ['ratings', 'likes'],
    },
    {
    sett4 : 'packages settings',
    options4 : ['delete package']
    }
]

export default function Settings() {
    return (
        <aside className='sidebar'>
            <h1>Settings</h1>
            <ul className='sidebar__menu'>
                {settings.map((sett) =>{
                    <li key={sett.id}>
                        {sett.sett1}
                    </li>
                })}
                <li className="sidebar__menu--item">personal information</li>
                <li className="sidebar__menu--item">account settings</li>
                <li className="sidebar__menu--item">logs</li>
                <li className="sidebar__menu--item">packages settings</li>
            </ul>
        </aside>
    )}