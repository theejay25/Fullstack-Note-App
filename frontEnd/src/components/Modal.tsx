import { useState } from "react"

interface props{
    closeModal?: React.MouseEventHandler<HTMLInputElement>
    addNote?: (title: string, description: string) => Promise<void>
}

const Modal = ({ closeModal, addNote }: props) => {
    
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e :any) => {
        e.preventDefault() 
        if (addNote) {
            addNote(title, description)
        }
    }


  return (
    <div>
        <div className="bg-[#2c2c2c] p-4 w-[75vw] fixed top-70 left-15 lg:left-[30vw] lg:top-50 lg:w-[45vw]">
            <h2 className="font-semibold mb-4">Add New Notes</h2>

            <form action="" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="" 
                    id=""
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Add Title"
                    className="bg-[#3c3c3c] p-3 mb-5 w-full"
                />
                <textarea  
                    name="" 
                    id="" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Add Decription"
                    className="bg-[#3c3c3c] p-3 mb-5 w-full"
                />
                <input 
                    type="submit" 
                    value="Add" 
                    className="bg-teal-900 p-3 lg:w-25 w-full mb-5"
                />
            </form>
            <p 
                onClick={closeModal}
                className="text-gray-300 cursor-pointer"
            >
                Cancel</p>
        </div>
    </div>
  )
}

export default Modal