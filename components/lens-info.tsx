"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface LensInfoProps {
  initialData: {
    lensVersion: string
    name: string
    description: string
  }
  onComplete: (data: {
    lensVersion: string
    name: string
    description: string
  }) => void
}

export function LensInfo({ initialData, onComplete }: LensInfoProps) {
  const [lensVersion, setLensVersion] = useState(initialData.lensVersion)
  const [name, setName] = useState(initialData.name)
  const [description, setDescription] = useState(initialData.description)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete({ lensVersion, name, description })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Lens Information</h2>
        <p className="text-sm text-gray-500">Enter the basic information about your lens</p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="lensVersion">Lens Version</Label>
          <Input
            id="lensVersion"
            value={lensVersion}
            onChange={(e) => setLensVersion(e.target.value)}
            placeholder="1.0"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="name">Lens Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Custom Lens"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A custom lens for AWS Well-Architected Tool"
            rows={4}
            required
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Continue to Pillars</Button>
      </div>
    </form>
  )
}
