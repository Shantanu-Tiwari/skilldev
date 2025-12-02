"use client"

import { useEffect, useState } from "react"
import { AppSidebar } from "./app-sidebar"

export function ClientSidebar(props: any) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <AppSidebar {...props} />
}