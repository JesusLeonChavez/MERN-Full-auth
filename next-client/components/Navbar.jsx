import Link from "next/link"
import styles from "../styles/components/Navbar.module.css"
import ZIcon from "../components/Icon"
import Register from "../sections/Home/Register"
import Login from "../sections/Home/Login"
import {
  Flex,
  Button,
  Box,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Circle,
  PopoverCloseButton
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { DataContext } from "../store/GlobalState"
import React, { useContext } from "react"
import { get } from "../utils/http"
import DrawerCart from "./DrawerCart"

export default function Navbar() {
  const router = useRouter()
  const activeRoute = router?.pathname.split("/")[1]
  const { state, dispatch } = useContext(DataContext)
  const { auth, authReady } = state

  const handleLogout = async () => {
    localStorage.removeItem("isLogged")
    await get("/api/user/logout")
    console.log("log out")
    dispatch({ type: "AUTH", payload: {} })
    // return router.push("/")
    return window.location.reload()
  }

  const loggedRouter = () => {
    return (
      // <ul>
      //   <Flex align="center" justify="center" mx="1">
      //     <Button variant="primary" width="4xs" onClick={handleLogout}>
      //       Log out
      //     </Button>
      //   </Flex>
      // </ul>
      <Flex align="center">
        <Circle
            w="40px"
            h="40px"
            backgroundColor="primary"
            boxShadow="0px 0.758065px 3.03226px rgba(0, 0, 0, 0.4);"
            cursor="pointer"
            mx="3"
            position="relative"
            >
            <ZIcon name="cart" color="icon" />
            <Box w="5" h="5" backgroundColor="red" borderRadius="full" d="flex" alignItems="center" justifyContent="center" position="absolute" top="-1" right="-1">
              <Text fontSize="xs" color="white">1</Text>
            </Box>
        </Circle>
        <Text>Camila Rosales</Text>
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Box px="4">
              <ZIcon name="avatar" color="primary" size={40} pointer />
            </Box>
          </PopoverTrigger>
          <PopoverContent w="38" _focus={{ outline: "none" }}>
            <PopoverArrow />
            <PopoverBody d="flex" alignItems="center" flexDirection="column">
              <Button
                variant="secondary"
                w="100px"
                onClick={() => {
                  router.push("/")
                }}
                my="2"
              >
                Perfil
              </Button>

              <Button variant="primary" w="100px" onClick={handleLogout} my="2">
                Log out
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    )
  }

  return (
    <div className={styles.navbarContainer}>
      <nav className={styles.navbarWrapper}>
        <div>
          <Link href="/">
            <a>
              <ZIcon name="logo" />
            </a>
          </Link>
        </div>
        <ul>
          <li className={`${activeRoute === "" && styles.active}`} id="home">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>

          {
            authReady ? (
              <>
              {
                Object.keys(auth).length === 0 ? (
                  null
                ) : (
                  <li
                  className={`${activeRoute === "mis-compras" && styles.active}`}
                  id="explorar"
                >
                  <Link href="/mis-compras">
                    <a>Mis compras</a>
                  </Link>
                </li>
              )              }
              </>
            ) : null
          }

          {/* <li
            className={`${activeRoute === "publicar" && styles.active}`}
            id="publicar"
          >
            <Link href="/publicar">
              <a href="">Publicar</a>
            </Link>
          </li> */}
        </ul>
        <DrawerCart/>
        {authReady ? (
          <>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {Object.keys(auth).length === 0 ? (
              <ul>
                <Flex align="center" justify="center" mx="1">
                  <Login
                    variant="light"
                    width="4xs"
                    showModalButtonText=" Inicio Sesión"
                  />
                </Flex>
                <Flex align="center" justify="center">
                  <Register
                    variant="primary"
                    width="4xs"
                    showModalButtonText="Registrate"
                  />
                </Flex>
              </ul>
            ) : (
              loggedRouter()
            )}
          </>
        ) : (
          <Box>
            <Text>Entrando ...</Text>
          </Box>
        )}
      </nav>
    </div>
  )
}