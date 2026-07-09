"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { IconLoader, IconPlus } from "@tabler/icons-react"
import Link from "next/link"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChaptersFormProps {
  initialData: {
    chapters: { id: string, title: string, isPublished: boolean }[]
  }
  courseId: string
}

const formSchema = z.object({
  title: z.string().min(1),
})

export const ChaptersForm = ({
  initialData,
  courseId,
}: ChaptersFormProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()

  const toggleCreating = () => setIsCreating((current) => !current)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch(`/api/courses/${courseId}/chapters`, {
        method: "POST",
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error("Something went wrong")
      toast.success("Chapter created")
      toggleCreating()
      form.reset()
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="relative mt-6 border bg-muted/50 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-background/50 top-0 right-0 rounded-m flex items-center justify-center">
          <IconLoader className="animate-spin h-6 w-6 text-primary" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <IconPlus className="h-4 w-4 mr-2" />
              Add a chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div className={cn(
          "text-sm mt-2",
          !initialData.chapters.length && "text-muted-foreground italic"
        )}>
          {!initialData.chapters.length && "No chapters"}
          {initialData.chapters.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              {initialData.chapters.map((chapter) => (
                <div key={chapter.id} className="flex items-center justify-between p-3 bg-background border rounded-md">
                  <span>{chapter.title}</span>
                  <div className="flex items-center gap-x-2">
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      chapter.isPublished ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    )}>
                      {chapter.isPublished ? "Published" : "Draft"}
                    </span>
                    <Link href={`/admin/courses/${courseId}/chapters/${chapter.id}`}>
                      <Button variant="ghost" size="sm">Edit</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
