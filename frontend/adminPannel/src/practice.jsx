import React, { useEffect, useState } from 'react'
import Api3 from './Api3'
import axios from 'axios'


const Practice = () => {
  const [mainProfile, setMainProfile] = useState(
    { name:"",
      age:""
    })
     useEffect(()=>{
        const fetchRecord =  async ()=>{

            try {
                 const response = await Api3.get('/mainProfile')
                 setMainProfile(response.data)
            } catch (error) {
                 console.log(`fetching data error ${error}`)
            }
           
        }
        fetchRecord()
    },[])

    
 const [isEdit, setIsEdit] = useState(false)
   
// editing profile
    const handleClickEdit = (e) =>{
      e.preventDefault()
        setIsEdit(!isEdit)
       
    }
    // saving profile
    const handleClickSave = async () =>{
      try {
        console.log(mainProfile)
         const response = await Api3.put('/mainProfile',mainProfile)
          setMainProfile(response.data)
              alert("update successfully")
               setIsEdit(false)
      } catch (error) {
            console.log('error connectings',error)

      }
       
        // handleSave()
    }

    //  const editProfile = mainProfile.find(data => (data.id).toString() === id)
      // useEffect(()=>{
      //   if(editProfile){
      //     setMainProfile(editProfile);
    
      //   }
      // },[editProfile])

        const handleSave = async () =>{
        
        try {
            const response = await Api3.put('/mainProfile',mainProfile)

              setMainProfile(response.data)
              alert("update successfully")
        } catch (error) {
            console.log('error connectings',error)
        }

       

    }
   
  return (
    <div className='bg-red-400 flex flex-col gap-2 items-center '>
      <div className='bg-blue-200 flex gap-2 h-12 rounded-full p-2' >
        
        <p >user name</p>
        { isEdit ?
            <input className='border border-black' type="text" value={mainProfile.name} onChange={(e)=> setMainProfile(prev => ({...prev, name:e.target.value})) } />
            :
            <p>{mainProfile.name}</p>
        }
      </div>
      <div className='bg-blue-200 flex gap-2 h-12 rounded-full p-2'>
        <p>my age is:</p>
        { isEdit?
        <input className='border border-black' type="number" value={mainProfile.age} onChange={(e)=> setMainProfile(prev => ({...prev, age:e.target.value})) }  />
        :
        <p>{mainProfile.age}</p>
        }
      </div>
      <div >{isEdit ? 
             <button type="button" onClick={handleClickSave} className='bg-blue-500 text-white border-black border-4 hover:bg-black '>Click to Save</button>
             :
             <button type='button' onClick={handleClickEdit} className='bg-blue-500 text-white border-black border-4 hover:bg-black '>Click to Edit</button>
            }
      </div>
    </div>
  )
}

export default Practice
