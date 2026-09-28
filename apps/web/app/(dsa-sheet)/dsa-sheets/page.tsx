import { DsaQuestionList } from "./DsaQuestionList";
import { getDsaQuestions } from "@/lib/dsaQuestions";

export const dynamic = "force-dynamic";

export default async function DsaSheetsPage() {
	const questions = await getDsaQuestions();
	return <DsaQuestionList questions={questions} />;
}
