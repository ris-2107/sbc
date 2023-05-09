import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RiDashboard2Fill, RiLogoutBoxLine, RiMenu5Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ColorModeSwitcher } from "../../../ColorModeSwitcher";

const Header = ({ isAuthenticated, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    isAuthenticated = false;
    navigate(0);
    onClose();
  };

  //setIsAuthenticatedUser((useSelector((state) => state.user.isAuthenticated)));

  // useState(() => {
  //   const storedData = localStorage.getItem("isUserLoggedIn");
  //   setIsAuthenticatedUser(storedData);
  // });

  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme={"yellow"}
        width="12"
        height="12"
        rounded="full"
        position={"fixed"}
        top="6"
        left="6"
      >
        <RiMenu5Fill />
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay backdropFilter={"blur(5px)"} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>
            Security Bootcamp
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={"5"} alignItems={"flex-start"}>
              <LinkButton
                onClick={onClose}
                url="/register"
                title="Register user"
              />
              <LinkButton
                onClick={onClose}
                url="/profile"
                title="View Profile"
              />
              <LinkButton
                onClick={onClose}
                url="/update-profile"
                title="Update Profile"
              />

              {isAuthenticated && (
                // <LinkButton
                //   onClick={onClose}
                //   url="/create"
                //   title="Create A Course"
                // />
                <LinkButton
                  onClick={onClose}
                  url="/create-note"
                  title="Send A Note"
                />
              )}
              {isAuthenticatedUser == true && (
                <LinkButton
                  onClick={onClose}
                  url="/userdashboard"
                  title="Dashboard"
                />
              )}
              <LinkButton onClick={onClose} url="/contact" title="Contact Us" />
              <LinkButton onClick={onClose} url="/about" title="About Us" />

              <HStack
                justifyContent={"space-evenly"}
                position="absolute"
                bottom={"2rem"}
                width="80%"
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link onClick={onClose} to="/profile">
                          <Button variant={"ghost"} colorScheme={"yellow"}>
                            Profile
                          </Button>
                        </Link>
                        <Button onClick={logoutHandler} variant={"ghost"}>
                          <RiLogoutBoxLine />
                          Logout
                        </Button>
                      </HStack>
                      {user && user.role === "admin" && (
                        <Link onClick={onClose} to="/admin/dashboard">
                          <Button variant={"ghost"} colorScheme={"purple"}>
                            <RiDashboard2Fill style={{ margin: "4px" }} />
                            Dashboard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button onClick={onClose} colorScheme={"yellow"}>
                        Login
                      </Button>
                    </Link>
                    <p>OR</p>
                    <Link onClick={onClose} to="/register">
                      <Button colorScheme={"yellow"}>Sign Up</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;

const LinkButton = ({ url = "/", title = "", onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={"ghost"}> {title}</Button>
  </Link>
);
