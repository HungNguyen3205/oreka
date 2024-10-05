
import React, { useEffect, useState } from 'react';
import { Flex, Box, Text, Button, HStack } from "@chakra-ui/react";
import { connectToMetaMask, fetchBalance } from '../contracts/utils/walletService'; // Import các hàm từ file walletService.js
import {SMART_CONTRACT_ADDRESS} from "../configs/constants"

function Header() {
  const [walletAddress, setWalletAddress] = useState(""); // State để lưu địa chỉ ví
  const [balance, setBalance] = useState("0"); // State để lưu số dư

  // Hàm xử lý khi người dùng nhấn kết nối MetaMask
  const handleConnect = async () => {
    try {
      const account = await connectToMetaMask(); // Gọi hàm kết nối MetaMask từ file walletService.js
      setWalletAddress(account); // Cập nhật địa chỉ ví
      const balance = await fetchBalance(SMART_CONTRACT_ADDRESS); // Gọi hàm lấy số dư từ file walletService.js
      setBalance(balance); // Cập nhật số dư
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Flex
        flex={1}
        w="100%"
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Button
          onClick={handleConnect}
          bg="#FFA500"         // Màu cam
          color="#000000"      // Màu chữ đen
          _hover={{ bg: "#FF8C00" }} // Màu cam đậm hơn khi hover
          mt={4}
        >
          Connect MetaMask
        </Button>

        {/* Sử dụng HStack để đặt các box trên cùng một hàng */}
        <HStack spacing={4} mt={4} align="center">
          
          {/* Hiển thị địa chỉ ví của khách hàng */}
          {walletAddress && (
            <Box
              p={4}
              w="300px"  // Đặt chiều rộng cố định để đồng đều
              bg="#FFEB3B"  // Màu vàng
              boxShadow="lg"
              rounded="lg"
              textAlign="center"
              color="#000000"  // Màu chữ đen
            >
              <Text fontSize="xl" fontWeight="bold">
                Contract Address
              </Text>
              <Text fontSize="md" color="gray.800" mt={2}>
                {walletAddress}
              </Text>
            </Box>
          )}

          {/* Hiển thị số dư của ví */}
          {walletAddress && (
            <Box
              p={4}
              w="300px"  // Đặt chiều rộng cố định để đồng đều
              bg="#FFEB3B"  // Màu vàng
              boxShadow="lg"
              rounded="lg"
              textAlign="center"
              color="#000000"  // Màu chữ đen
            >
              <Text fontSize="xl" fontWeight="bold">
                Contract Balance
              </Text>
              <Text fontSize="md" color="gray.800" mt={2}>
                {balance} ETH
              </Text>
            </Box>
          )}
        </HStack>
      </Flex>
    </>
  );
}

export default Header;
