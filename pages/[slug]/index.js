import { useRouter } from 'next/router';

function slugPage() {
  const router = useRouter();

  const slug = router.query.slug;

  return (
    <div className="text-center text-blue-900 bg-white rounded">
      <h1>Welcome To The {slug} Page</h1>
    </div>
  );
}

export default slugPage; // Remeber to export as default
