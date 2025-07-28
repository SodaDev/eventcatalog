import { useEffect, useState } from 'react';
import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';
import './_styles.css';
const OpenAPISpec = ({ spec, url }: { spec?: string, url: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [openApiSpec, setOpenApiSpec] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(url)
      const data = await result.json();
      setOpenApiSpec(data);
    }
    fetchData();
  }, [url]);

  return (
    <div>
      {!loaded && <div>Loading...</div>}
      <ApiReferenceReact
        configuration={{
          spec: {
            content: spec || openApiSpec,
          },
          theme: 'fastify',
          hideClientButton: true,
          onLoaded: () => {
            setLoaded(true);
          },
          forceDarkModeState: 'light',
          darkMode: false,
          defaultOpenAllTags: true,
          hideDarkModeToggle: true,
          searchHotKey: 'p',
          showSidebar: true,
          customCss: 'bg-red-500',
        }}
      />
    </div>
  );
};

export default OpenAPISpec;
