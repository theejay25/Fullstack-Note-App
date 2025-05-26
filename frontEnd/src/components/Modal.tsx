import { useEffect, useState } from "react"

interface props{
    closeModal?: () => void
    addNote?: (title: string, description: string) => Promise<void>
    editNotes?:(id: string, title: string, description:string) => Promise<void>;
    currentNotes?: { title?: string; description?: string; _id?: string } | null
}

const Modal = ({ closeModal, addNote, currentNotes, editNotes }: props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (currentNotes) {
            setTitle(currentNotes.title ?? '')
            setDescription(currentNotes.description ?? '')
        } else {
            setTitle('')
            setDescription('')
        }
    }, [currentNotes])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (currentNotes) {
            if (editNotes) {
                // @ts-ignore: Assuming _id exists on currentNotes
                await editNotes((currentNotes as any)._id, title, description)
            }
        } else {
            if (addNote) {
                await addNote(title, description)
            }
        }
    }

    return (
        <div>
            <div className="bg-[#2c2c2c] p-4 w-[75vw] fixed top-70 left-15 lg:left-[30vw] lg:top-50 lg:w-[45vw]">
                <h2 className="font-semibold mb-4">{ currentNotes ? 'Edit Notes' : 'Add New Notes'}</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        required
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Add Title"
                        className="bg-[#3c3c3c] p-3 mb-5 w-full"
                    />
                    <textarea
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add Description"
                        className="bg-[#3c3c3c] p-3 mb-5 w-full"
                    />
                    <input
                        type="submit"
                        value={currentNotes ? 'Update notes' : 'Add notes'}
                        className="bg-teal-900 p-3 lg:w-25 w-full mb-5"
                    />
                </form>
                <p
                    onClick={closeModal}
                    className="text-gray-300 cursor-pointer"
                >
                    Cancel
                </p>
            </div>
        </div>
    )
}

export default Modal