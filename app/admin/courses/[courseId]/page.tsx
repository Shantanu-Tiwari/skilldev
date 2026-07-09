import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { TitleForm } from "./_components/title-form"
import { DescriptionForm } from "./_components/description-form"

import { ChaptersForm } from "./_components/chapters-form"

export default async function CourseIdPage({
  params
}: {
  params: Promise<{ courseId: string }>
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || !session.user) {
    return redirect("/login")
  }

  const { courseId } = await params

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId: session.user.id,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
    },
  })

  if (!course) {
    return redirect("/admin/courses")
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapters.some(chapter => chapter.isPublished),
  ]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`
  const isComplete = requiredFields.every(Boolean)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">
            Course setup
          </h1>
          <span className="text-sm text-muted-foreground">
            Complete all fields {completionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <h2 className="text-xl">
              Customize your course
            </h2>
          </div>
          <TitleForm
            initialData={course}
            courseId={course.id}
          />
          <DescriptionForm
            initialData={course}
            courseId={course.id}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <h2 className="text-xl">
                Course chapters
              </h2>
            </div>
            <ChaptersForm
              initialData={course}
              courseId={course.id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
