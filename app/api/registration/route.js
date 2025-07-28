import prisma from '../../../lib/prisma';

export async function POST(request) {
  try {
    const { name, email, phone, courseId } = await request.json();

    // Validate input
    if (!name || !email || !phone || !courseId || isNaN(Number(courseId))) {
      return new Response(JSON.stringify({ success: false, error: "Missing or invalid fields." }), { status: 400 });
    }

    // Check if course exists
    const course = await prisma.course.findUnique({ where: { id: Number(courseId) } });
    if (!course) {
      return new Response(JSON.stringify({ success: false, error: "Course does not exist." }), { status: 400 });
    }

    // Create or find the student (update phone if changed)
    let student = await prisma.student.findUnique({ where: { email } });
    if (!student) {
      student = await prisma.student.create({
        data: { name, email, phone },
      });
    } else if (student.phone !== phone) {
      student = await prisma.student.update({
        where: { email },
        data: { phone },
      });
    }

    // Prevent duplicate registration
    const existing = await prisma.registration.findFirst({
      where: { studentId: student.id, courseId: Number(courseId) }
    });
    if (existing) {
      return new Response(JSON.stringify({ success: false, error: "You are already registered for this course." }), { status: 400 });
    }

    // Register the student for the course
    const registration = await prisma.registration.create({
      data: {
        studentId: student.id,
        courseId: Number(courseId),
      },
    });

    return new Response(JSON.stringify({ success: true, registration }), { status: 201 });
  } catch (error) {
    // Log the error for debugging
    console.error("Registration API error:", error);
    return new Response(JSON.stringify({ success: false, error: error.message, stack: error.stack }), { status: 500 });
  }
}

export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      select: {
        id: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });
    return new Response(JSON.stringify(registrations), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
