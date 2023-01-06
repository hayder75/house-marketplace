import {useState} from 'react'
import { toast } from 'react-toastify'
import {Link , useNavigate} from 'react-router-dom'
import OAuth from '../componets/OAuth'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'

import visiblityIcon from '../assets/svg/visibilityIcon.svg'

function SignIn() {

  const [showPassword , setShowPassword] = useState(false)

  const [formData , setFormData]=useState ({
    email : '' , 
    password:''
  })

  const {email,password} =formData

  const navigate  = useNavigate()
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value
    }))
  }
  


  const onSubmit = async (e) => {
    e.preventDefault()

        try {
          const auth = getAuth()

      
          const userCredential= await signInWithEmailAndPassword(auth,email,password)
     
              if(userCredential.user) {
                navigate('/')
              }
    
          
        } catch (error) {
          toast.error('Bad user input')
        }
    
  }
    return (
     <>
     
     <div className='pageContainer'>
 
        <p className='pageHeader'>
        Welcome Back
        </p>

    <form onSubmit={onSubmit}>
        <input 
        type='emial'  
        className='emailInput' 
        placeholder='email' 
        id='email' 
        value={email} 
        onChange = {onChange}
        />
      
        <div className='passwordInputDiv'>
          <input 
            type={showPassword ? 'text' : 'password'} 
            className='passwordInput' 
            placeholder='password' 
            id='password' 
            value={password} 
            onChange = {onChange}
          />
          
        <img src={visiblityIcon} alt='show passowrd' 
        className='showPassword' 
          onClick={() => setShowPassword((prevState) => !prevState)}/>

          </div>

          <Link to='/forgot-password' className='forgotPasswordLink'  >
          Forgot password
          </Link>

          <div className='signInBar'>
          <p className='signInText'>
          Sign in</p>
          <button className='signInButton'>
          <ArrowRightIcon fill='#fff' width='34px'  height='34px' />
          </button>
          </div>
 </form>


     
     <OAuth />

     <Link to='/sign-up' className='registerLink'> Sign Up instead</Link>
    
     </div>
  
     </>
    );
  }
  
export default SignIn;
  