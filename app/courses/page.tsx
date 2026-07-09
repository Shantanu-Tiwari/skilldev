import { prisma } from "@/lib/db"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { IconBook } from "@tabler/icons-react"

export default async function CoursesListPage() {
  const courses = await prisma.course.findMany({
    where: {
      isPublished: true,
    },
    include: {
      category: true,
      chapters: {
        where: {
          isPublished: true,
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground mt-2">
            Explore our comprehensive catalog of published courses.
          </p>
        </div>
      </div>

      {courses.length === 0 && (
        <div className="text-center text-muted-foreground mt-10">
          No courses found.
        </div>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {courses.map((course) => (
          <Link key={course.id} href={`/courses/${course.id}`}>
            <Card className="hover:shadow-md transition cursor-pointer h-full flex flex-col">
              <div className="w-full h-40 bg-muted rounded-t-md border-b overflow-hidden">
                {course.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <IconBook size={48} />
                  </div>
                )}
              </div>
              <CardHeader className="p-4 flex-1">
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                  {course.category?.name || "Uncategorized"}
                </p>
                <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                  <div className="flex items-center gap-x-1 text-muted-foreground">
                    <IconBook className="w-4 h-4" />
                    <span>
                      {course.chapters.length} {course.chapters.length === 1 ? "Chapter" : "Chapters"}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="p-4 pt-0">
                <Badge variant={course.price === 0 || !course.price ? "secondary" : "default"}>
                  {course.price === 0 || !course.price ? "Free" : `$${course.price}`}
                </Badge>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
