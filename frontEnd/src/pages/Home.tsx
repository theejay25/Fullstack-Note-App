import { useState } from 'react'
import Modal from '../components/Modal'
import NavBar from '../components/NavBar'
import axios from 'axios'

function Home() {

  const [isModalOpen, setModalOpen] = useState(false)
  const closeModal = () => {
    setModalOpen(false)
  }

  const addNote =  async (title: string, description: string) => {

        if(!title && !description) {
            alert('Fill in at least 1 field of information')
        }

       try {
         const note = await axios.post('http://localhost:8081/api/note/add', 
             {title, description},{
             headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
             }}
            )

         if (note.data.success) {
            closeModal()
         }    

            console.log(note)

       } catch (error) {
            console.error(error)
       }
    }

  return (
    <>
      <div>
        <NavBar />

        <button 
          onClick={() => setModalOpen(true)}
          className='bg-teal-900 to-white font-bold p-3 px-6 cursor-pointer rounded-md text-2xl fixed right-4 bottom-4'>
            
          +
        </button>
        {isModalOpen && <Modal 
          closeModal={closeModal}
          addNote={addNote}
          /> }
      </div>
    </>
  )
}

export default Home

