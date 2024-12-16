import { Controller, useForm } from "react-hook-form";
import { useProducts } from "../context/ProductContext";
import uploadIcon from '../assets/addphoto.svg';
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import  { IoBagAdd, IoCloseSharp } from 'react-icons/io5';

function ProductsFormPage() {
    const server = import.meta.env.VITE_BASE_URL+"/img";
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            price: 0.0,
            year: new Date().getFullYear,
            image: uploadIcon,
        },
    });
    //WWWWWWWWWWWWWWWWW
    const { 
        products, 
        createProduct, 
        getProduct, 
       // updateProductNoUpdateImage,
        updateProduct,
        errors:productErrors
     }  = useProducts();
    const [selectedImage, setSelectedImage] = useState(uploadIcon);
    const inputImage = useRef(null);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadProduct() {
            if (params.id) {
                const product = await getProduct(params.id);
                setValue('name', product.name);
                setValue('price', product.price);
                setValue('year', product.year);
                setValue('image', product.image);
                setSelectedImage(server + product.image);
            }
        }
        loadProduct();
    }, [params.id, getProduct, setValue]);

    console.log(products);
    //Funcion onSubmit para crear nuevo prod o actualizarlo
    const onSubmit = handleSubmit( (data) => {
        const formData = new FormData();

            //Agregar datos al form data
            formData.append("name", data.name);//Nombre del producto
            formData.append("price", data.price); //Precio del product
            formData.append("year", data.year); //año del producto
            formData.append("image", data.image); //archivo de imageb
            
            if (data.image ==""){
                productErrors.push("No se ha elegido una imagen");
                return;
            }         
        
        createProduct(formData);
        navigate('/products');
    });

    const handleImageClick = () => {
        inputImage.current.click();
    };

    const handleImageChange = (e, field) => {
        const file = e.target.files[0];
        setSelectedImage(file ? URL.createObjectURL(file) : uploadIcon);
        field.onChange(file);
    };

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            
                <h1 className="text-3xl font-bold my-2">Productos</h1>
                {
                    productErrors?.map( (error, i) =>(
                        <div className="text-red-500 p-2 my-2"
                        key={i}>
                            {error}
                        </div>
                    ))
                }
                <form onSubmit={ onSubmit }>

                <label htmlFor="name">Nombre</label>
                <input
                    type="text" id="name"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Nombre del producto"
                    {
                        ...register("name", { required: true })
                    }
                    autoFocus
                />
                {errors.name && (
                    <div className="text-red-500"> Nombre del producto es requerido </div>
                )}

                <label htmlFor="price">Precio</label>
                <input
                    type="number"
                    step="0.10" id="price"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Precio del producto"
                    {
                        ...register("price", {
                        required: true,
                        min: 0.0,
                        valueAsNumber: true,
                    })
                }
                />
                {errors.price &&(
                     <div className="text-red-500"> Precio del producto requerido </div>
                    )}
                    { errors.price?.type === "min" && (
                        <div className="text-red-500"> El precio minimo es 0 </div>
                    ) }

                <label htmlFor="year">Año</label>
                <input
                    type="number"
                    max={new Date().getFullYear()}
                    min="1900"
                    step="1"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Año del producto"
                    {
                        ...register("year", {
                        required: true,
                        min: 1900,
                        max: new Date().getFullYear(), 
                        valueAsNumber: true,
                    })}
                />
                {errors.year && (
                    <div className="text-red-500"> Año del producto es requerido </div>
                )}
                {errors.year?.type === "min" && (
                    <div className="text-red-500"> El año minimo es 1900 </div>
                )}
                {errors.year?.type === "max" && (
                    <div className="text-red-500"> El año es (new Date().getFullYear()) </div>
                )}
                

                <div className="py-2 my-2">
                    {selectedImage && (
                        <img
                            src={selectedImage}
                            alt="Imagen seleccionada"
                            width={200}
                            height={200}
                            className="max-h-[200px] object-contain"
                            onClick={handleImageClick}
                        />
                    )}
                    <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="file"
                                ref={inputImage}
                                onChange={(e) => handleImageChange(e, field)}
                                className="hidden"
                            />
                        )}
                    />
                </div>

                
                <button
                        className="bg-green-400 hover:bg-green-500
                        text-white font-semibold hover:text-white
                        py-2 px-4 border border-zinc-500
                        hover:border-transparent rounded">
                        <IoBagAdd size={30} />
                </button>

                <button
                       className="bg-red-500 ml
                        text-white font-semibold
                        py-2 px-4 border border-zj
                        hover:border-transparent rounded"
                        onClick={()=>{navigate('/productos')}}
                        >
                            Eliminar
                </button>


                
            </form>
        </div>
    );
}

export default ProductsFormPage;
