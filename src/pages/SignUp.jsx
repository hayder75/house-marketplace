import {useState} from 'react'
import { toast } from 'react-toastify'
import {Link , useNavigate} from 'react-router-dom'
import OAuth from '../componets/OAuth'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {setDoc,doc, serverTimestamp} from 'firebase/firestore' 
import {db} from '../firebase.config'
import visiblityIcon from '../assets/svg/visibilityIcon.svg'

function SignUp() {

  const [showPassword , setShowPassword] = useState(false)

  const [formData , setFormData]=useState ({
    name : '',
    email : '' , 
    password:''
  })

  const {name,email,password , /*sex*/  } = formData

  const navigate  = useNavigate()
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id] : e.target.value
    }))
  }

  /* onsubmit code  */

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()

      const userCredential = await createUserWithEmailAndPassword(auth , email , password)

      const user = userCredential.user

      updateProfile(auth.currentUser , {
        displayName : name
      })
          /*database store in fire store*/
      const formDataCopy = {...formData} /* copy all the data sate from the user fromline 18*/
      delete formDataCopy.password /* delete the password coz we dont need it in the data base */
      formDataCopy.timestamp = serverTimestamp() /* just to get the time its saved */

      await setDoc(doc(db,'users',user.uid),formDataCopy) /* set doc updates the database  */

      navigate('/')
    } catch (error) {
      toast.error("Bad input ")
    }
  }
    return (
     <>
     
     <div className='pageContainer'>
     <header>
        <p className='pageHeader'>
        Welcome Back
        </p>
  
    <form onSubmit={onSubmit}>
    
        <input 
        type='text'  
        className='nameInput' 
        placeholder='Name' 
        id='name' 
        value={name} 
        onChange = {onChange}
        />



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

          <div className='signUpBar'>
          <p className='signUpText'>
          Sign Up</p>
          <button className='signUpButton'>
          <ArrowRightIcon fill='#fff' width='34px'  height='34px' />
          </button>
          </div>
 </form>

     </header>
     
   <OAuth />

     <Link to='/sign-in' className='registerLink'> Sign in instead</Link>
    
     </div>

     </>
    );
  }
  
export default SignUp;
  