"use client"

import { useState } from "react"
import { LensBuilder } from "@/components/lens-builder"
import { JsonPreview } from "@/components/json-preview"

export default function Home() {
  const [showJson, setShowJson] = useState(false)
  const [lensData, setLensData] = useState<any>(null)

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">AWS Well-Architected Tool Lens Builder</h1>
      <p className="text-gray-600 mb-8">
        Create a custom lens for the AWS Well-Architected Tool by filling out the form below. You can add pillars,
        questions, choices, risk rules, and improvement plans.
      </p>

      {showJson ? (
        <JsonPreview lensData={lensData} onBack={() => setShowJson(false)} />
      ) : (
        <LensBuilder
          onComplete={(data) => {
            setLensData(data)
            setShowJson(true)
          }}
        />
      )}
    </main>
  )
}
