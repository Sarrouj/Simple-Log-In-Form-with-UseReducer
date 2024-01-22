import './App.css'
import { useReducer } from 'react';

const initialState = {
  userName : "",
  password: "",
  login : false,
  error: "",
}

function reducer(state, action){
  switch(action.type){
    case "outPut" :
      return {
        ...state,
        [action.name] : action.value,
      }
    case "error" :
      return {
        ...state,
        error: "incorrect password and UserName",
        userName: "",
        password: "",
      }
    case "success" :
      return {
        ...state,
        login: true,
        userName: "",
        password: "",
      }
    
    case "logOut":
      return {
        ...state,
        login: false,
        error: "",
      }
    
    default :
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
 

  function onSubmit(e){
    e.preventDefault();
    try{
      if(state.userName == "zaid" && state.password == "sarrouj"){
        dispatch({type: "success"})
      }else{
        throw new Error;
      }
    }catch(error){
      dispatch({type: "error"})
    }
  }

  return (
    <div className='mt-5 w-1/5 mx-auto flex flex-col items-center'>
      <h1 className='text-3xl font-semibold'>useReducer Log in</h1>
      {!state.login ?
        <form className='flex flex-col mt-5 gap-3 w-full items-center'
        onSubmit={(e)=> onSubmit(e)}
      >
        <input type="text" name='userName' placeholder='User Name'
          className='focus:outline-none border py-1 px-2 rounded'
          value={state.userName}
          onChange={(e)=> dispatch({type:"outPut", name:"userName", value: e.target.value})}
        />
        <input type="password" name='password' placeholder='password'
          className='focus:outline-none border py-1 px-2 rounded'
          value={state.password}
          onChange={(e)=> dispatch({type:"outPut", name:"password", value: e.target.value})}
        />
        <div className='w-full flex justify-center'>
          <button className='bg-blue-400 text-white py-1 px-4 rounded'
            type='submit'
          >Log in</button>
        </div>
        <p className='text-red-500'>{state.error}</p>
      </form>
      : <>
      <h1 className='mt-5 text-xl'>Welcome Zaid!</h1>
      <button className='bg-blue-400 text-white py-1 px-4 rounded mt-2'
      type='submit'
      onClick={()=> dispatch({type: "logOut"})}
      >Log Out</button>
    </>} 
    </div>
  )
}

export default App
