"use client"
import {signIn} from "next-auth/react";
import {Button, Modal, Input, Select, Flex} from 'antd';

export default function Login() {
  return (
    <>
      <Flex style={{display: "flex", height: "100%"}} align={"center"} justify={"space-evenly"} vertical>
        <Button type="primary" onClick={() => signIn("keycloak")}>
          Sign-in with keycloak
        </Button>
      </Flex>
    </>
  );
}