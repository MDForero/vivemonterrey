import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function Home() {
  const supabase = createClient()
  const { data, error } = await supabase.from('businesses').select('*')
  console.log(data)
  return (
    <div>
      <h1>Businesses</h1>
      <div className='grid grid-cols-3 max-w-5xl'>
        {data.map((business, index) => <div key={index}>
          <h1>{business?.name}</h1>
          <Image src={business?.banner_url ?? ''} width={300} height={300} />
        </div>)}
      </div>
    </div>
  );
}
