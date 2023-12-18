import { ReactNode } from 'react'
import './Section.css'

export const Section = ({ children }: { children: ReactNode }) => {
  return <section className="shadow rounded Section p-7 my-8 mx-md-8 ">{children}</section>
}
