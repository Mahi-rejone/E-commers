import Link from 'next/link'

export default function Products() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Products</h1>
      <Link href="/products/1" className="text-blue-500 hover:underline">
        Product 1
      </Link>
      <br />
      <Link href="/products/2" className="text-blue-500 hover:underline">
        Product 2
      </Link>
      <br />
      <Link href="/products/3" className="text-blue-500 hover:underline">
        Product 3
      </Link>
    </div>
  );
}