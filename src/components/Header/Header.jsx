import React from "react";
import { useSelector } from "react-redux";
import { Container, Logo, LogoutBtn } from "..";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";

const Header = () => {
  const authStatus = useSelector((state) => state.status);
  const userDataName = useSelector((state) => state.userData?.name);
  console.log("userData:", userDataName);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className=" py-3 shadow-md bg-gray-500">
      <Container>
        <nav className="flex ">
          <div className=" flex gap-4 items-center">
            <Link to="/">
              <Logo width="100px" />
            </Link>

            {authStatus && (
              <div className=" flex justify-center gap-[2px] items-center border-black border-[1px] rounded-lg px-1 text-sm">
                <HiOutlineUserCircle />
                {userDataName?.toUpperCase()}
              </div>
            )}
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
