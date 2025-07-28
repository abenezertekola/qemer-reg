import prisma from '../../../lib/prisma';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  try {
    if (id) {
      const course = await prisma.course.findUnique({ where: { id: Number(id) } });
      return new Response(JSON.stringify(course), { status: 200 });
    }
    const courses = await prisma.course.findMany();
    return new Response(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(request) {
  const data = await request.json();
  try {
    const course = await prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        duration: data.duration,
      },
    });
    return new Response(JSON.stringify(course), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
