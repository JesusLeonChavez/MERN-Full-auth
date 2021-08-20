import Head from "next/head"
import Layout from "../../components/Layout"
import {
  Grid,
  Box,
  Text
} from "@chakra-ui/react"
import CardBuyed from "../../components/CardBuyed"
import { useContext, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import { get } from "../../utils/http";

export default function MisCompras({productsBuyed}) {
    return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout withNav >
          <Box bg="primary">
            <Box className="generalWrapper">
              <Text color="letter" fontSize="2xl" fontWeight="medium" textAlign="center" py="12">Mis compras</Text>
              <Grid templateColumns="repeat(4,1fr)">
                  {
                    productsBuyed.map(item=>(
                      <CardBuyed key={item} product={item}/>
                    ))
                  }
              </Grid>
            </Box>
          </Box>
      </Layout>
    </div>
    )
}

export const getServerSideProps = async context => {
    const id = context.params.usuarioid 
    const res = await fetch(`${process.env.API_BASE_URL}/shopping/buy/${id}`)
    // @ts-ignore
    const data = await res.json()
    const productsBuyed = data.datos.productos.map( item => item.productWithData) 
    return {
        props: { productsBuyed: productsBuyed }
    }
}