"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Question, Choice, RiskRule, ImprovementPlan } from "@/components/lens-builder"
import { PlusCircle, Trash2, ArrowLeft } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ChoiceBuilderProps {
  question: Question
  onSave: (updatedQuestion: Question) => void
  onCancel: () => void
}

export function ChoiceBuilder({ question, onSave, onCancel }: ChoiceBuilderProps) {
  const [choices, setChoices] = useState<Choice[]>(question.choices)
  const [riskRules, setRiskRules] = useState<RiskRule[]>(question.riskRules)
  const [improvementPlans, setImprovementPlans] = useState<ImprovementPlan[]>(question.improvementPlans)

  // Form state for new choice
  const [choiceId, setChoiceId] = useState("")
  const [choiceTitle, setChoiceTitle] = useState("")
  const [choiceDescription, setChoiceDescription] = useState("")
  const [riskLevel, setRiskLevel] = useState<"HIGH" | "MEDIUM" | "LOW" | "NONE">("NONE")
  const [improvementText, setImprovementText] = useState("")
  const [improvementUrl, setImprovementUrl] = useState("")

  // Form state for editing existing choice
  const [editingChoiceIndex, setEditingChoiceIndex] = useState<number | null>(null)
  const [editChoiceId, setEditChoiceId] = useState("")
  const [editChoiceTitle, setEditChoiceTitle] = useState("")
  const [editChoiceDescription, setEditChoiceDescription] = useState("")
  const [editRiskLevel, setEditRiskLevel] = useState<"HIGH" | "MEDIUM" | "LOW" | "NONE">("NONE")
  const [editImprovementText, setEditImprovementText] = useState("")
  const [editImprovementUrl, setEditImprovementUrl] = useState("")

  const addChoice = () => {
    if (!choiceId.trim() || !choiceTitle.trim()) return

    // Create new choice
    const newChoice: Choice = {
      id: choiceId,
      title: choiceTitle,
      description: choiceDescription,
    }

    // Create risk rule for this choice
    const newRiskRule: RiskRule = {
      id: choiceId,
      risk: riskLevel,
    }

    // Create improvement plan if text is provided
    let newImprovementPlans = [...improvementPlans]
    if (improvementText.trim()) {
      const newImprovementPlan: ImprovementPlan = {
        id: choiceId,
        displayText: improvementText,
        url: improvementUrl,
      }
      newImprovementPlans = [...improvementPlans, newImprovementPlan]
    }

    // Update state
    setChoices([...choices, newChoice])
    setRiskRules([...riskRules, newRiskRule])
    setImprovementPlans(newImprovementPlans)

    // Reset form
    setChoiceId("")
    setChoiceTitle("")
    setChoiceDescription("")
    setRiskLevel("NONE")
    setImprovementText("")
    setImprovementUrl("")
  }

  const startEditChoice = (index: number) => {
    const choice = choices[index]
    const riskRule = riskRules.find((r) => r.id === choice.id)
    const improvementPlan = improvementPlans.find((p) => p.id === choice.id)

    setEditingChoiceIndex(index)
    setEditChoiceId(choice.id)
    setEditChoiceTitle(choice.title)
    setEditChoiceDescription(choice.description)
    setEditRiskLevel(riskRule?.risk || "NONE")
    setEditImprovementText(improvementPlan?.displayText || "")
    setEditImprovementUrl(improvementPlan?.url || "")
  }

  const saveEditChoice = () => {
    if (editingChoiceIndex === null) return

    const oldChoiceId = choices[editingChoiceIndex].id

    // Update choice
    const updatedChoices = [...choices]
    updatedChoices[editingChoiceIndex] = {
      id: editChoiceId,
      title: editChoiceTitle,
      description: editChoiceDescription,
    }

    // Update risk rule
    const updatedRiskRules = [...riskRules]
    const riskRuleIndex = riskRules.findIndex((r) => r.id === oldChoiceId)
    if (riskRuleIndex >= 0) {
      updatedRiskRules[riskRuleIndex] = {
        id: editChoiceId,
        risk: editRiskLevel,
      }
    } else {
      updatedRiskRules.push({
        id: editChoiceId,
        risk: editRiskLevel,
      })
    }

    // Update improvement plan
    const updatedImprovementPlans = [...improvementPlans]
    const improvementPlanIndex = improvementPlans.findIndex((p) => p.id === oldChoiceId)

    if (editImprovementText.trim()) {
      if (improvementPlanIndex >= 0) {
        updatedImprovementPlans[improvementPlanIndex] = {
          id: editChoiceId,
          displayText: editImprovementText,
          url: editImprovementUrl,
        }
      } else {
        updatedImprovementPlans.push({
          id: editChoiceId,
          displayText: editImprovementText,
          url: editImprovementUrl,
        })
      }
    } else if (improvementPlanIndex >= 0) {
      // Remove improvement plan if text is empty
      updatedImprovementPlans.splice(improvementPlanIndex, 1)
    }

    // Update state
    setChoices(updatedChoices)
    setRiskRules(updatedRiskRules)
    setImprovementPlans(updatedImprovementPlans)
    setEditingChoiceIndex(null)
  }

  const cancelEditChoice = () => {
    setEditingChoiceIndex(null)
  }

  const removeChoice = (index: number) => {
    const choiceId = choices[index].id

    // Remove choice
    const newChoices = [...choices]
    newChoices.splice(index, 1)

    // Remove associated risk rule
    const newRiskRules = riskRules.filter((rule) => rule.id !== choiceId)

    // Remove associated improvement plan
    const newImprovementPlans = improvementPlans.filter((plan) => plan.id !== choiceId)

    // Update state
    setChoices(newChoices)
    setRiskRules(newRiskRules)
    setImprovementPlans(newImprovementPlans)
  }

  const handleSave = () => {
    const updatedQuestion = {
      ...question,
      choices,
      riskRules,
      improvementPlans,
    }

    onSave(updatedQuestion)
  }

  const getRiskLevelForChoice = (choiceId: string): string => {
    const riskRule = riskRules.find((rule) => rule.id === choiceId)
    return riskRule?.risk || "Not set"
  }

  const getImprovementPlanForChoice = (choiceId: string): ImprovementPlan | undefined => {
    return improvementPlans.find((plan) => plan.id === choiceId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">Choices for "{question.title}"</h2>
      </div>

      <div className="space-y-1">
        <p className="text-sm text-gray-500">ID: {question.id}</p>
        <p className="text-sm">{question.description}</p>
      </div>

      {editingChoiceIndex !== null ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit Choice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="editChoiceId">Choice ID</Label>
              <Input
                id="editChoiceId"
                value={editChoiceId}
                onChange={(e) => setEditChoiceId(e.target.value)}
                placeholder="e.g., not-followed"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="editChoiceTitle">Choice Title</Label>
              <Input
                id="editChoiceTitle"
                value={editChoiceTitle}
                onChange={(e) => setEditChoiceTitle(e.target.value)}
                placeholder="e.g., We do not follow this practice"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="editChoiceDescription">Choice Description</Label>
              <Textarea
                id="editChoiceDescription"
                value={editChoiceDescription}
                onChange={(e) => setEditChoiceDescription(e.target.value)}
                placeholder="e.g., This is not currently implemented"
                rows={2}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="editRiskLevel">Risk Level</Label>
              <Select value={editRiskLevel} onValueChange={(value) => setEditRiskLevel(value as any)}>
                <SelectTrigger id="editRiskLevel">
                  <SelectValue placeholder="Select risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HIGH">HIGH</SelectItem>
                  <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                  <SelectItem value="LOW">LOW</SelectItem>
                  <SelectItem value="NONE">NONE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="editImprovementText">Improvement Plan Text</Label>
              <Textarea
                id="editImprovementText"
                value={editImprovementText}
                onChange={(e) => setEditImprovementText(e.target.value)}
                placeholder="e.g., Start implementing this best practice by establishing policy and training."
                rows={2}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="editImprovementUrl">Improvement Plan URL</Label>
              <Input
                id="editImprovementUrl"
                value={editImprovementUrl}
                onChange={(e) => setEditImprovementUrl(e.target.value)}
                placeholder="e.g., https://example.com/start-best-practice"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={cancelEditChoice}>
                Cancel
              </Button>
              <Button onClick={saveEditChoice}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {choices.length > 0 && (
              <div className="grid gap-4">
                {choices.map((choice, index) => (
                  <Card key={choice.id} className="relative">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex justify-between items-center">
                        <span>{choice.title}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => startEditChoice(index)}>
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeChoice(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm">ID: {choice.id}</p>
                      <p className="text-sm">{choice.description}</p>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                          <Label className="text-xs">Risk Level</Label>
                          <p className="text-sm font-medium">{getRiskLevelForChoice(choice.id)}</p>
                        </div>

                        <div className="space-y-1">
                          <Label className="text-xs">Improvement Plan</Label>
                          {getImprovementPlanForChoice(choice.id) ? (
                            <p className="text-sm truncate">
                              {getImprovementPlanForChoice(choice.id)?.displayText.substring(0, 50)}
                              {getImprovementPlanForChoice(choice.id)?.displayText.length! > 50 ? "..." : ""}
                            </p>
                          ) : (
                            <p className="text-sm text-gray-500">None</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Add New Choice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="choiceId">Choice ID</Label>
                  <Input
                    id="choiceId"
                    value={choiceId}
                    onChange={(e) => setChoiceId(e.target.value)}
                    placeholder="e.g., not-followed"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="choiceTitle">Choice Title</Label>
                  <Input
                    id="choiceTitle"
                    value={choiceTitle}
                    onChange={(e) => setChoiceTitle(e.target.value)}
                    placeholder="e.g., We do not follow this practice"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="choiceDescription">Choice Description</Label>
                  <Textarea
                    id="choiceDescription"
                    value={choiceDescription}
                    onChange={(e) => setChoiceDescription(e.target.value)}
                    placeholder="e.g., This is not currently implemented"
                    rows={2}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="riskLevel">Risk Level</Label>
                  <Select value={riskLevel} onValueChange={(value) => setRiskLevel(value as any)}>
                    <SelectTrigger id="riskLevel">
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HIGH">HIGH</SelectItem>
                      <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                      <SelectItem value="LOW">LOW</SelectItem>
                      <SelectItem value="NONE">NONE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="improvementText">Improvement Plan Text (Optional)</Label>
                  <Textarea
                    id="improvementText"
                    value={improvementText}
                    onChange={(e) => setImprovementText(e.target.value)}
                    placeholder="e.g., Start implementing this best practice by establishing policy and training."
                    rows={2}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="improvementUrl">Improvement Plan URL (Optional)</Label>
                  <Input
                    id="improvementUrl"
                    value={improvementUrl}
                    onChange={(e) => setImprovementUrl(e.target.value)}
                    placeholder="e.g., https://example.com/start-best-practice"
                  />
                </div>

                <Button onClick={addChoice} type="button">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Choice
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onCancel}>
              Back to Questions
            </Button>
            <Button onClick={handleSave}>Save Choices</Button>
          </div>
        </>
      )}
    </div>
  )
}
