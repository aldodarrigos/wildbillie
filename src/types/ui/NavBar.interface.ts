export interface INavBar {
    menuItems: INavBarItem[];
}

export interface INavBarItem {
    name: string;
    href: string;
    isActive?: boolean;
    isMenu?: boolean;
}