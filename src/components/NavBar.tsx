import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps { }

export const NavBar: React.FC<NavBarProps> = ({ }) => {
    const [{ data, fetching }] = useMeQuery({
        pause: isServer(),
    }); // whenever we need to access currently logged in user we will use this query 
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    let body = null;
    if (fetching) {

    } else if (!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link color="white" mr={2}>login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link color="white" >register</Link>
                </NextLink>
            </>
        );
    } else {
        body = (
            <Flex>
                <Box mr={2} >{data.me.username}</Box>
                <Button onClick={() => {
                    logout();
                }} 
                isLoading={logoutFetching}
                variant="link">logout</Button>
            </Flex>
        );
    }
    return <Flex bg="tomato" p={4}>
        <Box ml={"auto"}>
            {body}
        </Box>
    </Flex>
}