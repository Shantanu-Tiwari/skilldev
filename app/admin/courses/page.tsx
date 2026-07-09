import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function CoursesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || !session.user) {
    return redirect("/login")
  }

  const courses = await prisma.course.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-medium">Courses</h1>
        <Link href="/admin/courses/create">
          <Button>New Course</Button>
        </Link>
      </div>

      <div className="border rounded-md">
        {courses.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No courses found. Create one to get started!
          </div>
        ) : (
          <div className="divide-y">
            {courses.map((course) => (
              <div key={course.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition">
                <div>
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {course.isPublished ? "Published" : "Draft"}
                  </p>
                </div>
                <Link href={`/admin/courses/${course.id}`}>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
