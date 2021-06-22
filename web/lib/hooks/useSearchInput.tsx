import { useRouter } from "next/router"
import { useState } from "react"

const useSearchInput = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const searchMovie = async () => {
    router.push(`/search/${searchQuery.toLowerCase()}/1`)
  }

  return {
    searchQuery,
    searchMovie,
    setSearchQuery,
  }
}

export default useSearchInput
