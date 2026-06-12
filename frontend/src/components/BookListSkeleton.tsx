import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BookListSkeleton() {
  const skeletons = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {skeletons.map((_, index) => (
        <Card
          key={index}
          className="bg-card/50 border-muted/50 flex flex-col overflow-hidden transition-all"
        >
          {/* 1. Блок обложки */}
          <div className=" flex items-center justify-center p-6">
            <Skeleton className="h-48 w-32 rounded shadow-md" />
          </div>

          <CardHeader>
            {/* 🌟 Имитируем те же 3rem высоты для заголовка */}
            <div className="flex min-h-[3rem] flex-col justify-center space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
            {/* 🌟 Имитируем 1 строку авторов (совпадает по отступам с CardDescription mt-1) */}
            <Skeleton className="mt-1 h-4 w-1/2" />
          </CardHeader>

          <CardContent className="flex-1 space-y-2">
            {/* 🌟 Имитируем Жанр и год */}
            <Skeleton className="h-4 w-1/3" />
          </CardContent>

          <CardFooter>
            {/* 6. Кнопка */}
            <Skeleton className="h-10 w-full rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
