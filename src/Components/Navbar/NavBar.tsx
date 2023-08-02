import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

const NavBar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
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
