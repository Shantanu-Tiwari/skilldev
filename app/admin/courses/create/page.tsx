"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
})

export default function CreateCoursePage() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/courses", {
        method: "POST",
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Something went wrong")
      }

      const course = await response.json()
      router.push(`/admin/courses/${course.id}`)
      toast.success("Course created")
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl font-medium">
          Name your course
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          What would you like to name your course? Don&apos;t worry, you can change this later.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      placeholder="e.g. 'Advanced Web Development'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/courses")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!form.formState.isValid || form.formState.isSubmitting}
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
