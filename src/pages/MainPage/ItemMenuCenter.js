const MenuCenter = (ListServers, User, selectedId) => [
	{
		text: 'Home',
		to: '/menu',
		state: { ListServers },
	},
	{
		text: 'Music',
		to: '/menu/music',
		state: { idServer: selectedId, idUser: User?.id },
	},
	{
		text: 'Admin',
		to: '/menu/admin',
		state: { idServer: selectedId, idUser: User?.id },
	},
	{
		text: 'Contact',
		to: '/menu/contact',
	},
]
export default MenuCenter
