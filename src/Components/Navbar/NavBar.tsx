import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

const NavBar = () => {
  return (
    <div className="fixed w-full bg-red-600 z-10 shadow-sm">
      <div className="py-5 border-b-[0.5px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-2 md:gap-0">
            <Logo />
            <UserMenu/>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
