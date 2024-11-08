import React from 'react'

import ShineBorder from "@/components/ui/shine-border";
import DockDemo from "./DockDemo"
const Chat = () => {
  return (
    <div>
    <ShineBorder
    className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
   
  >
    <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
      {`/chat secn/`}
    </span>
    <div className="fixed bottom-0">

    <DockDemo/>
    </div>
  </ShineBorder></div>
  )
}

export default Chat