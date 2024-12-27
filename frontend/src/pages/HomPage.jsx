import { Box, Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import { ProductCard } from '../components/ProductCard'
import { Toaster } from '../components/ui/toaster'

const HomPage = () => {

  const {fetchProducts, products} = useProductStore();
  useEffect(()=>{
    fetchProducts();
  },[fetchProducts])
  
  return (
    <Container minW={"sm"} py={12}>
      <Toaster />
      <VStack spacing={8}>
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
                Current Products 🚀
                 </Text>
        <SimpleGrid columns={{
          base:1,
          md:2,
          lg:3
        }} gap={5} h={'full'} w={'full'} >
          {products.map((product)=>(<>
            <ProductCard key={product._id} product={product} />
          </>))}
        
        </SimpleGrid>

        {products.length==0&&(<>
          <Text fontSize={'xl'} textAlign={"center"} fontWeight={"bold"} color={'gray.500'}>
          No products found! 😥
          <Link to={'/create'}>
            <Text as={"span"} color={"blue.500"} _hover={{textDecoration: "underline"}}>
              Create a product
            </Text>
            </Link>
        </Text>
        </>)}
       
      </VStack>
    </Container>
  )
}

export default HomPage