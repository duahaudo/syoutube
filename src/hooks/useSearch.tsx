import React, { useEffect } from "react"
import { useState } from "react"
import axios from "axios"

interface IResponse {
  success: boolean
  data?: any
  message?: string
}

export default (query: string) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [fetchedData, setFetchedData] = useState<IResponse | null>(null)

  useEffect(() => {
    if (!query) {
      setFetchedData(null)
    } else {
      setLoading(true)
      axios({
        method: "GET",
        url: "https://youtube.googleapis.com/youtube/v3/search",
        params: {
          part: "snippet",
          maxResults: 25,
          type: 'video',
          q: query,
          key: "AIzaSyBw8vuvTucv0HYaeEjlOL78YAMYDD_AyAM"
        },
        headers: {
          // Authorization: `Bearer 200027937330-er4j66dnaa11fkbcaqihmtvavi7s7661.apps.googleusercontent.com`,
          Accept: 'application/json'
        }
      }).then((res) => {
        setLoading(false)
        setFetchedData({
          success: true,
          data: res.data
        })
      }).catch((error) => {
        setLoading(false)
        setFetchedData({
          success: false,
          message: error.message
        })
      })
    }
  }, [query])

  return [loading, fetchedData]
}