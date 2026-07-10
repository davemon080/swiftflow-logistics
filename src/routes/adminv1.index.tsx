import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/adminv1/")({ beforeLoad: () => { throw redirect({ to: "/adminv1/dashboard" }); } });
