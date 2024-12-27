import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { BsMoon, BsPlusSquare, BsSun } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Icon } from '@chakra-ui/react'
import { useColorMode, useColorModeValue } from './ui/color-mode'
import { useProductStore } from '../store/product'
const Navbar = () => {
    
    const {colorMode, toggleColorMode}= useColorMode();
  return (
    <Container maxW={"1140px"} px={4} >
        <Flex 
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
                base: "column",
                sm:"row"
            }}
        >
            <Text
                fontSize={{ base: "22", sm: "28" }}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient={'to-r'}
                gradientFrom={'cyan.400'}
                gradientTo={'blue.500'}
                bgClip={"text"}
            >
                <Link to={"/"}>Product Store 🛒</Link>
                 </Text>
                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"create"}>
                        <Button>
                            <Icon fontSize={20}>
                            <BsPlusSquare/>
                            </Icon>
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode==="light"?<BsMoon size={20} />:<BsSun size={20}/>}
                    </Button>
                </HStack>
           
        </Flex>
    </Container>
  )
}

export default Navbar