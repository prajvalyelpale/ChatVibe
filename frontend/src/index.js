import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ChatProvider from "./Context/ChatProvider";
const root = ReactDOM.createRoot(document.getElementById('root'));

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "",
      },
    },
  },
}); 

root.render(
  <ChakraProvider theme={customTheme}>
    <BrowserRouter>
      <ChatProvider>
        <App />
      </ChatProvider>
    </BrowserRouter>
  </ChakraProvider>
);
