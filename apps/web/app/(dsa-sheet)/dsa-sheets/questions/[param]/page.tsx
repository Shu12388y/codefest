type QuestionPageProps = {
	params: Promise<{ param: string }>;
};

export default async function QuestionPage({ params }: QuestionPageProps) {
	const { param } = await params;

	return <main className="p-6">Question: {param}</main>;
}
