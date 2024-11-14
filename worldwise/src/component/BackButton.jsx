
import { useNavigate } from "react-router-dom"
import Button from "./Button"

export default function BackButton() {
    const navigate=useNavigate()
  return (
    <Button type='back' onclick={(e)=>
        {
          // to prevent the reload the page as submitting the form
          e.preventDefault()
          navigate(-1)
        }
      }>Back</Button>
  )
}
