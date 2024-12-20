import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import  {IoPersonAdd, IoLogIn, IoEyeSharp, IoEyeOffSharp} from 'react-icons/io5'
import ReCaptcha from 'react-google-recaptcha'

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {signin, isAuthenticated ,errors:signInErrors} = useAuth();
  const[passwordShow, setPasswordShown]= useState(false);
  const[captchaValue, setCaptchaValue]= useState(null)

  const togglePasswordVisibility=()=>{
    setPasswordShown(passwordShow? false: true);
  }
  const navigate =  useNavigate();

  useEffect( ()=>{
    if(isAuthenticated)
      navigate('/products');
    //else
    //console.log("No esta Autenticado");
  },[isAuthenticated, navigate])


  const onSubmit = handleSubmit(async(data) => {
    //console.log(data);
    signin(data);
  })
    return(
        <div className='flex items-center justify-center h-screen' aria-hidden="false" >
        <div className="bg-orange-300 max-w-md w-full p-10 rounded-md">
            <h1 className='text-2xl font-bold'>Login</h1>
            {
  Array.isArray(signInErrors) && signInErrors.map((error, i) => (
    <div className='bg-red-500 p-2 my-2 text-white' key={i}>
      {error}
    </div>
  ))
}
       
          <form onSubmit={onSubmit}>
           
          <input type="email" 
           className='w-full bg-orange-100 text-black px-4 py-2 rounded-md my-2'
          placeholder='Email'
            { 
                 ...register("email", { required: true})
                }
             />
            {errors.email && (
                 <p className="text-red-500">Email es requerido</p>
           )}
           <label htmlFor='password'>Password</label>
           <div className='flex justify-end items-center relative'>
          <input type={passwordShow? "text": "password"} 
          className='w-full bg-orange-100 text-black px-4 py-2 rounded-md my-2'
          placeholder='Password'
           {
                 ...register("password", { required: true, minLength: 6 })
            }   />
            {
  passwordShow ? <IoEyeSharp size={30} className="absolute mr-2 w-10" 
      onClick={togglePasswordVisibility}  />
   : 
    <IoEyeOffSharp   size={30}   className="absolute mr-2 w-10" 
      onClick={togglePasswordVisibility}  />
  
}

            {
            errors.password?.type === "required" && (
                     <p className="text-red-500">.     Password requerido</p>
            )}
            {errors.password?.type === "minLength" && (
                    <p className="text-red-500">La longitud mínima es de 6 caracteres</p>
            )}
            </div>

                  <button className=' bg-orange-500 px-3 py-3 my-3 rounded-none'
                  type='submit'
                  disabled={!captchaValue}>
                    <IoLogIn size={30}/>
                  </button>

                  <ReCaptcha
                  sitekey='6LeJ6p0qAAAAAHa-hSYtGDeB1sFdV7o8PFJH2ue0'
                  onChange={(value)=> setCaptchaValue(value)}
                  aria:hidden="false"
                  />
          </form>
          <div className= 'text-black flex gap-x-2 justify-between pt-5 mt-5'>
            ¿No tienes una cuenta?
            <Link to="/register" className='text-black'>
            <div  className='flex mx-2 px-2 items-start'>
            !Crea una cuenta!<IoPersonAdd size={30} className='mx-1'/>
            </div>
            </Link>
          </div>
        </div>
      </div>
      
    )
}

export default LoginPage