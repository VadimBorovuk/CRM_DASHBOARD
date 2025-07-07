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
    name: 'Products',
    url: '/products',
    icon: 'radix-icons:video'
  },
  {
    name: 'Payments',
    url: '/payments',
    icon: 'radix-icons:padding'
  },
  {
    name: 'Orders',
    url: '/orders',
    icon: 'radix-icons:star-filled'
  },
]
