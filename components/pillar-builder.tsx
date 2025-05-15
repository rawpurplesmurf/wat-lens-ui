"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import type { Pillar } from "@/components/lens-builder"
import { QuestionBuilder } from "@/components/question-builder"
import { PlusCircle, Trash2 } from "lucide-react"
import { slugify } from "@/lib/utils"

interface PillarBuilderProps {
  initialPillars: Pillar[]
  onComplete: (pillars: Pillar[]) => void
  onBack: () => void
}

export function PillarBuilder({ initialPillars, onComplete, onBack }: PillarBuilderProps) {
  const [pillars, setPillars] = useState<Pillar[]>(initialPillars.length ? initialPillars : [])
  const [currentPillar, setCurrentPillar] = useState<Pillar | null>(null)
  const [pillarName, setPillarName] = useState("")

  const addPillar = () => {
    if (!pillarName.trim()) return

    const newPillar: Pillar = {
      id: slugify(pillarName),
      name: pillarName,
      questions: [],
    }

    setPillars([...pillars, newPillar])
    setPillarName("")
  }

  const removePillar = (index: number) => {
    const newPillars = [...pillars]
    newPillars.splice(index, 1)
    setPillars(newPillars)
  }

  const editPillar = (pillar: Pillar) => {
    setCurrentPillar(pillar)
  }

  const handleQuestionsSaved = (updatedPillar: Pillar) => {
    const newPillars = pillars.map((p) => (p.id === updatedPillar.id ? updatedPillar : p))
    setPillars(newPillars)
    setCurrentPillar(null)
  }

  return (
    <div className="space-y-6">
      {currentPillar ? (
        <QuestionBuilder pillar={currentPillar} onSave={handleQuestionsSaved} onCancel={() => setCurrentPillar(null)} />
      ) : (
        <>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Pillars</h2>
            <p className="text-sm text-gray-500">
              Add pillars to your lens. Each pillar represents a category of best practices.
            </p>
          </div>

          <div className="space-y-4">
            {pillars.length > 0 && (
              <div className="grid gap-4">
                {pillars.map((pillar, index) => (
                  <Card key={pillar.id} className="relative">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex justify-between items-center">
                        <span>{pillar.name}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => editPillar(pillar)}>
                            {pillar.questions.length} Question{pillar.questions.length !== 1 ? "s" : ""}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removePillar(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">ID: {pillar.id}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  value={pillarName}
                  onChange={(e) => setPillarName(e.target.value)}
                  placeholder="Enter pillar name"
                />
              </div>
              <Button onClick={addPillar} type="button">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Pillar
              </Button>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button onClick={() => onComplete(pillars)} disabled={pillars.length === 0}>
              Generate JSON
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
