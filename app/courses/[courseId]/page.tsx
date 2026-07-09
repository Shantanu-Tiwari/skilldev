import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { Button } from "@/components/ui/button"

export default async function CoursePage({
  params
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc"
        }
      }
    }
  })

  if (!course) {
    return redirect("/courses")
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  })
  
  const purchase = session?.user ? await prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId: course.id,
      }
    }
  }) : null

  return (
    <div className="flex flex-col max-w-4xl mx-auto p-6 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {course.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={course.imageUrl} 
              alt={course.title} 
              className="w-full rounded-md border aspect-video object-cover" 
            />
          ) : (
            <div className="w-full aspect-video bg-muted rounded-md border flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground mt-4 text-lg">
            {course.description || "No description provided."}
          </p>
          <div className="mt-8">
            {purchase ? (
              <Button size="lg" className="w-full sm:w-auto">
                Continue Learning
              </Button>
            ) : (
              <Button size="lg" className="w-full sm:w-auto">
                {course.price === 0 || !course.price ? "Enroll for Free" : `Enroll for $${course.price}`}
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
        <div className="border rounded-md divide-y bg-background">
          {course.chapters.length === 0 && (
             <div className="p-4 text-muted-foreground italic">No chapters available yet.</div>
          )}
          {course.chapters.map((chapter, index) => (
            <div key={chapter.id} className="p-4 flex items-center gap-x-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <div className="font-medium text-lg">
                {chapter.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
