export default async function ProductPage ({params}: {params: {id: string}}) {
  const {id} = await params;
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Product Page for {id}</h1>
    </div>
  );
}