import { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import NavBar from '../components/NavBar'
import axios from 'axios'
import Card from '../components/Card'

function Home() {

  const [isModalOpen, setModalOpen] = useState(false)
  const [notes, setNotes] = useState([])
  const [currentNotes, setCurrentNotes] = useState(null)

  const closeModal = () => {
    setModalOpen(false)
  }

  const onEdit = (note: any) => {
    setCurrentNotes(note)
    setModalOpen(true)
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
    
      useEffect(() => {
        const fetchNotes = async () => {
    
          try {
            const {data} = await axios.get('http://localhost:8081/api/note')
            setNotes(data.notes)
          } catch (error) {
            console.log(error)
          }
        }
    
        fetchNotes()
      }, [addNote])


    return (
    <>
      <div>
        <NavBar />

    
    <div className='grid grid-cols-1 md:grid-cols-3 gap-3 p-3'>
        {notes.map((note: any, i: number) => (
          
          <Card 
            note={note.title}
            description={note.description}
            key={i}
            onEdit={onEdit}
            />
        ))}
    </div>

        <button 
          onClick={() => {
            setModalOpen(true)
            setCurrentNotes(null)
          }}
          className='bg-teal-900 to-white font-bold p-3 px-6 cursor-pointer rounded-md text-2xl fixed right-4 bottom-4'>
            
          +
        </button>
        {isModalOpen && <Modal 
          closeModal={closeModal}
          addNote={addNote}
          currentNotes={currentNotes}
          /> }
      </div>
    </>
  )
}

export default Home

