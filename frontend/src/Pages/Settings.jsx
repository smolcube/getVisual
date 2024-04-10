import React from 'react';

const settings = [
    {
        sett: 'المعلومات الشخصية',
        options: ['اسم المستخدم', 'عنوان البريد الإلكتروني', 'كلمة المرور']
    },
    {
        sett: 'إعدادات الحساب',
        options: ['حذف الحساب', 'إلغاء تنشيط الحساب']
    },
    {
        sett: 'السجلات',
        options: ['التقييمات', 'الإعجابات'],
    },
    {
        sett: 'إعدادات الباقات',
        options: ['حذف الباقة']
    }
];

export default function Settings() {
    return (
        <aside className='sidebar'>
            <h1>Settings</h1>
            <div className='container'>
                <div className='settings'>
                    <ul className='sidebar__menu'>
                        {settings.map((sett, index) => (
                            <li key={index}>
                                {sett.sett}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='options'>
                    {settings.map((sett, index) => (
                        <ul key={index} className='options__list'>
                            {sett.options.map((option, optionIndex) => (
                                <li key={optionIndex}>
                                    {option}
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </aside>
    );
}
