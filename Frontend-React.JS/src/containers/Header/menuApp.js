export const adminMenu = [
    { //quản lý user
        name: 'menu.admin.manage-user',
        menus: [
            // {
            //     name: 'menu.admin.crud', link: '/system/user-manage',
            // },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-manage',
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/manage-admin',
            // },
            { //quản lý kế hoạch khám bệnh bác sĩ
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',
            }
        ]
    },
    
    { //quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty',
            },
        ]
    },
    { //quản lý chuyên khoa
        name: 'Thuốc',
        menus: [
            {
                name: 'Quản lý thuốc', link: '/system/manage-medicine',
            },
            {
                name: 'Quản lý đơn vị thuốc', link: '/system/medicine-unit',
            },
            {
                name: 'Quản lý phân loại thuốc', link: '/system/medicine-category',
            },
        ]
    },
    { //quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook',
            },
        ]
    },
];

export const doctorMenu = [
    {
        name: 'menu.doctor.manage-doctor',
        menus: [
            { //quản lý kế hoạch khám bệnh bác sĩ
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',
            },
            { //quản lý bệnh nhân khám bệnh
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient',
            }
        ]
    },
    
    {
        name: 'menu.doctor.manage-patient',
        menus: [
            { //quản lý chỉ định khám bệnh
                name: 'menu.doctor.manage-service-orders', link: '/doctor/manage-service-orders',
            },
            { //quản lý kết quả test
                name: 'menu.doctor.manage-test-result', link: '/doctor/manage-test-result',
            },
            { //quản lý đơn thuốc
                name: 'menu.doctor.manage-prescription', link: '/doctor/manage-prescription',
            }
        ]
    }
];