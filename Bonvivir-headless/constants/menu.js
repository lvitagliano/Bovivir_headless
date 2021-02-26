export const BASE_URL = 'http://localhost:27115/api/v1/';
export const SELECTIONS = 'selections';

export const MENU = [
    { as: '/bonvivir', href: '/wordpress', text: 'BONVIVIR'},
    { as: '/wordpress', href: '/wordpress', text: 'CLUB', items: [
        { as: '/club/que-es-el-club', href: '/club/queeselclub', text: 'Qué es el club '},
        { as: '/club/selecciones', href: '/club/selecciones', text: 'Selecciones'},
        { as: '/notas', href: '/wordpress', text: 'Blog'},
        { as: '/wordpress', href: '/wordpress', text: 'Contenido Exclusivo', items: [
            { as: '/maridajes', href: '/wordpress', text: 'Maridajes'},
            { as: '/eventos', href: '/wordpress', text: 'Eventos'},
            { as: '/bodegas', href: '/wordpress', text: 'Bodegas'},
        ]},
        { as: '/beneficios', href: '/wordpress', text: 'Beneficios'},
        { as: '/contacto', href: '/wordpress', text: 'Contacto'}
    ]},
    { as: '/s/vinos', href: '/s/vinos', text: 'TIENDA', items: [
        {title: "Vinos", text: "Vinos", as: "/s/vinos", href: "/s/vinos"},
        {title: "Aceites", text: "Aceites", as: "/s/aceites", href: "/s/aceites"},
        {title: "Accesorios", text: "Accesorios", as: "/s/accesorios", href: "/s/accesorios"},
        {title: "Línea Singular", text: "Línea Singular", as: "linea-singular", href: "/s/linea-singular"}
    ]},
    { as: '/contacto', href: '/wordpress', text: 'CONTACTO'},
]

