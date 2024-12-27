import { Box, Button,  Heading, HStack, IconButton, Image, Input, Text, VStack } from '@chakra-ui/react'

import { DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger, } from './ui/dialog.jsx'
import React, { useState } from 'react'
import { BsPencil, BsTrash } from 'react-icons/bs'
import {  useColorModeValue } from './ui/color-mode'
import { useProductStore } from '../store/product'
import { toaster } from './ui/toaster'

export const ProductCard = ({product}) => {
    const textColor=useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800")

    const [updatedProduct, setUpdatedProduct] = useState(product);
    const {deleteProduct,updateProduct}=useProductStore();
    const handleDeleteProduct = async (pid)=>{
        const {success, message} = await deleteProduct(pid);
        if(!success){
            toaster.create({
            title:`${message}`,
            type:'error'})
        
        }else{
            toaster.create({
            title:`${message}`,
            type:'success'})
            
        }
        
    }
    const handleUpdateProduct = async (pid)=>{
        const {success, message} = await updateProduct(pid, updatedProduct);
        if(!success){
            toaster.create({
            title:`${message}`,
            type:'error'})
        
        }else{
            toaster.create({
            title:`${message}`,
            type:'success'})
            
        }
        
    }
  return (
    <Box key={product._id}
        shadow={'lg'}
        rounded={'lg'}
        overflow={'hidden'}
        transition={'all 0.3s'}
        _hover={{transform: "translateY(-5px)", shadow:"xl"}}
        bg={bg}>
            <Image src={product.image} alt={product.name} h={48}w={'full'} objectFit={'cover'}/>
            <Box p={4}>
                <Heading as={'h3'} size={'md'} mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                <DialogRoot placement={'center'}>
                <DialogTrigger asChild>
                <Button bg={'blue.300'}>
                        <BsPencil color={'blue'}/>
                    </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editing product {product.name}</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <VStack>
                <Input
								placeholder='Product Name'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
                </VStack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogActionTrigger>
                <Button onClick={()=>handleUpdateProduct(product._id)}>Save</Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
                </DialogRoot>
					
                    <Button bg={'red.300'} onClick={()=>handleDeleteProduct(product._id)}><BsTrash color='red'/></Button>
				</HStack>
                
            </Box>
    </Box>
  )
}
