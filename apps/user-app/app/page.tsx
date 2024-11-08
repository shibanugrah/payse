"use client"

import {useBalance} from "@repo/store/useBalance"

export default function() {
  const balance = useBalance()
  return <div>
    Hey there {balance}
  </div>
}