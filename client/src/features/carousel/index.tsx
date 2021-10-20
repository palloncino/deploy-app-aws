import { useEffect } from 'react';
import { CarouselContent } from './view';

const mock = [
  {
      "id": "65a2106c-77a0-4adf-89a0-0567dcec3eda",
      "html": "<h1>hello</h1>"
  },
  {
      "id": "737b871c-365e-49e2-9795-67f2fe71fc09",
      "html": "<h1>hello</h1>"
  },
  {
      "id": "d39eb357-08bc-4573-9b9b-0408cef45e5e",
      "html": "<h1>hello</h1>"
  },
  {
      "id": "1a65778a-07b6-4d10-9ee6-890bceb27387",
      "html": ""
  },
  {
      "id": "dc27cb5f-5935-4986-9b2a-70ee4a1b18a5",
      "html": "<h1>hello2</h1>"
  },
  {
      "id": "f24d78c3-3463-4cff-b17c-6a6279c1b12e",
      "html": "<h1>hello</h1>"
  },
  {
      "id": "37085bee-4ed1-42b1-b4ca-9d3406f35da8",
      "html": "<html>\n  <style type=\"text/css\">\n    .example-com-body {\n      background-color: #f0f0f2;\n      margin: 0;\n      padding: 0;\n      font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\",\n        \"Open Sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    }\n    example-com-div {\n      width: 600px;\n      margin: 5em auto;\n      padding: 2em;\n      background-color: #fdfdff;\n      border-radius: 0.5em;\n      box-shadow: 2px 3px 7px 2px rgba(0, 0, 0, 0.02);\n    }\n  </style>\n\n  <body class=\"example-com-body\">\n    <div class=\"example-com-div\">\n      <h1>Example Domain</h1>\n      <p>\n        This domain is for use in illustrative examples in documents. You may\n        use this domain in literature without prior coordination or asking for\n        permission.\n      </p>\n      <p>\n        <a href=\"https://www.iana.org/domains/example\">More information...</a>\n      </p>\n    </div>\n  </body>\n</html>\n"
  }
]

export const Carousel = () => {
  useEffect(() => {}, []);

  return <CarouselContent data={mock}/>;
};
