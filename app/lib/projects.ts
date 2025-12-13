import prisma from "@/prisma/client";

export async function getFeaturedProject() {
  try {
    const project = await prisma.project.findFirst({
      where: {
        featured: true,
      },
      orderBy: {
        order: "asc",
      },
    });

    return project;
  } catch (error) {
    console.error("Error fetching featured project:", error);
    return null;
  }
}

export async function getAllProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: [
        { featured: "desc" },
        { order: "asc" },
        { createdAt: "desc" },
      ],
    });

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectById(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}


