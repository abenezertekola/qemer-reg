import prisma from '../../../lib/prisma';

export async function GET() {
  try {
    // Get all registrations with student and course info
    const registrations = await prisma.registration.findMany({
      include: {
        student: true,
        course: true,
      },
    });
    // Map to student info for the dashboard
    const students = registrations.map((reg) => ({
      id: reg.student.id,
      registrationId: reg.id,
      name: reg.student.name,
      email: reg.student.email,
      course: reg.course.title,
      courseId: reg.course.id,
      registrationDate: reg.createdAt,
      status: reg.status || 'PENDING', // Default to PENDING for now
    }));
    return new Response(JSON.stringify(students), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const registrationId = Number(searchParams.get('registrationId'));
  if (!registrationId) return new Response(JSON.stringify({ error: 'Missing registrationId' }), { status: 400 });
  try {
    await prisma.registration.delete({ where: { id: registrationId } });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function PUT(request) {
  const { searchParams } = new URL(request.url);
  const registrationId = Number(searchParams.get('registrationId'));
  if (!registrationId) return new Response(JSON.stringify({ error: 'Missing registrationId' }), { status: 400 });
  const data = await request.json();
  try {
    const updated = await prisma.registration.update({
      where: { id: registrationId },
      data: {
        ...(data.status && { status: data.status }),
        ...(data.name && { student: { update: { name: data.name } } }),
        ...(data.email && { student: { update: { email: data.email } } }),
      },
      include: { student: true, course: true },
    });
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
