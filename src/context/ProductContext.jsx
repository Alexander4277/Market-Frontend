import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { createProductRequest, getProductsRequest, deleteProductRequest, getProductRequest, updateProductRequest } from "../api/products";


const ProductsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
    const context = useContext(ProductsContext);
  
    if (!context) {
      throw new Error('useProducts debe estar definido en un contexto');
    }
    return context;
  };
  // Fin de useProducts
  


export function ProductsProvider({ children }) {
    const [products, setProducts]= useState([]);
    const [errors, setErrors] = useState ([]);

    //Funcion para crear un producto
    const createProduct = async(product)=>{
        try{
             await createProductRequest(product);
             getProducts();
        } catch(error){
          setErrors(error.response.data.message);
            console.log(error)
        }
    }//fin de crateProducto

    //Funcion para obtener todos los productos de  l
    const getProducts = async ()=>{
      try{
        const res = await getProductsRequest();
        setProducts(res.data);
      }catch(error){
        setErrors(error.response.data.message);
        console.log(error);
      }
    }//fin de getProduct

    //Funcion para eliminar un producto de la base de datos
    const deletProduct = async(id)=>{
      try{
        const res= await deleteProductRequest(id);
        if (res.status ===200){
          setProducts(products.filter(product=> product._id !=id));
        }
      }catch (error){
        setErrors(error.response.data.message);
        console.log(error)
      }
    }// fin de Delete product

    //Funcion para obtener un producto por id de la DB
    const getProduct= async(id)=>{
      try{
        const res= await getProductRequest(id);
       //console.log(res)
       return res.data;
      }catch(error){
        setErrors(error.response.data.message);
        console.log(error)
      }
    }//fin de getProduct

    //ESCRIBIR 248 COMO ESTABA ORIGINAL ANTES DE MODFICIAR
    //Funcion par actualizar un producto SIN CAMBIAR IMAGEN
    const updateProduct = async(id, product)=>{
      try{
        await updateProductRequest (id, product);
      }catch(error){
        console.log(error)
      }
    
    }// Fin de UpdateProduct
   
    return (
      <ProductsContext.Provider value={{
        products,
        createProduct,
        getProducts,
        deletProduct,
        getProduct,
        //updateProductNoUpdateImage,
        updateProduct,
        errors
      }}>
        {children}
      </ProductsContext.Provider>
    );
  }
  
  // Fin de ProductsProvider
  
  ProductsProvider.propTypes = {
    children: PropTypes.any,
  };
  