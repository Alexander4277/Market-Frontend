import {useForm} from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect , useState} from 'react';
import { useNavigate, Link} from 'react-router-dom';
import  {IoPersonAdd, IoLogIn} from 'react-icons/io5'
import ReCaptcha from 'react-google-recaptcha'

function RegisterPage() {
    const {register,handleSubmit, formState:{errors}}= useForm();
    const {signup,isAuthenticated, errors:registerErrors}=useAuth();
    const navigate = useNavigate();
    const[captchaValue, setCaptchaValue]= useState(null)
    useEffect(() => {
      if(isAuthenticated)
        navigate('/products')
    }, [isAuthenticated, navigate])
    
    const onSubmit = handleSubmit(async (values)=>{
     // console.log(values);
      signup(values);
        })
    return (
      <div className="flex items-center justify-center h-screen" aria-hidden="false">
      <div className='bg-orange-300 max-w-md p-10 rounded-md'>
        {
          registerErrors.map( (errors, i) => (
            <div className='bg-red-500 p-2 my-2 text-white' key={i}>
              {errors}
            </div>
          ))
}
        <form onSubmit={onSubmit}>
          <h1 className='text-3x1 font-bold my-2'>Register</h1>
          <label htmlFor='username'>Usuario</label>
              <input type="text" 
              className='w-full bg-orange-100 text-black px-4 py-2 rounded-md my-2'
              placeholder='Username'
               {
                  ...register("username", { required: true, minLength: 5 })
                } 
             />
             {errors.username?.type === "required" && (
                    <p className="text-red-500">Nombre de usuario requerido</p>
          )}
             {errors.username?.type === "minLength" && (
                    <p className="text-red-500">La longitud mínima es de 5 caracteres</p>
          )}
              <label htmlFor='email'>Email</label>
           <input type="email" 
           className='w-full bg-orange-100  text-black px-4 py-2 rounded-md my-2'
          placeholder='Email'
            { 
                 ...register("email", { required: true,
                  pattern:{
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Porfavor entre un Email valido',
                  },
                 })
                }
             />
             {errors.email?.type==='required' && (
                    <p className="text-red-500">Email es requirido</p>
          )}
           {errors.email?.message && (
                    <p className="text-red-500">Email no valido</p>
          )}
          <label htmlFor='password'>Password</label>
          <input type="password" 
          className='w-full bg-orange-100  text-black px-4 py-2 rounded-md my-2'
          placeholder='Password'
           {
                 ...register("password", { required: true, minLength: 6 })
            }   />
            {errors.password?.type === "required" && (
                     <p className="text-red-500">Password requerido</p>
            )}
            {errors.password?.type === "minLength" && (
                    <p className="text-red-500">La longitud mínima es de 6 caracteres</p>
            )}


  
<button className=' bg-orange-500 px-3 py-3 my-3 rounded-none'
                  type='submit'
                  disabled={!captchaValue}>
                    <IoPersonAdd size={30}/>
                  </button>
                  
                  
                 <ReCaptcha 
                  sitekey='6LeJ6p0qAAAAAHa-hSYtGDeB1sFdV7o8PFJH2ue0'
                  onChange={(value)=> setCaptchaValue(value)}
                  aria-hidden="false"
                  />
                  
       </form>
       <div className='flex gap-x-2 justify-between  text-black pt-5 mt-5'>
            ¿Ya tienes una cuenta?
            <Link to="/login" className='text-black'>
            <div className='flex mx-2 px-2 items-start'>
            !iniciar sesion!<IoLogIn size={30} className='mx-1'/>
            </div>
            </Link>
            
            </div>
            </div>
      </div>
    );
  }
  
  export default RegisterPage;
  