"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Pillar, Question } from "@/components/lens-builder"
import { PlusCircle, Trash2, ArrowLeft } from "lucide-react"
import { slugify } from "@/lib/utils"
import { ChoiceBuilder } from "@/components/choice-builder"

interface QuestionBuilderProps {
  pillar: Pillar
  onSave: (updatedPillar: Pillar) => void
  onCancel: () => void
}

export function QuestionBuilder({ pillar, onSave, onCancel }: QuestionBuilderProps) {
  const [questions, setQuestions] = useState<Question[]>(pillar.questions)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [questionTitle, setQuestionTitle] = useState("")
  const [questionDescription, setQuestionDescription] = useState("")

  const addQuestion = () => {
    if (!questionTitle.trim()) return

    const newQuestion: Question = {
      id: slugify(questionTitle),
      title: questionTitle,
      description: questionDescription,
      choices: [],
      riskRules: [],
      improvementPlans: [],
    }

    setQuestions([...questions, newQuestion])
    setQuestionTitle("")
    setQuestionDescription("")
  }

  const removeQuestion = (index: number) => {
    const newQuestions = [...questions]
    newQuestions.splice(index, 1)
    setQuestions(newQuestions)
  }

  const editQuestion = (question: Question) => {
    setCurrentQuestion(question)
  }

  const handleChoicesSaved = (updatedQuestion: Question) => {
    const updatedQuestions = questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    setQuestions(updatedQuestions)
    setCurrentQuestion(null)
  }

  const handleSave = () => {
    const updatedPillar = {
      ...pillar,
      questions,
    }

    onSave(updatedPillar)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold">Questions for {pillar.name}</h2>
      </div>

      {currentQuestion ? (
        <ChoiceBuilder
          question={currentQuestion}
          onSave={handleChoicesSaved}
          onCancel={() => setCurrentQuestion(null)}
        />
      ) : (
        <>
          <div className="space-y-4">
            {questions.length > 0 && (
              <div className="grid gap-4">
                {questions.map((question, index) => (
                  <Card key={question.id} className="relative">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex justify-between items-center">
                        <span>{question.title}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => editQuestion(question)}>
                            {question.choices.length} Choice{question.choices.length !== 1 ? "s" : ""}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeQuestion(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">ID: {question.id}</p>
                      <p className="text-sm mt-1">{question.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="questionTitle">Question Title</Label>
                  <Input
                    id="questionTitle"
                    value={questionTitle}
                    onChange={(e) => setQuestionTitle(e.target.value)}
                    placeholder="e.g., Do you follow example best practices?"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="questionDescription">Question Description</Label>
                  <Textarea
                    id="questionDescription"
                    value={questionDescription}
                    onChange={(e) => setQuestionDescription(e.target.value)}
                    placeholder="e.g., Assess whether your team follows example standards and controls."
                    rows={3}
                  />
                </div>

                <Button onClick={addQuestion} type="button">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onCancel}>
              Back to Pillars
            </Button>
            <Button onClick={handleSave}>Save Questions</Button>
          </div>
        </>
      )}
    </div>
  )
}
