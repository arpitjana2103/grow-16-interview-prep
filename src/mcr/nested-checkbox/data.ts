export type TCheckDataNode = {
    id: string;
    label: string;
    children?: TCheckDataNode[];
};

export const checkboxData: TCheckDataNode[] = [
    {
        id: "frontend",
        label: "Frontend",
        children: [
            {
                id: "react",
                label: "React",
                children: [
                    { id: "hooks", label: "Hooks" },
                    { id: "components", label: "Components" },
                    { id: "context", label: "Context API" },
                ],
            },
            {
                id: "nextjs",
                label: "Next.js",
                children: [
                    { id: "routing", label: "Routing" },
                    { id: "server-components", label: "Server Components" },
                    { id: "server-actions", label: "Server Actions" },
                ],
            },
            {
                id: "css",
                label: "CSS",
                children: [
                    { id: "flexbox", label: "Flexbox" },
                    { id: "grid", label: "CSS Grid" },
                    { id: "animations", label: "Animations" },
                ],
            },
        ],
    },
    {
        id: "backend",
        label: "Backend",
        children: [
            {
                id: "nodejs",
                label: "Node.js",
                children: [
                    { id: "express", label: "Express" },
                    { id: "nestjs", label: "NestJS" },
                ],
            },
            {
                id: "databases",
                label: "Databases",
                children: [
                    { id: "postgresql", label: "PostgreSQL" },
                    { id: "mongodb", label: "MongoDB" },
                    { id: "redis", label: "Redis" },
                ],
            },
        ],
    },
    {
        id: "devops",
        label: "DevOps",
        children: [
            { id: "docker", label: "Docker" },
            { id: "github-actions", label: "GitHub Actions" },
            {
                id: "cloud",
                label: "Cloud",
                children: [
                    { id: "aws", label: "AWS" },
                    { id: "vercel", label: "Vercel" },
                ],
            },
        ],
    },
];
