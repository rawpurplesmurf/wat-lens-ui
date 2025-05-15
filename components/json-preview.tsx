"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface JsonPreviewProps {
  lensData: any
  onBack: () => void
}

export function JsonPreview({ lensData, onBack }: JsonPreviewProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const formattedJson = JSON.stringify(lensData, null, 2)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "The JSON has been copied to your clipboard",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Generated JSON</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onBack}>
            Back to Editor
          </Button>
          <Button onClick={copyToClipboard}>
            <Copy className="h-4 w-4 mr-2" />
            {copied ? "Copied!" : "Copy JSON"}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0 relative">
          <pre className="p-4 overflow-auto max-h-[600px] text-sm">{formattedJson}</pre>
        </CardContent>
      </Card>
    </div>
  )
}
