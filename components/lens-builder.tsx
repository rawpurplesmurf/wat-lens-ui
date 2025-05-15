"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { LensInfo } from "@/components/lens-info"
import { PillarBuilder } from "@/components/pillar-builder"

export interface Lens {
  lensVersion: string
  name: string
  description: string
  pillars: Pillar[]
}

export interface Pillar {
  id: string
  name: string
  questions: Question[]
}

export interface Question {
  id: string
  title: string
  description: string
  choices: Choice[]
  riskRules: RiskRule[]
  improvementPlans: ImprovementPlan[]
}

export interface Choice {
  id: string
  title: string
  description: string
}

export interface RiskRule {
  id: string
  risk: "HIGH" | "MEDIUM" | "LOW" | "NONE"
}

export interface ImprovementPlan {
  id: string
  displayText: string
  url: string
}

export function LensBuilder({ onComplete }: { onComplete: (data: Lens) => void }) {
  const [lens, setLens] = useState<Lens>({
    lensVersion: "1.0",
    name: "",
    description: "",
    pillars: [],
  })

  const [step, setStep] = useState(1)

  const handleLensInfoComplete = (lensInfo: Pick<Lens, "lensVersion" | "name" | "description">) => {
    setLens((prev) => ({ ...prev, ...lensInfo }))
    setStep(2)
  }

  const handlePillarsComplete = (pillars: Pillar[]) => {
    setLens((prev) => ({ ...prev, pillars }))
    onComplete({ ...lens, pillars })
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        {step === 1 && (
          <LensInfo
            initialData={{
              lensVersion: lens.lensVersion,
              name: lens.name,
              description: lens.description,
            }}
            onComplete={handleLensInfoComplete}
          />
        )}

        {step === 2 && (
          <PillarBuilder initialPillars={lens.pillars} onComplete={handlePillarsComplete} onBack={() => setStep(1)} />
        )}
      </CardContent>
    </Card>
  )
}
