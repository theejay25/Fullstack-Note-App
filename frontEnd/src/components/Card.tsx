import { FaEdit, FaTrash } from "react-icons/fa";

interface props {
    keys?: number;
    note?: string;
    description?: string;
    onEdit?: React.MouseEventHandler<HTMLButtonElement>
    onDelete?: React.MouseEventHandler<HTMLButtonElement>
}

function Card({ keys, note, description, onEdit, onDelete}: props) {
  return (
    <div key={keys} className="bg-[#323232] p-4 rounded-md shadow-[#404040] shadow-sm ">
        <h2 className="text-xl font-bold">{note}</h2>
        <p>{description}</p>
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