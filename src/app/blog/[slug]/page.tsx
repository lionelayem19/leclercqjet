import { redirect } from "next/navigation";

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  redirect(`/actualites/${params.slug}`);
}
