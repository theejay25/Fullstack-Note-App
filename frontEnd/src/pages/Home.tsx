import { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import NavBar from '../components/NavBar'
import axios from 'axios'
import Card from '../components/Card'
import { toast } from 'react-toastify'

function Home() {

  const [isModalOpen, setModalOpen] = useState(false)
  const [notes, setNotes] = useState([])
  const [currentNotes, setCurrentNotes] = useState(null)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<any[]>([])

  const closeModal = () => {
    setModalOpen(false)
  }

  const onEdit = (note: any) => {
    setCurrentNotes(note)
    setModalOpen(true)
  }

  const fetchNotes = async () => {
 
       try {
         const {data} = await axios.get('http://localhost:8081/api/note', {
           headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
         })
         setNotes(data.notes)
       } catch (error) {
         console.log(error)
       }
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
          fetchNotes()
        }    
        
        console.log(note)
        
      } catch (error) {
        console.error(error)
      }
    }
    
    const deleteNotes = async (id: any) => {
      try {
      const response = await axios.delete(`http://localhost:8081/api/note/${id}`,{  
              headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }}
        )
        
        if (response.data.success) {
          toast.success('Note deleted')
          fetchNotes()
        }    
        
        console.log(response)
        
      } catch (error) {
        console.error(error)
      }
    }
    

    const editNote = async (id: any, title: any, description: any) => {
      if(!title && !description) {
      alert('Fill in at least 1 field of information')
    }
    
    try {
      const note = await axios.put(`http://localhost:8081/api/note/${id}`, 
        {title, description},{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }}
        )
        
        if (note.data.success) {
          fetchNotes()
          closeModal()
        }    
        
        console.log(note)
        
      } catch (error) {
        console.error(error)
      }
    }

    

      useEffect(() => {    
        fetchNotes()
      }, [])

      useEffect(() => {
        setFilter(
          notes.filter((note: any) =>
            note.title.toLowerCase().includes(query.toLowerCase()) ||
            note.description.toLowerCase().includes(query.toLowerCase()) 
          )
        )
      }, [query, notes])



    return (
    <>
      <div>
        <NavBar setQuery={setQuery}/>

    
    <div className='grid grid-cols-1 md:grid-cols-3 gap-3 p-3'>
        {filter.length > 0 ? filter.map((note: any, i: number) => (
          
          <Card 
            note={note}
            key={i}
            onEdit={() => onEdit?.(note)}
            onDelete={() => deleteNotes?.(note._id)}
            />
        )) : <p>No Notes</p>}
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
          editNotes={editNote}
          /> }
      </div>
    </>
  )
}

export default Home

