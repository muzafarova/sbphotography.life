import Image from 'next/image';
import { fetchPageByDocumentId } from '../../lib/api';
import Content from '../../components/Content';

export default async function Page() {
  const { data, error } = await fetchPageByDocumentId(
    'lh9zupo1bxs047x5ya3x9z3f'
  );

  return (
    <div>
      {/* TODO display error nicely */}
      {error && <pre>{JSON.stringify(error)}</pre>}

      {data && (
        <>
          <h2>{data.title}</h2>

          {data.illustration && (
            <Image
              key={data.illustration.id}
              src={data.illustration.url}
              alt=""
              width={595}
              height={533}
              loading="lazy"
            />
          )}

          {Content(data.content)}
        </>
      )}
    </div>
  );
}
