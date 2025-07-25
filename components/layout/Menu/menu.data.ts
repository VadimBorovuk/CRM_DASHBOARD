export interface IMenuItem {
  name: string
  url: string
  icon: string
}

export const MENU_DATA: IMenuItem[]  = [
  {
    name: 'Home',
    url: '/',
    icon: 'radix-icons:dashboard'
  },
  {
    name: 'Performers',
    url: '/performers',
    icon: 'radix-icons:person'
  },
  {
    name: 'About',
    url: '/about',
    icon: 'radix-icons:rocket'
  },
]
