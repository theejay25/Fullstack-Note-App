import { FaEdit, FaTrash } from "react-icons/fa";

interface props {
    note?: {title:string, description: string; [keys: string]: any}
    onEdit?: () => void
    onDelete?: () => void
    onclick?: React.MouseEventHandler<HTMLDivElement>
}

function Card({ note, onEdit, onDelete, onclick}: props) {
  return (
    <div key={note?.keys} className="bg-[#323232] p-4 rounded-md shadow-[#404040] shadow-sm" onClick={onclick}>
        <h2 className="text-xl font-bold">{note?.title}</h2>
        <p>{note?.description}</p>
        <div className="flex justify-end mt-2">
            <button className="text-blue-500 mr-2 cursor-pointer" onClick={onEdit}>
                <FaEdit />
            </button>
            <button className="text-red-500 cursor-pointer" onClick={onDelete}>
                <FaTrash />
            </button>
        </div>
    </div>
  )
}

export default Card