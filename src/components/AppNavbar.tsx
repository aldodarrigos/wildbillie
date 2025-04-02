import AppContainer from "./AppContainer";
import Navbar from "./base/Navbar";
import { INavBar } from "@/types/ui";

export default function AppNavbar({ menuItems }: INavBar) {
  return (
      <Navbar menuItems={menuItems} />
  );
}

