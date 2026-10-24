export async function GET(request: Request) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/health`,
      {
        method: "GET",
      },
    );
    const data = response.status;
    console.log(data);
    return new Response(data.toLocaleString());
  } catch (error) {
    console.log(error);
  }
}
