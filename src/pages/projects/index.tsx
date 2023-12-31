import React from "react";
import type { GetStaticProps } from "next";
import ProjectCardRow, {
  ProjectCardRowProps,
} from "@/components/ProjectCardRow";
import prisma from "@/lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  // const feed = await prisma.project.findMany({
  //   where: { published: true },
  //   include: {
  //     author: {
  //       select: { name: true },
  //     },
  //   },
  // });
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const feed = await response.json();
    return {
      props: { feed },
      revalidate: 10,
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
      revalidate: 10,
    };
  }
};

type Props = {
  projects: ProjectCardRowProps[];
};

const ProjectCatalog: React.FC<ProjectCardRowProps> = (props) => {
  return (
    <div class="container page mx-auto  px-4">
      <div class="container">
        <h1>Projects Catalog</h1>
        <div class="flex flex-col ">
          <div>
            {props.feed?.map((project: ProjectCardRowProps) => (
              <div key={project.id} className="project p-1">
                <ProjectCardRow project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCatalog;
