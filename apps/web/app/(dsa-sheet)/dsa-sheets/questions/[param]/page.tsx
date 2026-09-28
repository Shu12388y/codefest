import { QuestionWorkspace } from "./QuestionWorkspace";

type QuestionPageProps = {
  params: Promise<{ param: string }>;
};

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { param } = await params;

  return <QuestionWorkspace title={param} />;
}
